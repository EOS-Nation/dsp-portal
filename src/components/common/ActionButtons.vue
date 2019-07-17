<template>
  <div>
    <div
      v-if="!isAuthenticated"
      v-b-tooltip.hover
      :title="$t('component.packageCard.loginReq')"
    >
      <b-btn variant="success" size="sm" class="btn-block mb-2" disabled>
        <font-awesome-icon icon="check" fixed-width class="mr-1" />
        {{ $t('component.packageCard.select') }}
      </b-btn>
    </div>
    <b-btn
      v-else-if="!isPkgSelected"
      @click="selectPackage(pkg)"
      variant="success"
      size="sm"
      class="btn-block"
      ><font-awesome-icon icon="check" fixed-width class="mr-1" />
      {{ $t('component.packageCard.select') }}</b-btn
    >
    <b-dropdown
      v-else
      variant="success"
      right
      size="sm"
      no-caret
      class="btn-block"
    >
      <template slot="button-content">
        <font-awesome-icon
          icon="microchip"
          fixed-width
          class="mr-1"
          rotation="90"
        />
        {{ $t('component.packageCard.actions') }}
      </template>
      <b-dropdown-item @click="openStakingModal('stake')">
        {{ $t('component.packageCard.stake') }}
      </b-dropdown-item>
      <b-dropdown-item @click="openStakingModal('unstake')">
        {{ $t('component.packageCard.unstake') }}
      </b-dropdown-item>
      <b-dropdown-item @click="getRefund(pkg)">
        {{ $t('component.packageCard.refund') }}
      </b-dropdown-item>
      <b-dd-divider />
      <b-dropdown-item @click="closePrv(pkg)">
        {{ $t('component.packageCard.close') }}
      </b-dropdown-item>
    </b-dropdown>
    <b-btn
      :to="{ name: 'PkgDetails', params: { id: pkg.id } }"
      variant="primary"
      size="sm"
      class="btn-block"
      ><font-awesome-icon icon="info-circle" fixed-width class="mr-1" />
      {{ $t('component.packageCard.details') }}</b-btn
    >
  </div>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'vue-property-decorator'
import * as helper from '@/assets/_js/helpers'
import { vxm } from '@/store/'
import { Package } from 'dapp-client'

@Component
export default class ActionButtons extends Vue {
  // props
  @Prop() private pkg!: Package
  @Prop() private pkgJson!: any
  @Prop() private dspJson!: any
  // data
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

  get isPkgSelected() {
    let result = false
    for (const el of vxm.user.selectedPackages) {
      if (
        el.provider === this.pkg.provider &&
        el.pending_package === this.pkg.package_id &&
        el.service === this.pkg.service
      ) {
        result = true
      }
    }
    return result
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
      detailedPkg: {
        pkgJson: this.pkgJson,
        dspJson: this.dspJson
      },
      action: action
    })
    this.$bvModal.show('modal-staking')
  }

  // Lifecycle hooks
  created() {}
  mounted() {}
  updated() {}
  destroyed() {}
}
</script>

<style lang="scss" scoped></style>
