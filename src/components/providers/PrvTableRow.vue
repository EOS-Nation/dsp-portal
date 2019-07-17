<template>
  <tr>
    <td class="text-center" scope="row">{{ index + 1 }}</td>
    <td class="font-w600">
      <router-link
        :to="{
          name: 'PrvDetails',
          params: { provider: dsp.provider }
        }"
      >
        <img
          class="img-avatar img-avatar-thumb img-avatar-rounded img-avatar32 bg-white ml-0 mr-2"
          :src="getNameLogo.dspLogoUrl"
          alt="DSP Logo"
        />
        {{ getNameLogo.name }}
      </router-link>
    </td>
    <td class="text-right">
      {{ numeral(dsp.packages.length).format('0,0') }}
    </td>
    <td class="text-right">
      {{ numeral(dsp.services.length).format('0,0') }}
    </td>
    <td class="text-right">
      {{
        numeral(
          (dsp.balance / parseFloat(statextTable.staked)) *
            statextTable.inflation_daily
        ).format('0,0.0000')
      }}
    </td>
    <td class="text-right">
      {{ numeral(dsp.balance).format('0[.][0]a') }}
    </td>
    <td class="text-right">
      {{
        numeral((dsp.balance / parseFloat(statextTable.staked)) * 100).format(
          '0.0'
        )
      }}
      %
    </td>
    <td class="text-right">{{ dsp.userCount }}</td>
  </tr>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'vue-property-decorator'
import { vxm } from '@/store/'
import * as helper from '@/assets/_js/helpers'
import { Package } from 'dapp-client'

const numeral = require('numeral')

@Component
export default class PrvTableRow extends Vue {
  // props
  @Prop() dsp!: any
  @Prop() index!: number

  // data
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

  // computed
  get statextTable() {
    return vxm.dappservices.statextTable
  }

  get pkg() {
    return this.dsp.packages[0]
  }

  get getNameLogo() {
    return helper.nameLogo(this.dsp.provider, this.pkgJson, this.dspJson)
  }
  // method

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
