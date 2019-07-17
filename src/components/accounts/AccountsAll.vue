<template>
  <div>
    <h2 class="text-center" v-text="$t('view.users.allUsers')" />
    <accounts-table :accounts="accounts" :showAccount="true" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { vxm } from '@/store/'
import AccountsTable from '@/components/accounts/AccountsTable.vue'
const numeral = require('numeral')

@Component({
  components: {
    AccountsTable
  }
})
export default class AccountsAll extends Vue {
  private numeral = numeral

  get accounts() {
    return vxm.dappservices.accountTable
  }

  // Lifecycle hooks
  async mounted() {
    // await vxm.dappservices.getAccountTable()
  }
  created() {}
  updated() {}
  destroyed() {}
}
</script>

<style lang="scss" scoped></style>
