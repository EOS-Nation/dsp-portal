<template>
  <tr
    :class="{
      'table-success': isPkgSelected(pkg),
      'table-danger': isDeprecated
    }"
  >
    <td class="text-center" style="min-width: 135px;">
      <action-buttons
        v-if="pkg"
        :pkg="pkg"
        :dspJson="detailedPkg.dspJson"
        :pkgJson="detailedPkg.pkgJson"
      />
    </td>
    <td class="text-center mr-1" style="width: 90px;">
      <router-link :to="{ name: 'PkgDetails', params: { id: pkg.id } }">
        <img
          class="img-avatar img-avatar-thumb img-avatar-rounded bg-white"
          :src="getNameLogo.pkgLogoUrl"
          alt="Package Logo"
        />
      </router-link>
    </td>
    <td class="ml-1" style="min-width: 260px;">
      <router-link :to="{ name: 'PkgDetails', params: { id: pkg.id } }">
        <div class="py-2">
          <p class="mb-0">
            <router-link
              :to="{ name: 'PkgDetails', params: { id: pkg.id } }"
              class="font-size-h5 text-primary font-w700 d-inline-block"
            >
              {{ getNameLogo.name }}
            </router-link>
          </p>
          <service-button :service="pkg.service" :pkgId="pkg.id" class="mr-1" />
          <package-button :package="pkg.package_id" :pkgId="pkg.id" />
        </div>
      </router-link>
    </td>
    <td class="text-center" style="min-width: 160px;">
      <p class="font-size-h3 text-black mb-0">
        {{ numeral(parseFloat(pkg.quota)).format('0,0[.][0000]') }}
      </p>
      <p class="font-size-sm font-w700 text-uppercase text-muted mb-0">
        {{ $t('component.packageTable.quota') }}
      </p>
    </td>
    <td class="text-center" style="min-width: 160px;">
      <p class="font-size-h3 text-black mb-0">
        {{ numeral(parseFloat(pkg.min_stake_quantity)).format('0,0[.][0000]') }}
      </p>
      <p class="font-size-sm font-w700 text-uppercase text-muted mb-0">
        {{ $t('component.packageTable.minStake') }}
      </p>
    </td>
    <td class="text-center" style="min-width: 160px;">
      <p class="font-size-h3 text-black mb-0">
        {{ numeral(pkg.package_period / 60 / 60).format('0[.][00]') }}h
      </p>
      <p class="font-size-sm font-w700 text-uppercase text-muted mb-0">
        {{ $t('component.packageTable.pkgPeriod') }}
      </p>
    </td>
    <td class="text-center" style="min-width: 160px;">
      <p class="font-size-h3 text-black mb-0">
        {{ numeral(pkg.min_unstake_period / 60 / 60).format('0[.][00]') }}h
      </p>
      <p class="font-size-sm font-w700 text-uppercase text-muted mb-0">
        {{ $t('component.packageTable.unstakePeriod') }}
      </p>
    </td>
  </tr>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'vue-property-decorator'
import * as helper from '@/assets/_js/helpers'
import { vxm } from '@/store/'
import { Package } from 'dapp-client'
import ActionButtons from '@/components/common/ActionButtons.vue'
const numeral = require('numeral')
import ServiceButton from '@/components/common/ServiceButton.vue'
import PackageButton from '@/components/common/PackageButton.vue'

@Component({
  components: {
    ActionButtons,
    ServiceButton,
    PackageButton
  }
})
export default class PackagesTable extends Vue {
  // props
  @Prop() private pkg!: Package
  // data
  private numeral = numeral
  private loading = true
  detailedPkg: any = {
    pkgJson: {
      error: true,
      errorMsg: '',
      data: {}
    },
    dspJson: {
      error: true,
      errorMsg: '',
      data: {}
    }
  }

  // computed
  get getNameLogo() {
    return helper.nameLogo(
      this.pkg.provider,
      this.detailedPkg.pkgJson,
      this.detailedPkg.dspJson
    )
  }

  get prettyServiceString() {
    return helper.prettyServiceString(this.pkg.service)
  }

  get isAuthenticated() {
    return (
      vxm.transit.walletState.authenticated &&
      !vxm.transit.walletState.authenticationError
    )
  }

  get isDeprecated() {
    return !(
      this.pkg.api_endpoint !== '' &&
      this.pkg.api_endpoint !== null &&
      this.pkg.api_endpoint !== 'null' &&
      this.pkg.api_endpoint !== undefined
    )
  }

  // methods
  selectPackage(pkg2select: any) {
    vxm.packages.selectPackage(pkg2select)
  }
  closePrv(prv2close: any) {
    vxm.packages.closePrv(prv2close)
  }

  getRefund(prv: any) {
    vxm.packages.getRefund(prv)
  }

  openStakingModal(action: string) {
    vxm.modals.setStakingModal({
      pkg: this.pkg,
      detailedPkg: this.detailedPkg,
      action: action
    })
    this.$bvModal.show('modal-staking')
  }

  isPkgSelected(pkg: any) {
    let result = false
    for (const el of vxm.user.selectedPackages) {
      if (
        el.provider === pkg.provider &&
        el.pending_package === pkg.package_id &&
        el.service === pkg.service
      ) {
        result = true
      }
    }
    return result
  }

  // Lifecycle hooks
  created() {}
  async mounted() {
    let pkgJson = await vxm.jsondb.getPkgJson(this.pkg)
    let dspJson = await vxm.jsondb.getDspJson(this.pkg)
    this.detailedPkg.pkgJson = pkgJson
    this.detailedPkg.dspJson = dspJson
    this.loading = false
  }
  updated() {}
  destroyed() {}
}
</script>

<style lang="scss" scoped></style>
