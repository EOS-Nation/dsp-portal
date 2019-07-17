<template>
  <div class="bg-white">
    <div class="content">
      <!-- Toggle Main Navigation (mobile only) -->
      <div
        class="d-md-none push d-flex justify-content-between align-items-center"
      >
        <button
          type="button"
          @click="hideMobileNav = !hideMobileNav"
          class="btn btn-primary"
        >
          <font-awesome-icon icon="bars" class="mr-1" /> Menu
        </button>
        <template v-if="['UserPackages'].includes(this.$route.name)">
          <button
            v-if="!showFilter"
            type="button"
            @click="showFilter = false"
            class="btn btn-light"
          >
            Filter <font-awesome-icon icon="filter" class="ml-1" />
          </button>
          <button
            v-else
            type="button"
            @click="showFilter = true"
            class="btn btn-danger"
          >
            Filter <font-awesome-icon icon="times-circle" class="ml-1" />
          </button>
        </template>
      </div>
      <!-- END Toggle Main Navigation -->

      <!-- Main Navigation -->
      <div
        id="main-navigation"
        class="d-md-block push"
        v-if="!isMobile || (hideMobileNav && isMobile)"
      >
        <first-level :items="menu" />
      </div>
      <!-- END Main Navigation -->
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import firstLevel from './firstLevel.vue'
import { vxm } from '@/store'

@Component({
  props: ['menu'],
  components: {
    firstLevel
  }
})
export default class MainNav extends Vue {
  get hideMobileNav() {
    return vxm.menu.hideMobileNav
  }
  set hideMobileNav(value) {
    vxm.menu.setMobileNav(value)
  }

  get isMobile() {
    return vxm.core.isMobile
  }

  get showFilter() {
    return vxm.packages.showFilter
  }

  set showFilter(value) {
    vxm.packages.setShowFilter(value)
  }
}
</script>

<style scoped></style>
