<template>
  <div>
    <h2 class="text-center">Statistics</h2>
    <h3>DAPP Token Resources</h3>
    <b-row class="row-deck gutters-tiny">
      <div class="col-12 col-sm-6 col-lg-3">
        <simple-tile
          title="Current Supply"
          :value="numeral(statextTable.supply).format('0.000a')"
        />
      </div>
      <div class="col-12 col-sm-6 col-lg-3">
        <simple-tile
          title="Active Supply"
          :value="numeral(activeSupply).format('0.000a')"
        />
      </div>
      <div class="col-12 col-sm-6 col-lg-3">
        <simple-tile
          title="Daily Inflation"
          :value="numeral(statextTable.inflation_daily).format('0,0')"
        />
      </div>
      <div class="col-12 col-sm-6 col-lg-3">
        <simple-tile
          title="Total Staked"
          :value="numeral(statextTable.staked).format('0.000a')"
        />
      </div>
    </b-row>
    <b-row class="row-deck gutters-tiny mb-5 justify-content-center">
      <b-col md="6" xl="4">
        <div class="block block-rounded block-bordered">
          <div class="block-content">
            <h5 class="text-center" v-text="'DAPP/-HDL Staked'" />
            <table class="table table-borderless table-striped">
              <tbody>
                <tr>
                  <td class="font-w700">
                    Total Staked
                  </td>
                  <td class="text-right">
                    {{ numeral(totalStaked).format('0,0') }}
                  </td>
                </tr>
                <tr>
                  <td class="font-w700">
                    in % of current Supply
                  </td>
                  <td class="text-right">
                    {{
                      numeral(
                        totalStaked / parseFloat(statextTable.supply)
                      ).format('0.0 %')
                    }}
                  </td>
                </tr>
                <tr>
                  <td class="font-w700">
                    DAPP Staked
                  </td>
                  <td class="text-right">
                    {{ numeral(dappStaked).format('0,0') }}
                  </td>
                </tr>
                <tr>
                  <td class="font-w700">DAPPHDL Staked</td>
                  <td class="text-right">
                    {{ numeral(dapphdlStaked).format('0,0') }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </b-col>
      <b-col md="6" xl="4">
        <div class="block block-rounded block-bordered">
          <div class="block-content">
            <h5 class="text-center" v-text="'Staked by Service'" />
            <table class="table table-borderless table-striped">
              <tbody>
                <tr>
                  <td class="font-w700">
                    VRAM
                  </td>
                  <td class="text-right">
                    {{ numeral(stakedByService.ipfs).format('0,0') }}
                  </td>
                </tr>
                <tr>
                  <td class="font-w700">STAKE</td>
                  <td class="text-right">
                    {{ numeral(stakedByService.stake).format('0,0') }}
                  </td>
                </tr>
                <tr>
                  <td class="font-w700">
                    ORACLE
                  </td>
                  <td class="text-right">
                    {{ numeral(stakedByService.oracle).format('0,0') }}
                  </td>
                </tr>
                <tr>
                  <td class="font-w700">CRON</td>
                  <td class="text-right">
                    {{ numeral(stakedByService.cron).format('0,0') }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </b-col>
    </b-row>
    <h3>DAPP Users</h3>
    <b-row class="row-deck gutters-tiny">
      <div class="col-12 col-sm-6 col-lg-3">
        <simple-tile title="Total Users" :value="accountTable.length" />
      </div>
      <div class="col-12 col-sm-6 col-lg-3">
        <simple-tile title="Active" :value="usersByStatus.active.length" />
      </div>
      <div class="col-12 col-sm-6 col-lg-3">
        <simple-tile title="Low Stake" :value="usersByStatus.lowStake.length" />
      </div>
      <div class="col-12 col-sm-6 col-lg-3">
        <simple-tile
          title="Zero Stake"
          :value="usersByStatus.zeroStake.length"
        />
      </div>
    </b-row>
    <b-row class="row-deck gutters-tiny mb-5">
      <b-col md="6" lg="3">
        <div class="block block-rounded block-bordered">
          <div class="block-content">
            <h5 class="text-center" v-text="'Total Users by Service'" />
            <table class="table table-borderless table-striped">
              <tbody>
                <tr>
                  <td class="font-w700">
                    VRAM
                  </td>
                  <td class="text-right">{{ usersByService.ipfs.length }}</td>
                </tr>
                <tr>
                  <td class="font-w700">
                    STAKE
                  </td>
                  <td class="text-right">{{ usersByService.stake.length }}</td>
                </tr>
                <tr>
                  <td class="font-w700">ORACLE</td>
                  <td class="text-right">{{ usersByService.oracle.length }}</td>
                </tr>
                <tr>
                  <td class="font-w700">CRON</td>
                  <td class="text-right">{{ usersByService.cron.length }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </b-col>
      <b-col md="6" lg="3">
        <div class="block block-rounded block-bordered">
          <div class="block-content">
            <h5 class="text-center" v-text="'Active Users by Service'" />
            <table class="table table-borderless table-striped">
              <tbody>
                <tr>
                  <td class="font-w700">
                    VRAM
                  </td>
                  <td class="text-right">
                    {{ activeUsersByService.ipfs.length }}
                  </td>
                </tr>
                <tr>
                  <td class="font-w700">
                    STAKE
                  </td>
                  <td class="text-right">
                    {{ activeUsersByService.stake.length }}
                  </td>
                </tr>
                <tr>
                  <td class="font-w700">ORACLE</td>
                  <td class="text-right">
                    {{ activeUsersByService.oracle.length }}
                  </td>
                </tr>
                <tr>
                  <td class="font-w700">CRON</td>
                  <td class="text-right">
                    {{ activeUsersByService.cron.length }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </b-col>
      <b-col md="6" lg="3">
        <div class="block block-rounded block-bordered">
          <div class="block-content">
            <h5 class="text-center" v-text="'Low Stake Users by Service'" />
            <table class="table table-borderless table-striped">
              <tbody>
                <tr>
                  <td class="font-w700">
                    VRAM
                  </td>
                  <td class="text-right">
                    {{ lowStakeUsersByService.ipfs.length }}
                  </td>
                </tr>
                <tr>
                  <td class="font-w700">
                    STAKE
                  </td>
                  <td class="text-right">
                    {{ lowStakeUsersByService.stake.length }}
                  </td>
                </tr>
                <tr>
                  <td class="font-w700">ORACLE</td>
                  <td class="text-right">
                    {{ lowStakeUsersByService.oracle.length }}
                  </td>
                </tr>
                <tr>
                  <td class="font-w700">CRON</td>
                  <td class="text-right">
                    {{ lowStakeUsersByService.cron.length }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </b-col>
      <b-col md="6" lg="3">
        <div class="block block-rounded block-bordered">
          <div class="block-content">
            <h5 class="text-center" v-text="'Zero Stake Users by Service'" />
            <table class="table table-borderless table-striped">
              <tbody>
                <tr>
                  <td class="font-w700">
                    VRAM
                  </td>
                  <td class="text-right">
                    {{ zeroStakeUsersByService.ipfs.length }}
                  </td>
                </tr>
                <tr>
                  <td class="font-w700">
                    STAKE
                  </td>
                  <td class="text-right">
                    {{ zeroStakeUsersByService.stake.length }}
                  </td>
                </tr>
                <tr>
                  <td class="font-w700">ORACLE</td>
                  <td class="text-right">
                    {{ zeroStakeUsersByService.oracle.length }}
                  </td>
                </tr>
                <tr>
                  <td class="font-w700">CRON</td>
                  <td class="text-right">
                    {{ zeroStakeUsersByService.cron.length }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </b-col>
    </b-row>
    <h3>DSPs and Packages</h3>
    <b-row class="row-deck gutters-tiny">
      <div class="col-12 col-sm-6 col-lg-3">
        <simple-tile title="Total DSPs" :value="dspRanking.length" />
      </div>
      <div class="col-12 col-sm-6 col-lg-3">
        <simple-tile title="Total Packages" :value="packageTable.length" />
      </div>
      <div class="col-12 col-sm-6 col-lg-3">
        <simple-tile
          title="Pkg Available"
          :value="pkgByStatus.available.length"
        />
      </div>
      <div class="col-12 col-sm-6 col-lg-3">
        <simple-tile
          title="Pkg Deprecated"
          :value="pkgByStatus.deprecated.length"
        />
      </div>
    </b-row>
    <b-row class="row-deck gutters-tiny">
      <b-col md="6" lg="3">
        <div class="block block-rounded block-bordered">
          <div class="block-content">
            <h5 class="text-center" v-text="'DSPs by Service'" />
            <table class="table table-borderless table-striped">
              <tbody>
                <tr>
                  <td class="font-w700">
                    VRAM
                  </td>
                  <td class="text-right">{{ dspByService.ipfs }}</td>
                </tr>
                <tr>
                  <td class="font-w700">
                    STAKE
                  </td>
                  <td class="text-right">{{ dspByService.stake }}</td>
                </tr>
                <tr>
                  <td class="font-w700">ORACLE</td>
                  <td class="text-right">{{ dspByService.oracle }}</td>
                </tr>
                <tr>
                  <td class="font-w700">CRON</td>
                  <td class="text-right">{{ dspByService.cron }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </b-col>
      <b-col md="6" lg="3">
        <div class="block block-rounded block-bordered">
          <div class="block-content">
            <h5 class="text-center" v-text="'Total PKG by Service'" />
            <table class="table table-borderless table-striped">
              <tbody>
                <tr>
                  <td class="font-w700">
                    VRAM
                  </td>
                  <td class="text-right">{{ pkgByService.ipfs.length }}</td>
                </tr>
                <tr>
                  <td class="font-w700">
                    STAKE
                  </td>
                  <td class="text-right">{{ pkgByService.stake.length }}</td>
                </tr>
                <tr>
                  <td class="font-w700">ORACLE</td>
                  <td class="text-right">{{ pkgByService.oracle.length }}</td>
                </tr>
                <tr>
                  <td class="font-w700">CRON</td>
                  <td class="text-right">{{ pkgByService.cron.length }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </b-col>
      <b-col md="6" lg="3">
        <div class="block block-rounded block-bordered">
          <div class="block-content">
            <h5 class="text-center" v-text="'Available PKG by Service'" />
            <table class="table table-borderless table-striped">
              <tbody>
                <tr>
                  <td class="font-w700">
                    VRAM
                  </td>
                  <td class="text-right">
                    {{ availablePkgByService.ipfs.length }}
                  </td>
                </tr>
                <tr>
                  <td class="font-w700">
                    STAKE
                  </td>
                  <td class="text-right">
                    {{ availablePkgByService.stake.length }}
                  </td>
                </tr>
                <tr>
                  <td class="font-w700">ORACLE</td>
                  <td class="text-right">
                    {{ availablePkgByService.oracle.length }}
                  </td>
                </tr>
                <tr>
                  <td class="font-w700">CRON</td>
                  <td class="text-right">
                    {{ availablePkgByService.cron.length }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </b-col>
      <b-col md="6" lg="3">
        <div class="block block-rounded block-bordered">
          <div class="block-content">
            <h5 class="text-center" v-text="'Deprecated PKG by Service'" />
            <table class="table table-borderless table-striped">
              <tbody>
                <tr>
                  <td class="font-w700">
                    VRAM
                  </td>
                  <td class="text-right">
                    {{ deprecatedPkgByService.ipfs.length }}
                  </td>
                </tr>
                <tr>
                  <td class="font-w700">
                    STAKE
                  </td>
                  <td class="text-right">
                    {{ deprecatedPkgByService.stake.length }}
                  </td>
                </tr>
                <tr>
                  <td class="font-w700">ORACLE</td>
                  <td class="text-right">
                    {{ deprecatedPkgByService.oracle.length }}
                  </td>
                </tr>
                <tr>
                  <td class="font-w700">CRON</td>
                  <td class="text-right">
                    {{ deprecatedPkgByService.cron.length }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script lang="ts">
import { Prop, Watch, Component, Vue } from 'vue-property-decorator'
import { vxm } from '@/store/'
import SimpleTile from '@/components/common/SimpleTile.vue'
import { Accountext, Package } from 'dapp-client'

const numeral = require('numeral')

@Component({
  components: {
    SimpleTile
  }
})
export default class Statistics extends Vue {
  // data
  private numeral = numeral

  // computed
  get dspRanking() {
    return vxm.dappservices.dspRanking
  }

  get accountTable() {
    return vxm.dappservices.accountTable
  }

  get packageTable() {
    return vxm.dappservices.packageTable
  }

  get statextTable() {
    return vxm.dappservices.statextTable
  }

  get dapphdlStakedTable() {
    return vxm.user.dapphdlStakingTable
  }

  get totalStaked() {
    return parseFloat(this.statextTable.staked)
  }

  get activeSupply() {
    return (
      parseFloat(this.statextTable.supply) -
      parseFloat(this.statextTable.supply_instant) -
      parseFloat(this.statextTable.supply_regular)
    )
  }

  get dapphdlStaked() {
    let staked = 0
    for (const a of this.dapphdlStakedTable) {
      staked += parseFloat(a.balance)
    }
    return staked
  }

  get dappStaked() {
    return this.totalStaked - this.dapphdlStaked
  }

  get stakedByService() {
    let ipfs = 0
    let cron = 0
    let oracle = 0
    let stake = 0
    for (const a of this.usersByService.ipfs) {
      ipfs += parseFloat(a.balance)
    }
    for (const a of this.usersByService.cron) {
      cron += parseFloat(a.balance)
    }
    for (const a of this.usersByService.oracle) {
      oracle += parseFloat(a.balance)
    }
    for (const a of this.usersByService.stake) {
      stake += parseFloat(a.balance)
    }
    return { ipfs: ipfs, cron: cron, oracle: oracle, stake: stake }
  }

  get usersByStatus() {
    let active: Accountext[] = []
    let lowStake: Accountext[] = []
    let zeroStake: Accountext[] = []
    active = this.accountTable.filter((a: Accountext) => a.status === 'active')
    lowStake = this.accountTable.filter(
      (a: Accountext) => a.status === 'low stake'
    )
    lowStake.concat(
      this.accountTable.filter((a: Accountext) => a.status === 'depleted')
    )
    zeroStake = this.accountTable.filter(
      (a: Accountext) => a.status === 'zero stake'
    )
    return { active: active, lowStake: lowStake, zeroStake: zeroStake }
  }

  get usersByService() {
    let ipfs: Accountext[] = []
    let cron: Accountext[] = []
    let oracle: Accountext[] = []
    let stake: Accountext[] = []
    ipfs = this.accountTable.filter(
      (a: Accountext) => a.service === 'ipfsservice1'
    )
    cron = this.accountTable.filter(
      (a: Accountext) => a.service === 'cronservices'
    )
    oracle = this.accountTable.filter(
      (a: Accountext) => a.service === 'oracleservic'
    )
    stake = this.accountTable.filter(
      (a: Accountext) => a.service === 'stakeservice'
    )
    return { ipfs: ipfs, cron: cron, oracle: oracle, stake: stake }
  }

  get activeUsersByService() {
    let ipfs: Accountext[] = []
    let cron: Accountext[] = []
    let oracle: Accountext[] = []
    let stake: Accountext[] = []
    ipfs = this.usersByStatus.active.filter(
      (a: Accountext) => a.service === 'ipfsservice1'
    )
    cron = this.usersByStatus.active.filter(
      (a: Accountext) => a.service === 'cronservices'
    )
    oracle = this.usersByStatus.active.filter(
      (a: Accountext) => a.service === 'oracleservic'
    )
    stake = this.usersByStatus.active.filter(
      (a: Accountext) => a.service === 'stakeservice'
    )
    return { ipfs: ipfs, cron: cron, oracle: oracle, stake: stake }
  }

  get lowStakeUsersByService() {
    let ipfs: Accountext[] = []
    let cron: Accountext[] = []
    let oracle: Accountext[] = []
    let stake: Accountext[] = []
    ipfs = this.usersByStatus.lowStake.filter(
      (a: Accountext) => a.service === 'ipfsservice1'
    )
    cron = this.usersByStatus.lowStake.filter(
      (a: Accountext) => a.service === 'cronservices'
    )
    oracle = this.usersByStatus.lowStake.filter(
      (a: Accountext) => a.service === 'oracleservic'
    )
    stake = this.usersByStatus.lowStake.filter(
      (a: Accountext) => a.service === 'stakeservice'
    )
    return { ipfs: ipfs, cron: cron, oracle: oracle, stake: stake }
  }

  get zeroStakeUsersByService() {
    let ipfs: Accountext[] = []
    let cron: Accountext[] = []
    let oracle: Accountext[] = []
    let stake: Accountext[] = []
    ipfs = this.usersByStatus.zeroStake.filter(
      (a: Accountext) => a.service === 'ipfsservice1'
    )
    cron = this.usersByStatus.zeroStake.filter(
      (a: Accountext) => a.service === 'cronservices'
    )
    oracle = this.usersByStatus.zeroStake.filter(
      (a: Accountext) => a.service === 'oracleservic'
    )
    stake = this.usersByStatus.zeroStake.filter(
      (a: Accountext) => a.service === 'stakeservice'
    )
    return { ipfs: ipfs, cron: cron, oracle: oracle, stake: stake }
  }

  get dspByService() {
    let ipfs = 0
    let cron = 0
    let oracle = 0
    let stake = 0
    for (const dsp of this.dspRanking) {
      if (dsp.services.includes('ipfsservice1')) ipfs += 1
      if (dsp.services.includes('cronservices')) cron += 1
      if (dsp.services.includes('stakeservice')) stake += 1
      if (dsp.services.includes('oracleservic')) oracle += 1
    }
    return { ipfs: ipfs, cron: cron, oracle: oracle, stake: stake }
  }

  get pkgByStatus() {
    let available: Package[] = []
    let deprecated: Package[] = []
    for (const pkg of this.packageTable) {
      if (this.isDeprecated(pkg)) deprecated.push(pkg)
      else available.push(pkg)
    }
    return { available: available, deprecated: deprecated }
  }

  get pkgByService() {
    let ipfs: Package[] = []
    let cron: Package[] = []
    let oracle: Package[] = []
    let stake: Package[] = []
    ipfs = this.packageTable.filter(
      (pkg: Package) => pkg.service === 'ipfsservice1'
    )
    cron = this.packageTable.filter(
      (pkg: Package) => pkg.service === 'cronservices'
    )
    oracle = this.packageTable.filter(
      (pkg: Package) => pkg.service === 'oracleservic'
    )
    stake = this.packageTable.filter(
      (pkg: Package) => pkg.service === 'stakeservice'
    )
    return { ipfs: ipfs, cron: cron, oracle: oracle, stake: stake }
  }

  get availablePkgByService() {
    let ipfs: Package[] = []
    let cron: Package[] = []
    let oracle: Package[] = []
    let stake: Package[] = []
    ipfs = this.pkgByStatus.available.filter(
      (pkg: Package) => pkg.service === 'ipfsservice1'
    )
    cron = this.pkgByStatus.available.filter(
      (pkg: Package) => pkg.service === 'cronservices'
    )
    oracle = this.pkgByStatus.available.filter(
      (pkg: Package) => pkg.service === 'oracleservic'
    )
    stake = this.pkgByStatus.available.filter(
      (pkg: Package) => pkg.service === 'stakeservice'
    )
    return { ipfs: ipfs, cron: cron, oracle: oracle, stake: stake }
  }

  get deprecatedPkgByService() {
    let ipfs: Package[] = []
    let cron: Package[] = []
    let oracle: Package[] = []
    let stake: Package[] = []
    ipfs = this.pkgByStatus.deprecated.filter(
      (pkg: Package) => pkg.service === 'ipfsservice1'
    )
    cron = this.pkgByStatus.deprecated.filter(
      (pkg: Package) => pkg.service === 'cronservices'
    )
    oracle = this.pkgByStatus.deprecated.filter(
      (pkg: Package) => pkg.service === 'oracleservic'
    )
    stake = this.pkgByStatus.deprecated.filter(
      (pkg: Package) => pkg.service === 'stakeservice'
    )
    return { ipfs: ipfs, cron: cron, oracle: oracle, stake: stake }
  }

  // methods
  isDeprecated(pkg: Package) {
    return !(
      pkg.api_endpoint !== '' &&
      pkg.api_endpoint !== null &&
      pkg.api_endpoint !== 'null' &&
      pkg.api_endpoint !== undefined
    )
  }

  // Lifecycle hooks
  created() {
    vxm.user.getDapphdlStakingTable()
  }
  mounted() {}
  updated() {}
  destroyed() {}
}
</script>

<style lang="scss" scoped></style>
