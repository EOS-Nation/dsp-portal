<template>
  <b-row>
    <b-col cols="12">
      <h2 class="text-center" v-text="$t('view.vRamTokens.vRamTokens')" />
    </b-col>
    <b-col sm="6" lg="3" class="mb-3">
      <label for="contract">{{ $t('view.vRamTokens.tokenContract') }}</label>
      <b-form-input
        id="contract"
        v-model="contract"
        placeholder="eg. eosndappdapp"
      ></b-form-input>
    </b-col>
    <b-col sm="6" lg="3" class="mb-3">
      <label for="account">{{ $t('view.vRamTokens.account') }}</label>
      <b-form-input
        id="account"
        v-model="scope"
        placeholder="eg. eosndappdapp"
      ></b-form-input>
    </b-col>
    <b-col sm="6" lg="3" class="mb-3">
      <label for="table">{{ $t('view.vRamTokens.table') }}</label>
      <b-form-input
        id="table"
        v-model="table"
        placeholder="eg. accounts"
      ></b-form-input>
    </b-col>
    <b-col sm="6" lg="3" class="mb-3">
      <label for="symbol">{{ $t('view.vRamTokens.tokenSymbol') }}</label>
      <b-form-input
        id="symbol"
        v-model="symbol"
        placeholder="eg. VDAPP"
      ></b-form-input>
    </b-col>
    <b-col cols="12" class="text-center mt-2">
      <b-btn
        @click="getVtokenBalance()"
        variant="primary"
        :disabled="loading || !scope || !contract || !table || !symbol"
      >
        <font-awesome-icon
          v-if="loading"
          icon="spinner"
          spin
          fixed-width
          class="mr-2"
        />
        <font-awesome-icon v-else icon="coins" fixed-width class="mr-2" />
        <span>{{ $t('view.vRamTokens.getBalance') }}</span>
      </b-btn>
    </b-col>
    <b-col v-if="balance" cols="12" class="text-center mt-5">
      <h4>{{ $t('view.vRamTokens.balance') }}</h4>
      <h3>{{ balance }}</h3>
    </b-col>
  </b-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { DappClient } from 'dapp-client'
import { vxm } from '@/store'

const endpoint = 'https://dsp.eosn.io'
const client = new DappClient(endpoint, {})

@Component
export default class UserTokens extends Vue {
  private loading = false
  private balance: any = ''
  private contract: string = ''
  private scope: string = ''
  private table: string = 'accounts'
  private symbol: string = ''

  // methods
  getVtokenBalance() {
    this.loading = true
    this.balance = this.$t('view.vRamTokens.loading')
    client
      .dsp_ipfs_get_table_row<{ balance: string }>(
        this.contract,
        this.scope,
        this.table,
        this.symbol
      )
      .then((resp: any) => {
        this.balance = resp.row.balance
        this.loading = false
      })
      .catch((error: any) => {
        this.balance = this.$t('view.vRamTokens.noTokensFound')
        this.loading = false
      })
  }
  // Lifecycle hooks
  created() {}
  mounted() {}
  updated() {}
  destroyed() {}
}
</script>

<style lang="scss"></style>
