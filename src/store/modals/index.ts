import {
  VuexModule,
  mutation,
  action,
  getter,
  Module
} from 'vuex-class-component'
import { DiscoveryData } from 'eos-transit'
import { Package } from 'dapp-client'

interface modalStaking {
  pkg: Package
  detailedPkg: any
  action: string
}
@Module({ namespacedPath: 'modals/' })
export class modalsModule extends VuexModule {
  @getter modalStaking: modalStaking | any = ''
  private modalLedger: DiscoveryData | any = {}

  get ledgerAccounts() {
    let list = []
    if (this.modalLedger && this.modalLedger.keyToAccountMap)
      for (let key of this.modalLedger.keyToAccountMap)
        if (key.accounts && key.accounts[0]) list.push(key)
    return list
  }

  @mutation setStakingModal(data: modalStaking) {
    this.modalStaking = data
  }

  @mutation setLedgerModal(data: DiscoveryData | {}) {
    this.modalLedger = data
  }
}
export const modals = modalsModule.ExtractVuexModule(modalsModule)
