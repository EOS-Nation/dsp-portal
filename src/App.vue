<template>
  <!-- Page Container -->
  <div id="page-container" class="page-header-dark">
    <!-- Header -->
    <main-header />
    <!-- END Header -->

    <router-view />

    <!-- Footer -->
    <main-footer />
    <!-- END Footer -->

    <!-- Modals -->
    <staking />
    <ledger-accounts />
    <!-- END Modals -->

    <!-- Alerts -->
    <alerts v-if="onlyErrorAlerts()" />
    <!-- END Alerts -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import MainHeader from '@/components/layout/MainHeader.vue'
import MainFooter from '@/components/layout/MainFooter.vue'
import Alerts from '@/components/layout/Alerts.vue'
import { vxm } from '@/store/'
import Staking from '@/components/modal/Staking.vue'
import LedgerAccounts from '@/components/modal/LedgerAccounts.vue'
import * as helper from '@/assets/_js/helpers'

@Component({
  components: {
    MainHeader,
    MainFooter,
    Alerts,
    Staking,
    LedgerAccounts
  }
})
export default class App extends Vue {
  onlyErrorAlerts() {
    if (vxm.core.settings.onlyErrorAlerts) {
      if (vxm.alerts.alertState.variant === 'danger') return true
      else return false
    } else return true
  }
  created() {
    vxm.core.setIsMobile(helper.detectMobile())
    let settings = localStorage.getItem('settings')
    if (settings) {
      vxm.core.setSettings(settings)
    }
    const jsonDbUpdate = localStorage.getItem('jsonDbUpdate')
    let pkgJsonDb = localStorage.getItem('pkgJsonDb')
    let dspJsonDb = localStorage.getItem('dspJsonDb')
    if (
      jsonDbUpdate &&
      pkgJsonDb &&
      dspJsonDb &&
      parseFloat(jsonDbUpdate) > helper.currentTime() - 3600000
    ) {
      vxm.jsondb.setJsonDb({
        pkgJsonDb: JSON.parse(pkgJsonDb),
        dspJsonDb: JSON.parse(dspJsonDb)
      })
    } else {
      localStorage.removeItem('jsonDbUpdate')
      localStorage.removeItem('pkgJsonDb')
      localStorage.removeItem('dspJsonDb')
    }
    vxm.core.setLanguage(null)
    vxm.dappservices.getAllPkgs()
  }
}
</script>
