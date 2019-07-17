<template>
  <b-modal
    id="modal-staking"
    title="DAPP Network"
    centered
    hide-footer
    hide-header
    @hidden="resetModal"
    @ok="handleOk(amount)"
  >
    <template slot="default" slot-scope="{ ok, cancel }">
      <b-container>
        <b-row>
          <b-col>
            <h3 class="text-center">
              <span class="text-capitalize">{{ action }} </span>
              <span v-if="action === 'stake'">to</span>
              <span v-else>from</span>
            </h3>
            <hr />
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12" class="text-center">
            <img
              class="img-avatar img-avatar-thumb img-avatar-rounded mb-4 bg-white"
              :src="getNameLogo.pkgLogoUrl"
              alt="Logo"
            />
          </b-col>
          <b-col class="text-center">
            <span class="font-size-h4 font-w700">{{ getNameLogo.name }}</span>
            <p class="text-muted">
              Provider
            </p>
          </b-col>
          <b-col class="text-center">
            <span class="font-size-h4 font-w700">{{
              prettyServiceString
            }}</span>
            <p class="text-muted">
              Service
            </p>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <div
              v-if="action === 'stake'"
              class="d-flex justify-content-between"
            >
              <span
                @click="amount = format(minStakeQuantity)"
                class="font-size-sm cursor"
                :class="{
                  'text-danger':
                    parseFloat(numeral(amount).format('0')) <
                    parseFloat(numeral(minStakeQuantity).format('0')),
                  'text-muted ':
                    parseFloat(numeral(amount).format('0')) >=
                      parseFloat(numeral(minStakeQuantity).format('0')) ||
                    amount === null
                }"
                >Min Stake: {{ minStakeQuantity }}</span
              >
              <span
                @click="amount = format(userDappLiquid)"
                class="font-size-sm text-muted cursor"
                >Available: {{ userDappLiquid }}</span
              >
            </div>
            <div v-else class="d-flex justify-content-between">
              <span
                @click="amount = format(minStakeQuantity)"
                class="font-size-sm cursor"
                :class="{
                  'text-danger':
                    parseFloat(numeral(amount).format('0')) <
                    parseFloat(numeral(minStakeQuantity).format('0')),
                  'text-muted ':
                    parseFloat(numeral(amount).format('0')) >=
                      parseFloat(numeral(minStakeQuantity).format('0')) ||
                    amount === null
                }"
                >Min Stake: {{ minStakeQuantity }}</span
              >
              <span
                @click="amount = format(userStakedBalance)"
                class="font-size-sm text-muted cursor"
                >Staked: {{ userStakedBalance }} {{ asset }}</span
              >
            </div>
            <b-input-group>
              <b-form-input
                v-model="amount"
                type="text"
                :formatter="format"
                placeholder="Quantity"
                lazy-formatter
              />
              <b-input-group-append>
                <b-btn
                  @click="asset = 'DAPP'"
                  :variant="
                    asset === 'DAPP' ? 'secondary' : 'outline-secondary'
                  "
                >
                  DAPP
                </b-btn>
                <b-btn
                  @click="asset = 'DAPPHDL'"
                  :variant="
                    asset === 'DAPPHDL' ? 'secondary' : 'outline-secondary'
                  "
                >
                  DAPPHDL
                </b-btn>
              </b-input-group-append>
            </b-input-group>
            <p
              v-if="
                stakingData.pkg.package_period !==
                  stakingData.pkg.min_unstake_period
              "
              class="text-center font-size-sm text-danger mt-2 mb-0"
            >
              <b>Please Notice: Unstake Period</b><br />
              Once you activate the service by staking the 'Min Stake Quantity',
              the 'Unstake Period' will change to the higher timestamp of either
              'Package Period' or 'Unstake Period'.
            </p>
          </b-col>
        </b-row>
        <hr />
        <b-row>
          <b-col class="d-flex justify-content-between">
            <b-btn @click="cancel()" variant="secondary" class="text-capitalize"
              >Cancel</b-btn
            >
            <b-btn
              @click="ok()"
              variant="success"
              class="text-capitalize"
              v-text="action"
            ></b-btn>
          </b-col>
        </b-row>
      </b-container>
    </template>
  </b-modal>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'vue-property-decorator'
import { vxm } from '@/store/'
import * as helper from '@/assets/_js/helpers'
import { accessContext } from '@/eostransit'
const numeral = require('numeral')

@Component
export default class Staking extends Vue {
  private amount: string | null = null
  private asset: 'DAPP' | 'DAPPHDL' = 'DAPP'
  private numeral = numeral

  // computed
  get wallet() {
    return vxm.transit.wallet
  }

  get stakingData() {
    return vxm.modals.modalStaking
  }

  get action() {
    if (this.stakingData) return this.stakingData.action
    else return ''
  }

  get getNameLogo() {
    if (this.stakingData) {
      return helper.nameLogo(
        this.stakingData.pkg.provider,
        this.stakingData.detailedPkg.pkgJson,
        this.stakingData.detailedPkg.dspJson
      )
    } else
      return { name: '', pkgLogoUrl: require('@/assets/media/logos/eos.png') }
  }

  get prettyServiceString() {
    if (this.stakingData)
      return helper.prettyServiceString(this.stakingData.pkg.service)
    else return ''
  }

  get minStakeQuantity() {
    if (this.stakingData)
      return numeral(this.stakingData.pkg.min_stake_quantity).format('0,0.0000')
    else return ''
  }

  get userDappLiquid() {
    if (this.asset === 'DAPPHDL')
      return numeral(vxm.user.userLoginDapphdlData.balance).format('0,0.0000')
    else return numeral(vxm.user.userLoginDappLiquid).format('0,0.0000')
  }

  get userStakedBalance() {
    let staked = vxm.user.userLoginStakingTable.find(
      (s: any) =>
        s.provider === this.stakingData.pkg.provider &&
        s.service === this.stakingData.pkg.service
    )
    let stakedHdl = vxm.user.dapphdlStakingTable.find(
      (s: any) =>
        s.provider === this.stakingData.pkg.provider &&
        s.service === this.stakingData.pkg.service &&
        s.account === this.wallet.auth.accountName
    )
    if (this.asset === 'DAPPHDL') {
      if (stakedHdl) return numeral(stakedHdl.balance).format('0,0.0000')
      else return '0.0000'
    } else {
      if (staked) return numeral(staked.balance).format('0,0.0000')
      else return '0.0000'
    }
  }

  // method
  format(value: any, event: any) {
    return numeral(value).format('0,0.0000')
  }

  resetModal() {
    this.amount = null
  }

  handleOk(amount: string) {
    if (this.stakingData && this.stakingData.action === 'stake') {
      this.stake(amount)
    } else {
      this.unstake(amount)
    }
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
    }, 1000 * i)
  }

  updateUserLoginData() {
    for (let i = 1; i <= 5; i++) {
      this.setDelay(i)
    }
  }

  stake(amount: string) {
    vxm.alerts.setAlert({
      show: true,
      dismissible: false,
      title: 'Staking...',
      message: 'To stake please allow this action in your wallet.',
      variant: 'warning'
    })
    let data: any = {
      from: this.wallet.auth.accountName,
      provider: this.stakingData.pkg.provider,
      service: this.stakingData.pkg.service,
      quantity: numeral(amount).format('0.0000') + ' ' + this.asset
    }
    let contract = 'dappservices'
    if (this.asset === 'DAPPHDL') {
      contract = 'dappairhodl1'
      data = {
        owner: this.wallet.auth.accountName,
        provider: this.stakingData.pkg.provider,
        service: this.stakingData.pkg.service,
        quantity: numeral(amount).format('0.0000') + ' ' + this.asset
      }
    }
    if (this.stakingData)
      this.wallet.eosApi
        .transact(
          {
            delay_sec: vxm.core.settings.txDelaySec,
            actions: [
              {
                account: contract,
                name: 'stake',
                authorization: [
                  {
                    actor: this.wallet.auth.accountName,
                    permission: this.wallet.auth.permission
                  }
                ],
                data: data
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
          this.updateUserLoginData()
          vxm.alerts.setAlert({
            show: true,
            dismissible: true,
            title: 'Successfully Staked!',
            message: amount + ' ' + this.asset + ' Tokens successfully staked.',
            variant: 'success',
            txId: resp.transaction_id,
            dismissSecs: 6,
            dismissCountDown: 6
          })
        })
        .catch((error: any) => {
          this.updateUserLoginData()
          vxm.alerts.setAlert({
            show: true,
            dismissible: true,
            title: 'Error while Staking!',
            message: 'Something went wrong: ' + error.message,
            variant: 'danger',
            dismissSecs: 8,
            dismissCountDown: 8
          })
        })
  }

  unstake(amount: string) {
    vxm.alerts.setAlert({
      show: true,
      dismissible: false,
      title: 'Unstaking...',
      message: 'To unstake please allow this action in your wallet.',
      variant: 'warning'
    })
    let data: any = {
      to: this.wallet.auth.accountName,
      provider: this.stakingData.pkg.provider,
      service: this.stakingData.pkg.service,
      quantity: numeral(amount).format('0.0000') + ' ' + this.asset
    }
    let contract = 'dappservices'
    if (this.asset === 'DAPPHDL') {
      contract = 'dappairhodl1'
      data = {
        owner: this.wallet.auth.accountName,
        provider: this.stakingData.pkg.provider,
        service: this.stakingData.pkg.service,
        quantity: numeral(amount).format('0.0000') + ' ' + this.asset
      }
    }
    if (this.stakingData)
      this.wallet.eosApi
        .transact(
          {
            delay_sec: vxm.core.settings.txDelaySec,
            actions: [
              {
                account: contract,
                name: 'unstake',
                authorization: [
                  {
                    actor: this.wallet.auth.accountName,
                    permission: this.wallet.auth.permission
                  }
                ],
                data: data
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
          this.updateUserLoginData()
          vxm.alerts.setAlert({
            show: true,
            dismissible: true,
            title: 'Successfully Unstaked!',
            message:
              amount + ' ' + this.asset + ' Tokens successfully unstaked.',
            variant: 'success',
            txId: resp.transaction_id,
            dismissSecs: 6,
            dismissCountDown: 6
          })
        })
        .catch((error: any) => {
          this.updateUserLoginData()
          vxm.alerts.setAlert({
            show: true,
            dismissible: true,
            title: 'Error while Unstaking!',
            message: 'Something went wrong: ' + error.message,
            variant: 'danger',
            dismissSecs: 8,
            dismissCountDown: 8
          })
        })
  }

  // Lifecycle hooks
  created() {}
  mounted() {}
  updated() {}
  destroyed() {}
}
</script>

<style lang="scss" scoped></style>
