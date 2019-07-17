import {
  VuexModule,
  mutation,
  action,
  getter,
  Module
} from 'vuex-class-component'
import { vxm } from '@/store'
import { accessContext } from '@/eostransit'
import * as helper from '@/assets/_js/helpers'
import { DappClient, DapphdlAccounts, Refunds, Staking } from 'dapp-client'

const endpoint = 'https://dsp.eosn.io'
const client = new DappClient(endpoint, {})

@Module({ namespacedPath: 'user/' })
export class userModule extends VuexModule {
  @getter userDappLiquid: number = 0
  @getter userRefundTable: Refunds[] = []
  @getter userStakingTable: Staking[] = []
  @getter userDapphdlData: DapphdlAccounts = {
    balance: '0.0000 DAPPHDL',
    allocation: '0.0000 DAPPHDL',
    staked: '0.0000 DAPPHDL',
    claimed: 0
  }
  @getter userLoginDappLiquid: number = 0
  @getter userLoginRefundTable: Refunds[] = []
  @getter userLoginStakingTable: Staking[] = []
  @getter dapphdlStakingTable: Staking[] = []
  @getter userLoginDapphdlData: DapphdlAccounts = {
    balance: '0.0000 DAPPHDL',
    allocation: '0.0000 DAPPHDL',
    staked: '0.0000 DAPPHDL',
    claimed: 0
  }

  get refundReq() {
    let refund = 0
    for (const row of this.userRefundTable) {
      if (row.unstake_time < helper.currentTime())
        refund += parseFloat(row.amount)
    }
    return refund
  }

  get refundReqLogin() {
    let refund = 0
    for (const row of this.userLoginRefundTable) {
      if (row.unstake_time < helper.currentTime())
        refund += parseFloat(row.amount)
    }
    return refund
  }

  get unstaking() {
    let amount = 0
    for (const row of this.userRefundTable) {
      if (row.unstake_time >= helper.currentTime())
        amount += parseFloat(row.amount)
    }
    return amount
  }

  get unstakingLogin() {
    let amount = 0
    for (const row of this.userLoginRefundTable) {
      if (row.unstake_time >= helper.currentTime())
        amount += parseFloat(row.amount)
    }
    return amount
  }

  get staked() {
    let amount = 0
    for (const row of this.userStakingTable) {
      amount += parseFloat(row.balance)
    }
    return amount
  }

  get stakedLogin() {
    let amount = 0
    for (const row of this.userLoginStakingTable) {
      amount += parseFloat(row.balance)
    }
    return amount
  }

  get selectedPackages() {
    let result = vxm.dappservices.accountTable
    return result.filter(
      (i: any) => i.account === vxm.transit.currentUser.accountName
    )
  }

  @action async getDappLiquid(data: any) {
    await accessContext.eosRpc
      .get_currency_balance('dappservices', data.account)
      .then(result => {
        if (result[0]) {
          if (data.currentUser) this.setLoginDappLiquid(parseFloat(result[0]))
          else this.setDappLiquid(parseFloat(result[0]))
        } else {
          if (data.currentUser) this.setLoginDappLiquid(0)
          else this.setDappLiquid(0)
        }
      })
      .catch(error => {
        if (data.currentUser) this.setLoginDappLiquid(0)
        else this.setDappLiquid(0)
        throw error
      })
  }

  @action async getDapphdlStakingTable() {
    let rows: Staking[] = []
    let more = true
    let offset = 0
    const limit = 500
    while (more) {
      await accessContext.eosRpc
        .get_table_rows({
          code: 'dappservices',
          table: 'staking',
          scope: 'dappairhodl1',
          limit: limit,
          lower_bound: offset.toString()
        })
        .then(result => {
          more = result.more
          offset = offset + limit
          rows = rows.concat(result.rows)
        })
        .catch(error => {
          console.log(error)
          throw error
        })
    }
    this.setDapphdlStakingTable(rows)
  }

  @action async getRefundTable(data: any) {
    let refund = await client.get_table_refunds(data.account, { limit: 500 })
    if (data.currentUser) this.setLoginDappRefundingTable(refund.rows)
    else this.setDappRefundingTable(refund.rows)
  }

  @action async getStakingTable(data: any) {
    this.getDapphdlStakingTable()
    let staked = await client.get_table_staking(data.account, { limit: 500 })
    if (data.currentUser) this.setLoginDappStakingTable(staked.rows)
    else this.setDappStakingTable(staked.rows)
  }

  @action async getDapphdlData(data: any) {
    let result = await client.get_dapphdl_accounts(data.account, { limit: 500 })
    if (result.rows[0]) {
      if (data.currentUser) this.setLoginDapphdlData(result.rows[0])
      else this.setDapphdlData(result.rows[0])
    } else {
      if (data.currentUser)
        this.setLoginDapphdlData({
          balance: '0.0000 DAPPHDL',
          allocation: '0.0000 DAPPHDL',
          staked: '0.0000 DAPPHDL',
          claimed: 0
        })
      else
        this.setDapphdlData({
          balance: '0.0000 DAPPHDL',
          allocation: '0.0000 DAPPHDL',
          staked: '0.0000 DAPPHDL',
          claimed: 0
        })
    }
  }

  @mutation setDappLiquid(amount: number) {
    this.userDappLiquid = amount
  }

  @mutation setDappRefundingTable(refunds: Refunds[]) {
    this.userRefundTable = refunds
  }

  @mutation setDappStakingTable(staking: Staking[]) {
    this.userStakingTable = staking
  }

  @mutation setDapphdlData(data: DapphdlAccounts) {
    this.userDapphdlData = data
  }

  @mutation setLoginDappLiquid(amount: number) {
    this.userLoginDappLiquid = amount
  }

  @mutation setLoginDappRefundingTable(refunds: Refunds[]) {
    this.userLoginRefundTable = refunds
  }

  @mutation setLoginDappStakingTable(staking: Staking[]) {
    this.userLoginStakingTable = staking
  }

  @mutation setLoginDapphdlData(data: DapphdlAccounts) {
    this.userLoginDapphdlData = data
  }
  @mutation setDapphdlStakingTable(data: Staking[]) {
    this.dapphdlStakingTable = data
  }
}
export const user = userModule.ExtractVuexModule(userModule)
