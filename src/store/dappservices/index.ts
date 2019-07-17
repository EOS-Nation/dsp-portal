import {
  VuexModule,
  mutation,
  action,
  getter,
  Module
} from 'vuex-class-component'
import { Accountext, DappClient, Package } from 'dapp-client'
import { accessContext } from '@/eostransit'
import { vxm } from '@/store/'
import * as helper from '@/assets/_js/helpers'
const endpoint = 'https://nodes.get-scatter.com'
// const endpoint = 'https://kylin.eoscanada.com'
const client = new DappClient(endpoint, {})

@Module({ namespacedPath: 'dappservices/' })
export class dappservicesModule extends VuexModule {
  @getter packageTable: Package[] = []
  @getter accountTable: Accountext[] = []
  @getter statextTable: any = {}

  get dspRanking() {
    let dspList: any = []
    for (const pkg of this.packageTable) {
      if (
        !dspList.find((prv: any) => prv.provider === pkg.provider) &&
        (pkg.api_endpoint !== '' &&
          pkg.api_endpoint !== null &&
          pkg.api_endpoint !== 'null' &&
          pkg.api_endpoint !== undefined)
      ) {
        dspList.push({
          provider: pkg.provider,
          packages: [pkg],
          services: [pkg.service],
          balance: 0,
          userCount: 0
        })
      } else if (
        pkg.api_endpoint !== '' &&
        pkg.api_endpoint !== null &&
        pkg.api_endpoint !== 'null' &&
        pkg.api_endpoint !== undefined
      ) {
        let index = dspList.findIndex((el: any) => el.provider === pkg.provider)
        dspList[index].packages.push(pkg)
        if (
          !dspList[index].services.find(
            (service: string) => service === pkg.service
          )
        ) {
          dspList[index].services.push(pkg.service)
        }
      }
    }
    for (const dsp of this.accountTable) {
      let index = dspList.findIndex((el: any) => el.provider === dsp.provider)
      if (dspList[index]) {
        dspList[index].balance += parseFloat(dsp.balance)
        dspList[index].userCount++
      }
    }
    return dspList
  }

  get getAllServices() {
    let services: any = []
    this.packageTable.forEach((pkg: Package) => {
      if (!services.find((s: any) => s.value === pkg.service)) {
        let name = helper.prettyServiceString(pkg.service)
        let icon = 'asterisk'
        if (pkg.service === 'ipfsservice1') icon = 'memory'
        else if (pkg.service === 'stakeservice') icon = 'chart-line'
        else if (pkg.service === 'oracleservic') icon = 'database'
        else if (pkg.service === 'cronservices') icon = 'clock'
        else icon = 'asterisk'
        services.push({
          text: name,
          value: pkg.service,
          pkgCount: 1,
          desc: name,
          icon: icon
        })
      } else {
        let index = services.findIndex((el: any) => el.value === pkg.service)
        services[index].pkgCount++
      }
    })
    return services
  }

  get getAllProviders() {
    let providers: any = []
    this.packageTable.forEach((pkg: Package) => {
      if (!providers.find((p: any) => p.name === pkg.provider)) {
        providers.push({
          name: pkg.provider,
          pkgCount: 1
        })
      } else {
        let index = providers.findIndex((el: any) => el.name === pkg.provider)
        providers[index].pkgCount++
      }
    })
    return providers
  }

  @action async getAllPkgs() {
    vxm.packages.setLoadingPkgs(true)
    await this.getPackageTable()
    await this.getAccountTable()
    await this.getStatextTable()
    vxm.packages.setSelectedMinStake(vxm.packages.getMinStakeRange.max)
    vxm.packages.setSelectedQuota(vxm.packages.getQuotaRange.max)
    vxm.packages.setSelectedPkgPeriod(vxm.packages.getPkgPeriodRange.max)
    vxm.packages.setLoadingPkgs(false)
  }

  @action async getPackageTable() {
    let rows: Package[] = []
    let more: boolean = true
    let offset: number = 0
    while (more) {
      const response = await client.get_table_package({
        limit: 500,
        lower_bound: offset.toString()
      })
      more = response.more
      offset = offset + 500
      rows = rows.concat(response.rows)
    }
    let randomArray = rows
    let currentIndex = randomArray.length,
      temporaryValue,
      randomIndex
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex -= 1

      // And swap it with the current element.
      temporaryValue = randomArray[currentIndex]
      randomArray[currentIndex] = randomArray[randomIndex]
      randomArray[randomIndex] = temporaryValue
    }
    this.setPackages(randomArray)
  }

  @action async getAccountTable() {
    let rows: Accountext[] = []
    let more: boolean = true
    let offset: number = 0
    while (more) {
      const response = await client.get_table_accountext({
        limit: 500,
        lower_bound: offset.toString()
      })
      more = response.more
      offset = offset + 500
      rows = rows.concat(response.rows)
    }
    let result = await this.getCleanAccounts(rows)
    this.setAccountTable(result)
    return result
  }

  @action async getCleanAccounts(accounts: Accountext[]) {
    let a = []
    let i = 0
    for (const row of accounts) {
      let pkg = this.packageTable.find(
        (pkg: Package) =>
          pkg.provider === row.provider &&
          pkg.package_id === row.pending_package &&
          pkg.service === row.service
      )
      let account: Accountext = row
      if (pkg) {
        account.status = helper.accountStatus(account, pkg)
        a.push(account)
      }
    }
    return a
  }

  @action async getStatextTable() {
    const statext = await accessContext.eosRpc.get_table_rows({
      code: 'dappservices',
      table: 'statext',
      scope: '......2ke1.o4',
      limit: 1
    })
    const dappSupply = await accessContext.eosRpc.get_currency_stats(
      'dappservices',
      'DAPP'
    )
    const dappSupplyInstant = await accessContext.eosRpc.get_currency_balance(
      'dappservices',
      'instanttrack',
      'DAPP'
    )
    const dappSupplyRegular = await accessContext.eosRpc.get_currency_balance(
      'dappservices',
      'regulartrack',
      'DAPP'
    )
    statext.rows[0].supply = dappSupply.DAPP.supply
    statext.rows[0].supply_instant = dappSupplyInstant[0]
    statext.rows[0].supply_regular = dappSupplyRegular[0]
    statext.rows[0].max_supply = dappSupply.DAPP.max_supply
    statext.rows[0].inflation_daily =
      parseFloat(statext.rows[0].inflation_per_block) *
      2 *
      60 *
      60 *
      24 *
      parseFloat(statext.rows[0].supply)
    this.setStatextTable(statext.rows[0])
  }

  @mutation setPackages(data: Package[]) {
    this.packageTable = data
  }
  @mutation setAccountTable(data: Accountext[]) {
    let result: Accountext[] = []
    for (const row of data) {
      if (
        !result.find(
          (account: Accountext) =>
            account.account === row.account &&
            account.balance === row.balance &&
            account.service === row.service &&
            account.id === row.id
        )
      ) {
        result.push(row)
      }
    }
    this.accountTable = result
  }

  @mutation setStatextTable(data: any) {
    this.statextTable = data
  }
}

export const dappservices = dappservicesModule.ExtractVuexModule(
  dappservicesModule
)
