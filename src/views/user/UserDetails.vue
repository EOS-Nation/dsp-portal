<template>
  <div>
    <h2 class="text-center" v-text="$t('view.userDetails.userProfile')" />
    <b-row class="gutters-tiny">
      <b-col cols="12">
        <div
          class="block block-rounded block-bordered"
          :class="{ 'block-mode-loading': loading }"
        >
          <div
            class="block-content block-content-full text-center bg-gd-primary text-white"
          >
            <div class="mt-2">
              <font-awesome-icon icon="user" fixed-width class="fa-3x mb-2" />
              <div>
                <p class="font-size-h3 font-w700 mb-0">
                  {{ account }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </b-col>
      <b-col v-if="false" cols="12">
        <b-row class="row-deck gutters-tiny d-flex justify-content-center">
          <b-col md="6">
            <simple-tile
              title="Total DAPP"
              :value="numeral(totalDappBalance).format('0,0.0000')"
            />
          </b-col>
          <b-col md="6">
            <simple-tile
              title="Available"
              :value="numeral(dappBalance).format('0,0.0000')"
            />
          </b-col>
        </b-row>
      </b-col>
      <b-col v-if="false" cols="12">
        <b-row class="row-deck gutters-tiny d-flex justify-content-center">
          <b-col md="6" lg="4">
            <simple-tile
              title="Staked"
              :value="numeral(staked).format('0,0.0000')"
            />
          </b-col>
          <b-col md="6" lg="4">
            <simple-tile
              title="Unstaking"
              :value="numeral(unstaking).format('0,0.0000')"
            />
          </b-col>
          <b-col md="6" lg="4">
            <simple-tile
              title="Refund Required"
              :value="numeral(refundReq).format('0,0.0000')"
            />
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <b-row class="gutters-tiny row-deck">
      <b-col md="6">
        <div
          class="block block-rounded block-bordered"
          :class="{ 'block-mode-loading': loading }"
        >
          <div class="block-content">
            <h5
              class="text-center"
              v-text="$t('view.userDetails.dappResources')"
            />
            <table class="table table-borderless table-striped">
              <tbody>
                <tr>
                  <td class="font-w700">
                    {{ $t('view.userDetails.totalBalance') }}
                  </td>
                  <td>
                    {{ numeral(totalDappBalance).format('0,0.0000') }} DAPP
                  </td>
                </tr>
                <tr>
                  <td class="font-w700">
                    {{ $t('view.userDetails.available') }}
                  </td>
                  <td>{{ numeral(dappBalance).format('0,0.0000') }} DAPP</td>
                </tr>
                <tr>
                  <td class="font-w700">{{ $t('view.userDetails.staked') }}</td>
                  <td>{{ numeral(staked).format('0,0.0000') }} DAPP</td>
                </tr>
                <tr>
                  <td class="font-w700">
                    {{ $t('view.userDetails.unstaking') }}
                  </td>
                  <td>{{ numeral(unstaking).format('0,0.0000') }} DAPP</td>
                </tr>
                <tr>
                  <td class="font-w700">
                    {{ $t('view.userDetails.refundReq') }}
                  </td>
                  <td>{{ numeral(refundReq).format('0,0.0000') }} DAPP</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </b-col>
      <b-col md="6">
        <div
          class="block block-rounded block-bordered"
          :class="{ 'block-mode-loading': loading }"
        >
          <div class="block-content">
            <h5
              class="text-center"
              v-text="$t('view.userDetails.dapphdlResources')"
            />
            <table class="table table-borderless table-striped">
              <tbody>
                <tr>
                  <td class="font-w700">
                    {{ $t('view.userDetails.available') }}
                  </td>
                  <td>
                    {{ numeral(dapphdlData.balance).format('0,0.0000') }}
                    DAPPHDL
                  </td>
                </tr>
                <tr>
                  <td class="font-w700">
                    {{ $t('view.userDetails.allocation') }}
                  </td>
                  <td>
                    {{ numeral(dapphdlData.allocation).format('0,0.0000') }}
                    DAPPHDL
                  </td>
                </tr>
                <tr>
                  <td class="font-w700">{{ $t('view.userDetails.staked') }}</td>
                  <td>
                    {{ numeral(dapphdlData.staked).format('0,0.0000') }}
                    DAPPHDL
                  </td>
                </tr>
                <tr>
                  <td class="font-w700">
                    {{ $t('view.userDetails.claimed') }}
                  </td>
                  <td v-if="dapphdlData.claimed">
                    {{ $t('view.userDetails.yes') }}
                  </td>
                  <td v-else-if="!parseFloat(dapphdlData.allocation)">
                    {{ $t('view.userDetails.noAllocation') }}
                  </td>
                  <td v-else>{{ $t('view.userDetails.no') }}</td>
                </tr>
                <tr>
                  <td class="font-w700">
                    {{ $t('view.userDetails.actions') }}
                  </td>
                  <td>
                    <span
                      v-if="!isAuthenticated"
                      v-b-tooltip.hover
                      :title="$t('view.userDetails.loginReq')"
                    >
                      <b-btn size="sm" disabled>
                        <span
                          v-if="
                            dapphdlData.claimed ||
                              !parseFloat(dapphdlData.allocation)
                          "
                          >{{ $t('view.userDetails.refresh') }}</span
                        >
                        <span v-else>{{
                          $t('view.userDetails.claimDapphdl')
                        }}</span>
                      </b-btn>
                    </span>
                    <span
                      v-else-if="wallet && account !== wallet.auth.accountName"
                      v-b-tooltip.hover
                      :title="$t('view.userDetails.loginToAccount', [account])"
                    >
                      <b-btn size="sm" disabled>
                        <span
                          v-if="
                            dapphdlData.claimed ||
                              !parseFloat(dapphdlData.allocation)
                          "
                          >{{ $t('view.userDetails.refresh') }}</span
                        >
                        <span v-else>{{
                          $t('view.userDetails.claimDapphdl')
                        }}</span>
                      </b-btn>
                    </span>
                    <b-btn v-else @click="refreshDapphdl()" size="sm">
                      <span
                        v-if="
                          dapphdlData.claimed ||
                            !parseFloat(dapphdlData.allocation)
                        "
                        >{{ $t('view.userDetails.refresh') }}</span
                      >
                      <span v-else>
                        {{ $t('view.userDetails.claimDapphdl') }}
                      </span>
                    </b-btn>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </b-col>
    </b-row>
    <b-row class="mt-4">
      <b-col>
        <div class="d-flex justify-content-between align-items-center">
          <h4 class="font-w400 mb-0 pb-0">
            <font-awesome-icon icon="box-open" fixed-width class="mr-1" />
            {{ userPkgSelection.length }}
            {{ $tc('view.userDetails.pkgSelected', userPkgSelection.length) }}
          </h4>
        </div>
        <hr class="mt-2" />
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <accounts-table
          :accounts="userPkgSelection"
          :showAccount="false"
          :showActionBtn="isUser"
        />
      </b-col>
    </b-row>
  </div>
</template>

<script lang="ts">
import { Watch, Prop, Component, Vue } from 'vue-property-decorator'
import { vxm } from '@/store'
import { accessContext } from '@/eostransit'
import AccountsTable from '@/components/accounts/AccountsTable.vue'
import SimpleTile from '@/components/common/SimpleTile.vue'
const numeral = require('numeral')

@Component({
  components: {
    AccountsTable,
    SimpleTile
  }
})
export default class UserDetails extends Vue {
  // props
  @Prop() private account!: string

  // data
  private loading: boolean = false
  private numeral = numeral
  private tableView: boolean = true

  // computed
  get wallet() {
    let w = vxm.transit.wallet
    if (w.auth) return w
    else return { auth: { accountName: '' } }
  }

  get isAuthenticated() {
    return (
      vxm.transit.walletState.authenticated &&
      !vxm.transit.walletState.authenticationError
    )
  }

  get isUser() {
    return (
      this.isAuthenticated &&
      vxm.transit.currentUser.accountName === this.account
    )
  }

  get accountTable() {
    return vxm.dappservices.accountTable
  }

  get userPkgSelection() {
    return this.accountTable.filter((pkg: any) => {
      return pkg.account === this.account
    })
  }

  get dappBalance() {
    if (this.isUser) return vxm.user.userLoginDappLiquid
    else return vxm.user.userDappLiquid
  }

  get refundReq() {
    if (this.isUser) return vxm.user.refundReqLogin
    else return vxm.user.refundReq
  }

  get unstaking() {
    if (this.isUser) return vxm.user.unstakingLogin
    else return vxm.user.unstaking
  }

  get staked() {
    if (this.isUser) return vxm.user.stakedLogin
    else return vxm.user.staked
  }

  get dapphdlData() {
    if (this.isUser) return vxm.user.userLoginDapphdlData
    else return vxm.user.userDapphdlData
  }

  get totalDappBalance() {
    return this.dappBalance + this.staked + this.unstaking + this.refundReq
  }

  // method
  refreshDapphdl() {
    vxm.alerts.setAlert({
      show: true,
      dismissible: false,
      title: 'Refreshing DAPPHDL...',
      message: 'To refresh DAPPHDL please allow this action in your wallet.',
      variant: 'warning'
    })
    this.wallet.eosApi
      .transact(
        {
          delay_sec: vxm.core.settings.txDelaySec,
          actions: [
            {
              account: 'dappairhodl1',
              name: 'refresh',
              authorization: [
                {
                  actor: this.wallet.auth.accountName,
                  permission: this.wallet.auth.permission
                }
              ],
              data: {
                owner: this.wallet.auth.accountName
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
          title: 'Successfully Refreshed!',
          message: 'DAPPHDL Resources successfully refreshed.',
          variant: 'success',
          txId: resp.transaction_id,
          dismissSecs: 6,
          dismissCountDown: 6
        })
        this.updateDetails()
      })
      .catch((error: any) => {
        vxm.alerts.setAlert({
          show: true,
          dismissible: true,
          title: 'Error while Refreshing!',
          message: 'Something went wrong: ' + error.message,
          variant: 'danger',
          dismissSecs: 8,
          dismissCountDown: 8
        })
        this.updateDetails()
      })
  }

  setDelay(i: number) {
    setTimeout(() => {
      vxm.user.getDappLiquid({
        account: this.wallet.auth.accountName,
        currentUser: true
      })
      vxm.user.getDapphdlData({
        account: this.wallet.auth.accountName,
        currentUser: true
      })
      vxm.user.getRefundTable({
        account: this.wallet.auth.accountName,
        currentUser: true
      })
      vxm.user.getStakingTable({
        account: this.wallet.auth.accountName,
        currentUser: true
      })
      vxm.dappservices.getAccountTable()
      vxm.user.getDappLiquid({ account: this.account, currentUser: false })
      vxm.user.getStakingTable({
        account: this.account,
        currentUser: false
      })
      vxm.user.getRefundTable({ account: this.account, currentUser: false })
      vxm.user.getDapphdlData({ account: this.account, currentUser: false })
    }, 1000 * i)
  }

  async updateDetails() {
    if (this.isUser) {
      for (let i = 1; i <= 2; i++) {
        this.setDelay(i)
      }
    } else this.setDelay(1 / 2)
  }

  @Watch('account')
  async onAccountChange(val: any, oldVal: any) {
    this.loading = true
    await this.updateDetails()
    this.loading = false
  }

  // @Watch('accountTable')
  // async onAccountTableChange(val: any, oldVal: any) {
  //  await this.updateDetails()
  // }

  // Lifecycle hooks
  async created() {
    this.loading = true
    await this.updateDetails()
    this.loading = false
  }
  mounted() {}
  updated() {}
  beforeDestroy() {}
  destroyed() {}
}
</script>

<style lang="scss" scoped>
.cursor {
  cursor: pointer;
}
</style>
