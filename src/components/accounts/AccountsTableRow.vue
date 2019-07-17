<template>
  <tr
    v-if="pkg"
    :class="{
      'table-success': isUser(row.account) && showAccount
    }"
  >
    <td class="text-center" scope="row">{{ count + 1 }}</td>
    <td v-if="showAccount" class="font-w700 font-size-h5">
      <router-link
        :to="{
          name: 'AccountDetails',
          params: { account: row.account }
        }"
        >{{ row.account }}</router-link
      >
    </td>
    <td v-else-if="showActionBtn">
      <action-buttons :pkg="pkg" :dspJson="dspJson" :pkgJson="pkgJson" />
    </td>
    <td class="d-flex justify-content-start">
      <img
        class="img-avatar img-avatar-thumb img-avatar-rounded bg-white ml-3 mr-3"
        :src="getNameLogo.pkgLogoUrl"
        alt="Package Logo"
      />
      <div class="py-2 ml-1">
        <p class="mb-0">
          <router-link
            :to="{
              name: 'PrvDetails',
              params: { provider: row.provider }
            }"
            class="font-size-h5 text-primary font-w700 d-inline-block"
          >
            {{ getNameLogo.name }}
          </router-link>
        </p>
        <service-button :service="row.service" :pkgId="pkg.id" class="mr-1" />
        <package-button :package="row.pending_package" :pkgId="pkg.id" />
      </div>
    </td>
    <td class="text-center">
      <span
        class="badge text-uppercase font-w700 py-2 px-3 mr-1"
        :class="{
          'badge-success': row.status === 'active',
          'badge-warning': row.status === 'low stake',
          'badge-danger': row.status === 'depleted',
          'badge-danger': row.status === 'zero stake'
        }"
        >{{ row.status }}</span
      >
    </td>
    <td class="text-center">
      <p class="font-size-h3 text-black mb-0">
        {{
          numeral(parseFloat(row.quota) / parseFloat(pkg.quota)).format(
            '0[.][0]%'
          )
        }}
      </p>
      <p class="font-size-sm font-w700 text-uppercase text-muted mb-0">
        {{ numeral(row.quota).format('0,0[.][0000]') }} /
        {{ numeral(pkg.quota).format('0,0[.][0000]') }}
      </p>
    </td>
    <td v-if="packageEnd.status === 'active'" class="text-center px-2">
      <span class="font-size-sm">{{ packageEnd.pkgEnd[1] }} left</span>
      <b-progress :max="100" :variant="progressVariant" animated>
        <b-progress-bar
          :value="packageEnd.percentage"
          :label="parseInt(packageEnd.percentage) + ' %'"
        ></b-progress-bar>
      </b-progress>
    </td>
    <td v-else-if="packageEnd.status === 'expired'" class="text-center px-2">
      <span class="font-size-sm">(use to refresh)</span>
      <b-progress :max="100" variant="success-light">
        <b-progress-bar
          :value="100"
          :label="'waiting for usage'"
        ></b-progress-bar>
      </b-progress>
    </td>
    <td v-else class="text-center px-2">
      <span class="font-size-sm">(insufficient stake)</span>
      <b-progress :max="100" variant="secondary">
        <b-progress-bar
          :value="100"
          :label="'waiting for stake'"
        ></b-progress-bar>
      </b-progress>
    </td>
    <td class="text-right">
      {{ numeral(row.balance).format('0,0.0000') }} DAPP
    </td>
  </tr>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'vue-property-decorator'
import { vxm } from '@/store/'
import { Accountext, Package } from 'dapp-client'
import * as helper from '@/assets/_js/helpers'
import ActionButtons from '@/components/common/ActionButtons.vue'
import ServiceButton from '@/components/common/ServiceButton.vue'
import { currentTime } from '@/assets/_js/helpers'
import PackageButton from '@/components/common/PackageButton.vue'
const numeral = require('numeral')

@Component({
  components: {
    ActionButtons,
    ServiceButton,
    PackageButton
  }
})
export default class AccountsTableRow extends Vue {
  @Prop() row!: Accountext
  @Prop() count!: number
  @Prop() showAccount!: boolean
  @Prop() showActionBtn!: boolean
  private numeral = numeral
  private pkgJson: any = {
    error: true,
    errorMsg: '',
    data: {}
  }
  private dspJson: any = {
    error: true,
    errorMsg: '',
    data: {}
  }

  get currentUser() {
    return vxm.transit.currentUser
  }

  get pkg() {
    return vxm.dappservices.packageTable.find(
      (pkg: Package) =>
        pkg.provider === this.row.provider &&
        pkg.package_id === this.row.pending_package &&
        pkg.service === this.row.service
    )
  }

  get progressVariant() {
    if (this.packageEnd.percentage >= 90.0) return 'danger'
    else if (this.packageEnd.percentage >= 75.0) return 'warning'
    else return 'success'
  }

  get packageEnd() {
    const time = helper.currentTime()
    const delta = this.row.package_end - this.row.package_started
    const remaining = this.row.package_end - time
    const percentage = ((remaining / delta) * 100 - 100) * -1
    function msToTime(duration: any) {
      let minutes: any = Math.floor((duration / (1000 * 60)) % 60),
        hours: any = Math.floor((duration / (1000 * 60 * 60)) % 24)

      return hours + 'h ' + minutes + 'min'
    }
    if (time < this.row.package_end) {
      return {
        status: 'active',
        pkgEnd: [this.row.package_end, msToTime(remaining)],
        delta: delta,
        remaining: remaining,
        percentage: percentage
      }
    } else if (
      this.row.status === 'low stake' ||
      this.row.status === 'zero stake'
    ) {
      return {
        status: 'pending',
        pkgEnd: [0, 0],
        delta: delta,
        remaining: remaining,
        percentage: percentage
      }
    } else
      return {
        status: 'expired',
        pkgEnd: [msToTime(this.row.package_end), msToTime(remaining)],
        delta: delta,
        remaining: remaining,
        percentage: percentage
      }
  }

  get getNameLogo() {
    return helper.nameLogo(this.row.provider, this.pkgJson, this.dspJson)
  }

  get prettyServiceString() {
    return helper.prettyServiceString(this.row.service)
  }

  isUser(account: string) {
    if (!this.currentUser) return false
    else if (this.currentUser.accountName === account) return true
  }

  // Lifecycle hooks
  async mounted() {
    if (this.pkg && this.pkg.package_json_uri) {
      let pkgJson = await vxm.jsondb.getPkgJson(this.pkg)
      let dspJson = await vxm.jsondb.getDspJson(this.pkg)
      this.pkgJson = pkgJson
      this.dspJson = dspJson
    }
  }
  created() {}
  async updated() {
    if (this.pkg && this.pkg.package_json_uri) {
      let pkgJson = await vxm.jsondb.getPkgJson(this.pkg)
      let dspJson = await vxm.jsondb.getDspJson(this.pkg)
      this.pkgJson = pkgJson
      this.dspJson = dspJson
    }
  }
  destroyed() {}
}
</script>

<style lang="scss" scoped></style>
