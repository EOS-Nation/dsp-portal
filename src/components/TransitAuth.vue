<template>
  <b-dropdown
    v-if="!isAuthenticated"
    variant="primary"
    right
    :disabled="isAlertShow"
  >
    <template slot="button-content">
      <img
        class="img-avatar img-avatar32 mr-1"
        src="@/assets/media/logos/transit.png"
        alt="Transit API"
      />
      <img
        v-if="!isMobile"
        class="img-avatar img-avatar32 mr-1"
        src="@/assets/media/logos/scatter.svg"
        alt="Scatter"
      />
      <img
        v-if="!isMobile"
        class="img-avatar img-avatar32 mr-1"
        src="@/assets/media/logos/ledger.png"
        alt="Ledger"
      />
      <img
        v-if="!isMobile"
        class="img-avatar img-avatar32 mr-1"
        src="@/assets/media/logos/whalevault.png"
        alt="WhaleVault"
      />
      <img
        v-if="!isMobile"
        class="img-avatar img-avatar32 mr-1"
        src="@/assets/media/logos/keycat.svg"
        alt="Keycat"
      />
      <img
        v-if="false"
        class="img-avatar img-avatar32 mr-1"
        src="@/assets/media/logos/meetone.jpg"
        alt="MeetOne"
      />
      <img
        v-if="false"
        class="img-avatar img-avatar32 mr-1"
        src="@/assets/media/logos/tp.jpg"
        alt="TokenPocket"
      />
    </template>
    <b-dd-header
      class="text-center text-muted"
      v-text="$t('auth.transit.desktop')"
    ></b-dd-header>
    <b-dropdown-item @click="initTransit('scatter')" :disabled="isMobile">
      <div class="d-flex justify-content-between align-items-center">
        <span class="font-weight-bolder">Scatter</span>
        <img
          class="img-avatar img-avatar32 mr-2"
          src="@/assets/media/logos/scatter.svg"
          alt="Scatter"
        />
      </div>
    </b-dropdown-item>
    <b-dropdown-item @click="initTransit('ledger')" :disabled="isMobile">
      <div class="d-flex justify-content-between align-items-center">
        <span class="font-weight-bolder">Ledger</span>
        <img
          class="img-avatar img-avatar32 mr-2"
          src="@/assets/media/logos/ledger.png"
          alt="Ledger"
        />
      </div>
    </b-dropdown-item>
    <b-dropdown-item @click="initTransit('whalevault')" :disabled="isMobile">
      <div class="d-flex justify-content-between align-items-center">
        <span class="font-weight-bolder">WhaleVault</span>
        <img
          class="img-avatar img-avatar32 mr-2"
          src="@/assets/media/logos/whalevault.png"
          alt="WhaleVault"
        />
      </div>
    </b-dropdown-item>
    <b-dd-header
      class="text-center text-muted"
      v-text="$t('auth.transit.mobile')"
    ></b-dd-header>
    <b-dropdown-item @click="initTransit('EOS Lynx')">
      <div class="d-flex justify-content-between align-items-center">
        <span class="font-weight-bolder">Lynx</span>
        <img
          class="img-avatar img-avatar32 mr-2"
          src="@/assets/media/logos/lynx.jpg"
          alt="Ledger"
        />
      </div>
    </b-dropdown-item>
    <b-dropdown-item @click="initTransit('meetone_provider')">
      <div class="d-flex justify-content-between align-items-center">
        <span class="font-weight-bolder">Meet.One</span>
        <img
          class="img-avatar img-avatar32 mr-2"
          src="@/assets/media/logos/meetone.jpg"
          alt="MeetOne"
        />
      </div>
    </b-dropdown-item>
    <b-dropdown-item @click="initTransit('TokenPocket')">
      <div class="d-flex justify-content-between align-items-center">
        <span class="font-weight-bolder">TokenPocket</span>
        <img
          class="img-avatar img-avatar32 mr-2"
          src="@/assets/media/logos/tp.jpg"
          alt="TokenPocket"
        />
      </div>
    </b-dropdown-item>
    <b-dropdown-item @click="initTransit('Keycat')">
      <div class="d-flex justify-content-between align-items-center">
        <span class="font-weight-bolder">Keycat</span>
        <img
          class="img-avatar img-avatar32 mr-2"
          src="@/assets/media/logos/keycat.svg"
          alt="Keycat"
        />
      </div>
    </b-dropdown-item>
  </b-dropdown>
  <b-dropdown
    v-else
    variant="primary"
    menu-class="p-0"
    right
    :disabled="isAlertShow"
  >
    <template slot="button-content">
      <img
        class="img-avatar img-avatar32 mr-1"
        :src="getWalletLogo"
        alt="Wallet Logo"
      />
      <span class="d-none d-sm-inline mx-2">{{ wallet.auth.accountName }}</span>
    </template>
    <div class="rounded-top font-w600 text-white text-center bg-gd-sea">
      <div class="p-3">
        <img
          class="img-avatar img-avatar-thumb"
          :src="getWalletLogo"
          alt="Wallet Logo"
        />
      </div>
      <div class="p-2 bg-black-25">
        <span class="text-white font-w700">{{ wallet.auth.accountName }}</span>
      </div>
    </div>
    <div class="p-2">
      <b-dropdown-item>
        <router-link
          :to="{
            name: 'AccountDetails',
            params: { account: wallet.auth.accountName }
          }"
          class="text-body d-flex justify-content-between align-items-center"
        >
          {{ $t('auth.transit.profile') }}
          <font-awesome-icon icon="user" fixed-width class="text-black-50" />
        </router-link>
      </b-dropdown-item>
      <b-dropdown-item>
        <router-link
          :to="{ name: 'Settings' }"
          class="text-body d-flex justify-content-between align-items-center"
        >
          {{ $t('auth.transit.settings') }}
          <font-awesome-icon icon="cog" fixed-width class="text-black-50" />
        </router-link>
      </b-dropdown-item>
      <b-dd-divider />
      <b-dropdown-item @click="logout()">
        <div
          class="d-flex justify-content-between align-items-center text-danger"
        >
          {{ $t('auth.transit.logout') }}
          <font-awesome-icon icon="power-off" fixed-width />
        </div>
      </b-dropdown-item>
    </div>
  </b-dropdown>
</template>

<script lang="ts">
import { Watch, Component, Vue } from 'vue-property-decorator'
import { vxm } from '@/store/'
import { accessContext } from '@/eostransit'
import { DiscoveryData, WalletProvider } from 'eos-transit'

@Component({
  props: {},
  components: {}
})
export default class TransitAuth extends Vue {
  walletProviders: WalletProvider[] = accessContext.getWalletProviders()
  walletProvider: WalletProvider | undefined
  wallet: any
  discoveryData: DiscoveryData | undefined

  get isAuthenticated() {
    return (
      vxm.transit.walletState.authenticated &&
      !vxm.transit.walletState.authenticationError
    )
  }

  get isMobile() {
    return vxm.core.isMobile
  }

  get isAlertShow() {
    return (
      vxm.transit.walletState.authenticating ||
      vxm.transit.walletState.connecting
    )
  }

  get getWalletLogo() {
    switch (this.wallet.provider.id) {
      case 'scatter': {
        return require('@/assets/media/logos/scatter.svg')
      }
      case 'EOS Lynx': {
        return require('@/assets/media/logos/lynx.jpg')
      }
      case 'meetone_provider': {
        return require('@/assets/media/logos/meetone.jpg')
      }
      case 'TokenPocket': {
        return require('@/assets/media/logos/tp.jpg')
      }
      case 'whalevault': {
        return require('@/assets/media/logos/whalevault.png')
      }
      case 'ledger': {
        return require('@/assets/media/logos/ledger.png')
      }
      case 'Keycat': {
        return require('@/assets/media/logos/keycat.svg')
      }
      default: {
        return require('@/assets/media/logos/eos.png')
      }
    }
  }

  async initTransit(walletId: string) {
    this.walletProvider = this.walletProviders.find(r => {
      return r.id === walletId
    })
    if (this.walletProvider !== undefined) {
      this.wallet = accessContext.initWallet(this.walletProvider)
    }
    //Subscrible to Transit wallet changes and bind it to a vue variable
    this.wallet.subscribe((walletState: any) => {
      if (walletState) vxm.transit.setWalletState(walletState)
    })
    await this.wallet.connect()
    try {
      //if wallet does not provide public keys (eg. scatter), proceed to login
      if (walletId !== 'ledger') {
        await this.wallet.login()
        try {
          vxm.transit.setWallet(this.wallet)
        } catch (ex) {
          console.error(ex)
        }
      }
      //if wallet provides one or more public keys (eg. ledger), allow user to choose desired account
      else {
        vxm.transit.setWallet(this.wallet)
        //start public key discovery for first index
        let more = true
        let i = 0
        while (more) {
          this.discoveryData = await this.wallet.discover({
            pathIndexList: [i]
          })
          if (
            this.discoveryData &&
            this.discoveryData.keyToAccountMap[i].accounts.length === 0
          ) {
            more = false
          }
          i++
        }
        if (
          this.discoveryData &&
          this.discoveryData.keyToAccountMap.length > 0
        ) {
          vxm.modals.setLedgerModal(this.discoveryData)
          this.$bvModal.show('modal-ledger')
        }
      }
    } catch (ex) {
      console.error(ex)
      vxm.alerts.setAlert({
        show: true,
        dismissible: true,
        title: 'Connection Error!',
        message:
          'Could not connect to your Wallet. Make sure your Wallet is unlocked. If using Ledger, make sure your Ledger is plugged in and the EOS App open.',
        variant: 'danger',
        dismissSecs: 8,
        dismissCountDown: 8
      })
    }
  }

  logout() {
    vxm.transit.logout()
  }

  // Lifecycle hooks
  created() {
    const autoLogin = localStorage.autoLogin
    if (autoLogin && vxm.core.settings.autoLogin) {
      this.initTransit(autoLogin)
    }
  }
  mounted() {}
  updated() {}
  destroyed() {}
}
</script>

<style lang="scss" scoped></style>
