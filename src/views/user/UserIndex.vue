<template>
  <!-- Main Container -->
  <main id="main-container">
    <main-nav :menu="userMenu" />
    <!-- Page Content -->
    <div class="content content-full">
      <router-view />
    </div>
    <!-- END Page Content -->
  </main>
  <!-- END Main Container -->
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import MainNav from '@/components/layout/mainNav/index.vue'

@Component({
  components: {
    MainNav
  }
})
export default class UserIndex extends Vue {
  get userMenu() {
    return [
      {
        id: '1',
        category: 'User',
        items: [
          {
            id: '1.1',
            name: this.$t('layout.mainMenu.packages'),
            icon: 'box-open',
            target: 'UserPackages'
          },
          {
            id: '1.2',
            name: this.$t('layout.mainMenu.providers'),
            icon: 'user-tie',
            target: 'Providers'
          },
          {
            id: '1.3',
            name: this.$t('layout.mainMenu.users'),
            icon: 'users',
            target: 'UserAccounts'
          },
          {
            id: '1.4',
            name: this.$t('layout.mainMenu.vTokens'),
            icon: 'coins',
            target: 'Tokens'
          },
          {
            id: '1.5',
            name: 'Statistics',
            icon: 'list-ol',
            target: 'Statistics'
          },
          {
            id: '1.6',
            name: this.$t('layout.mainMenu.faq'),
            icon: 'question-circle',
            target: 'faq'
          }
        ]
      }
    ]
  }
}
</script>
