import {
  VuexModule,
  mutation,
  action,
  getter,
  Module
} from 'vuex-class-component'
import { vxm } from '@/store/'

@Module({ namespacedPath: 'packages/' })
export class PackagesModule extends VuexModule {
  // state
  @getter isLoadingPkgs: boolean = false
  @getter selectedProvider: string[] = []
  @getter selectedService: string[] = []
  private showPkgFilter: boolean = true
  @getter selectedMinStake: number = 0
  @getter selectedQuota: number = 0
  @getter selectedPkgPeriod: number = 0
  @getter selectedStatus: string[] = ['Available', 'Selected']
  @getter sortBy: string = 'random'
  @getter orderBy: string = 'Ascending'

  // getters
  get getMinStakeRange() {
    let min: number = Number.MAX_SAFE_INTEGER
    let max: number = 0
    for (let pkg of vxm.dappservices.packageTable) {
      let pkgMin = parseFloat(pkg.min_stake_quantity)
      if (pkgMin < min) {
        min = pkgMin
      }
      if (pkgMin > max) {
        max = pkgMin
      }
    }
    if (min > max) return { min: 0, max: 1 }
    else return { min: min, max: max }
  }

  get getQuotaRange() {
    let min: number = Number.MAX_SAFE_INTEGER
    let max: number = 0
    for (let pkg of vxm.dappservices.packageTable) {
      let pkgMin = parseFloat(pkg.quota)
      if (pkgMin < min) {
        min = pkgMin
      }
      if (pkgMin > max) {
        max = pkgMin
      }
    }
    if (min > max) return { min: 0, max: 1 }
    else return { min: 1, max: max }
  }

  get getPkgPeriodRange() {
    let min: number = Number.MAX_SAFE_INTEGER
    let max: number = 0
    for (let pkg of vxm.dappservices.packageTable) {
      let pkgMin = pkg.package_period / 60 / 60
      if (pkgMin < min) {
        min = pkgMin
      }
      if (pkgMin > max) {
        max = pkgMin
      }
    }
    if (min > max) return { min: 0, max: 1 }
    else return { min: min, max: max }
  }

  get showFilter() {
    if (vxm.core.isMobile) {
      return !this.showPkgFilter
    } else return this.showPkgFilter
  }

  // mutations
  @mutation setLoadingPkgs(payload: boolean) {
    this.isLoadingPkgs = payload
  }
  @mutation setSelectedProvider(payload: string[]) {
    this.selectedProvider = payload
  }
  @mutation setSelectedService(payload: string[]) {
    this.selectedService = payload
  }
  @mutation setSelectedMinStake(payload: number) {
    this.selectedMinStake = payload
  }
  @mutation setSelectedQuota(payload: number) {
    this.selectedQuota = payload
  }
  @mutation setSelectedPkgPeriod(payload: number) {
    this.selectedPkgPeriod = payload
  }
  @mutation setSelectedStatus(payload: string[]) {
    this.selectedStatus = payload
  }
  @mutation setShowFilter(payload: boolean) {
    this.showPkgFilter = payload
  }
  @mutation setSortOrder(payload: any) {
    this.sortBy = payload.sort
    this.orderBy = payload.order
  }

  // actions
  @action async selectPackage(selectedPkg: any) {
    vxm.alerts.setAlert({
      show: true,
      dismissible: false,
      title: 'Selecting Package...',
      message: 'To select the package please allow this action in your wallet.',
      variant: 'warning'
    })
    vxm.transit.wallet.eosApi
      .transact(
        {
          delay_sec: vxm.core.settings.txDelaySec,
          actions: [
            {
              account: 'dappservices',
              name: 'selectpkg',
              authorization: [
                {
                  actor: vxm.transit.wallet.auth.accountName,
                  permission: vxm.transit.wallet.auth.permission
                }
              ],
              data: {
                owner: vxm.transit.wallet.auth.accountName,
                provider: selectedPkg.provider,
                service: selectedPkg.service,
                package: selectedPkg.package_id
              }
            }
          ]
        },
        {
          broadcast: true,
          blocksBehind: 3,
          expireSeconds: 60
        }
      )
      .then((resp: any) => {
        vxm.alerts.setAlert({
          show: true,
          dismissible: true,
          title: 'Package selected!',
          message: 'Package successfully selected.',
          variant: 'success',
          txId: resp.transaction_id,
          dismissSecs: 6,
          dismissCountDown: 6
        })
        setTimeout(function() {
          vxm.dappservices.getAccountTable()
        }, 700)
      })
      .catch((error: any) => {
        vxm.alerts.setAlert({
          show: true,
          dismissible: true,
          title: 'Package NOT selected!',
          message: 'Error while selecting package: ' + error.message,
          variant: 'danger',
          dismissSecs: 8,
          dismissCountDown: 8
        })
      })
  }

  @action async closePrv(selectedPrv: any) {
    vxm.alerts.setAlert({
      show: true,
      dismissible: false,
      title: 'Closing Package...',
      message: 'To close the package please allow this action in your wallet.',
      variant: 'warning'
    })
    vxm.transit.wallet.eosApi
      .transact(
        {
          delay_sec: vxm.core.settings.txDelaySec,
          actions: [
            {
              account: 'dappservices',
              name: 'closeprv',
              authorization: [
                {
                  actor: vxm.transit.wallet.auth.accountName,
                  permission: vxm.transit.wallet.auth.permission
                }
              ],
              data: {
                owner: vxm.transit.wallet.auth.accountName,
                service: selectedPrv.service,
                provider: selectedPrv.provider
              }
            }
          ]
        },
        {
          broadcast: true,
          blocksBehind: 3,
          expireSeconds: 60
        }
      )
      .then((resp: any) => {
        vxm.alerts.setAlert({
          show: true,
          dismissible: true,
          title: 'Package closed!',
          message: 'Package successfully closed.',
          variant: 'success',
          txId: resp.transaction_id,
          dismissSecs: 6,
          dismissCountDown: 6
        })
        setTimeout(function() {
          vxm.dappservices.getAccountTable()
        }, 700)
      })
      .catch((error: any) => {
        vxm.alerts.setAlert({
          show: true,
          dismissible: true,
          title: 'Package NOT closed!',
          message: 'Error while closing package: ' + error.message,
          variant: 'danger',
          dismissSecs: 8,
          dismissCountDown: 8
        })
      })
  }

  @action async getRefund(selectedPrv: any) {
    vxm.alerts.setAlert({
      show: true,
      dismissible: false,
      title: 'Refunding Tokens...',
      message:
        'To refund your DAPP Tokens please allow this action in your wallet.',
      variant: 'warning'
    })
    vxm.transit.wallet.eosApi
      .transact(
        {
          delay_sec: vxm.core.settings.txDelaySec,
          actions: [
            {
              account: 'dappservices',
              name: 'refund',
              authorization: [
                {
                  actor: vxm.transit.wallet.auth.accountName,
                  permission: vxm.transit.wallet.auth.permission
                }
              ],
              data: {
                to: vxm.transit.wallet.auth.accountName,
                service: selectedPrv.service,
                provider: selectedPrv.provider,
                symcode: 'DAPP'
              }
            }
          ]
        },
        {
          broadcast: true,
          blocksBehind: 3,
          expireSeconds: 60
        }
      )
      .then((resp: any) => {
        vxm.alerts.setAlert({
          show: true,
          dismissible: true,
          title: 'Refund completed!',
          message: 'Tokens successfully refunded.',
          variant: 'success',
          txId: resp.transaction_id,
          dismissSecs: 6,
          dismissCountDown: 6
        })
        setTimeout(function() {
          vxm.dappservices.getAccountTable()
        }, 700)
      })
      .catch((error: any) => {
        vxm.alerts.setAlert({
          show: true,
          dismissible: true,
          title: 'Refund NOT completed!',
          message: 'Error while refunding Tokens: ' + error.message,
          variant: 'danger',
          dismissSecs: 8,
          dismissCountDown: 8
        })
      })
  }
}

export const packages = PackagesModule.ExtractVuexModule(PackagesModule)
