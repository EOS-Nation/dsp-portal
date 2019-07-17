import {
  VuexModule,
  mutation,
  action,
  getter,
  Module
} from 'vuex-class-component'
import { vxm } from '@/store/'

@Module({ namespacedPath: 'transit/' })
export class TransitModule extends VuexModule {
  @getter wallet: any = {}
  @getter walletState: any = {}

  get currentUser() {
    if (this.walletState.connected && this.wallet.auth) {
      return this.wallet.auth
    } else {
      return false
    }
  }

  @mutation logout() {
    localStorage.removeItem('autoLogin')
    this.wallet.terminate()
    this.wallet = {}
    vxm.alerts.setAlert({
      show: true,
      dismissible: true,
      title: 'Logged out',
      message: 'You have successfully logged out.',
      variant: 'success',
      dismissSecs: 4,
      dismissCountDown: 4
    })
  }
  @mutation setWallet(wallet: any) {
    this.wallet = wallet
    if (wallet.provider.id !== 'ledger') {
      if (
        wallet.provider.id !== 'whalevault' ||
        wallet.provider.id !== 'keycat'
      )
        localStorage.setItem('autoLogin', wallet.provider.id)
      vxm.user.getDappLiquid({
        account: wallet.auth.accountName,
        currentUser: true
      })
      vxm.user.getDapphdlData({
        account: wallet.auth.accountName,
        currentUser: true
      })
      vxm.user.getRefundTable({
        account: wallet.auth.accountName,
        currentUser: true
      })
      vxm.user.getStakingTable({
        account: wallet.auth.accountName,
        currentUser: true
      })
    }
  }
  @mutation setWalletState(state: any) {
    this.walletState = state
    if (state.authenticating)
      vxm.alerts.setAlert({
        show: true,
        dismissible: false,
        title: 'Authenticating...',
        message:
          'We are authenticating you. Please check your wallet and grant us access.',
        variant: 'warning'
      })
    if (state.connecting)
      vxm.alerts.setAlert({
        show: true,
        dismissible: false,
        title: 'Connecting...',
        message:
          'This could take a moment. We are trying to connect to your wallet. Make sure the wallet is running and unlocked.',
        variant: 'warning'
      })
    if (state.accountFetching)
      vxm.alerts.setAlert({
        show: true,
        dismissible: false,
        title: 'Fetching Account...',
        message: 'Almost done, just fetching some more data from EOS.',
        variant: 'warning'
      })
    if (state.authenticationError)
      vxm.alerts.setAlert({
        show: true,
        dismissible: true,
        title: 'Authentication Error',
        message: state.authenticationErrorMessage,
        variant: 'danger',
        dismissSecs: 8,
        dismissCountDown: 8
      })
    if (state.connectionError)
      vxm.alerts.setAlert({
        show: true,
        dismissible: true,
        title: 'Connection Error',
        message:
          state.connectionErrorMessage +
          '. Please make sure your wallet is running and unlocked.',
        variant: 'danger',
        dismissSecs: 8,
        dismissCountDown: 8
      })
    if (state.accountFetchError)
      vxm.alerts.setAlert({
        show: true,
        dismissible: true,
        title: 'Account Fetch Error',
        message: state.accountFetchErrorMessage,
        variant: 'danger',
        dismissSecs: 8,
        dismissCountDown: 8
      })
    if (state.accountInfo)
      vxm.alerts.setAlert({
        show: true,
        dismissible: true,
        title: 'Good to go!',
        message: 'Authentication Confirmed and data successfully fetched!',
        variant: 'success',
        dismissSecs: 4,
        dismissCountDown: 4
      })
  }
}

export const transit = TransitModule.ExtractVuexModule(TransitModule)
