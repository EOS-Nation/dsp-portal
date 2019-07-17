<template>
  <b-modal
    id="modal-ledger"
    title="Ledger Login"
    centered
    hide-footer
    hide-header
    @hidden="resetModal"
    @ok="handleOk()"
  >
    <template slot="default" slot-scope="{ ok, cancel }">
      <b-container>
        <b-row>
          <b-col class="text-center">
            <img
              width="110px"
              src="@/assets/media/logos/ledger_big.png"
              alt="Ledger Logo"
            />
            <hr />
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <h3 class="text-center">
              <span class="text-capitalize">Choose Account</span>
            </h3>
            <template v-for="key in ledgerAccounts">
              <b-btn
                variant="primary"
                v-for="account in key.accounts"
                :key="account.account"
                @click="loginAccount(account.account, account.authorization)"
                class="btn-block mr-1"
              >
                <span class="font-w700">{{ account.account }}</span
                >@{{ account.authorization }}
              </b-btn>
            </template>
            <hr />
          </b-col>
        </b-row>
        <b-row>
          <b-col class="d-flex justify-content-center">
            <b-btn
              @click="cancel()"
              variant="secondary"
              size="sm"
              class="text-capitalize"
              >Cancel</b-btn
            >
          </b-col>
        </b-row>
      </b-container>
    </template>
  </b-modal>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'vue-property-decorator'
import { vxm } from '@/store/'
const numeral = require('numeral')

@Component
export default class LedgerAccounts extends Vue {
  private accountLogin = false
  // computed
  get wallet() {
    return vxm.transit.wallet
  }

  get ledgerAccounts() {
    return vxm.modals.ledgerAccounts
  }

  async loginAccount(account: string, auth: string) {
    this.accountLogin = true
    this.$bvModal.hide('modal-ledger')
    await this.wallet.login(account, auth)
    await vxm.user.getDappLiquid({ account: account, currentUser: true })
    await vxm.user.getDapphdlData({ account: account, currentUser: true })
    await vxm.user.getRefundTable({ account: account, currentUser: true })
    await vxm.user.getStakingTable({ account: account, currentUser: true })
  }

  resetModal() {
    vxm.modals.setLedgerModal({})
    if (!this.accountLogin) {
      vxm.alerts.setAlert({
        show: true,
        dismissible: true,
        title: 'Canceled by User!',
        message:
          'Account selection canceled by user. Login again to start over.',
        variant: 'danger',
        dismissSecs: 6,
        dismissCountDown: 6
      })
    }
    this.accountLogin = false
  }

  handleOk() {}

  // Lifecycle hooks
  created() {}
  mounted() {}
  updated() {}
  destroyed() {}
}
</script>

<style lang="scss" scoped></style>
