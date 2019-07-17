<template>
  <div class="block block-rounded" :class="{ 'block-mode-loading': loading }">
    <div
      class="block-content py-4 text-center"
      :class="[
        { 'bg-gd-aqua': isPkgSelected() && !isDeprecated && !loading },
        { 'bg-gd-primary': (!isPkgSelected() && !isDeprecated) || loading },
        { 'bg-gd-fruit': isDeprecated && !loading }
      ]"
    >
      <img
        class="img-avatar img-avatar-thumb img-avatar-rounded mb-4 bg-white"
        :src="getNameLogo.pkgLogoUrl"
        alt="Package Logo"
      />
      <h3 class="font-size-h4 font-w700 mb-2">
        <router-link
          class="text-white"
          :to="{ name: 'PrvDetails', params: { provider: pkg.provider } }"
          >{{ getNameLogo.name }}</router-link
        >
      </h3>
      <div class="d-flex justify-content-center">
        <service-button :service="pkg.service" :pkgId="pkg.id" class="mr-1" />
        <package-button :package="pkg.package_id" :pkgId="pkg.id" />
      </div>
    </div>
    <div class="block-content block-content-full text-center bg-primary-light">
      <div class="row gutters-tiny d-flex justify-content-center">
        <div
          v-if="!isAuthenticated"
          v-b-tooltip.hover
          :title="$t('component.packageCard.loginReq')"
          class="col-6"
        >
          <b-btn size="sm" variant="light" class="btn-block" disabled>
            <font-awesome-icon icon="check" class="mr-1 text-muted" />
            {{ $t('component.packageCard.select') }}
          </b-btn>
        </div>
        <div v-else-if="!isPkgSelected()" class="col-6">
          <b-btn
            @click="selectPackage(pkg)"
            size="sm"
            variant="light"
            class="btn-block"
          >
            <font-awesome-icon icon="check" class="mr-1 text-muted" />
            {{ $t('component.packageCard.select') }}
          </b-btn>
        </div>
        <div v-else class="col-6">
          <b-dropdown
            variant="light"
            right
            size="sm"
            no-caret
            class="btn-block"
          >
            <template slot="button-content">
              <font-awesome-icon
                icon="microchip"
                class="mr-1 text-muted"
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
        </div>
        <div v-if="showDetailsBtn" class="col-6">
          <b-btn
            :to="{ name: 'PkgDetails', params: { id: pkg.id } }"
            size="sm"
            variant="light"
            class="btn-block"
          >
            <font-awesome-icon icon="info-circle" class="mr-1 text-muted" />
            {{ $t('component.packageCard.details') }}
          </b-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Watch, Prop, Component, Vue } from 'vue-property-decorator'
import { vxm } from '@/store/'
import * as helper from '@/assets/_js/helpers'
import PackageButton from '@/components/common/PackageButton.vue'
import ServiceButton from '@/components/common/ServiceButton.vue'

@Component({
  components: {
    ServiceButton,
    PackageButton
  }
})
export default class PackageCard extends Vue {
  // prop
  @Prop() private pkg!: any
  @Prop() private showDetailsBtn?: boolean

  // data
  loading = true
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

  isPkgSelected() {
    for (const el of vxm.user.selectedPackages) {
      if (
        el.provider === this.pkg.provider &&
        el.pending_package === this.pkg.package_id &&
        el.service === this.pkg.service
      ) {
        return true
      }
    }
    return false
  }

  async loadData() {
    this.loading = true
    if (this.pkg) {
      let pkgJson = await vxm.jsondb.getPkgJson(this.pkg)
      let dspJson = await vxm.jsondb.getDspJson(this.pkg)
      this.detailedPkg.pkgJson = pkgJson
      this.detailedPkg.dspJson = dspJson
    }
    this.loading = false
  }

  @Watch('pkg')
  async onPkgChange(val: any, oldVal: any) {
    await this.loadData()
  }

  // Lifecycle hooks
  created() {}
  async mounted() {
    await this.loadData()
  }
  updated() {}
  destroyed() {}
}
</script>

<style lang="scss" scoped></style>
