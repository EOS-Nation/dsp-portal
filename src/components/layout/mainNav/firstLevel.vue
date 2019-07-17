<template>
  <ul class="nav-main nav-main-horizontal nav-main-hover">
    <template v-for="firstLevel in items">
      <li
        v-for="item in firstLevel.items"
        :key="item.id"
        @click="setActiveMenu(item.id)"
        class="nav-main-item"
        :class="{ open: activeItemId === item.id }"
      >
        <router-link
          :to="{ name: item.target }"
          class="nav-main-link"
          :class="{ 'nav-main-link-submenu': item.items }"
          :exact="item.id === '1.1'"
        >
          <font-awesome-icon
            :icon="item.icon"
            fixed-width
            class="nav-main-link-icon"
          />
          <span v-text="item.name" class="nav-main-link-name"></span>
        </router-link>
        <template v-if="item.items">
          <second-level :items="item.items" />
        </template>
      </li>
    </template>
    <li
      v-if="['UserPackages'].includes(this.$route.name)"
      class="d-none d-md-flex nav-main-item ml-md-auto"
    >
      <button
        v-if="!showFilter"
        type="button"
        @click="showFilter = !showFilter"
        class="btn btn-light"
      >
        Filter <font-awesome-icon icon="filter" class="ml-1" />
      </button>
      <button
        v-else
        type="button"
        @click="showFilter = !showFilter"
        class="btn btn-danger"
      >
        Filter <font-awesome-icon icon="times-circle" class="ml-1" />
      </button>
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { vxm } from '@/store/'
import secondLevel from './secondLevel.vue'

@Component({
  props: ['items'],
  components: {
    secondLevel
  }
})
export default class MenuFirstLvl extends Vue {
  get activeMenuId() {
    return vxm.menu.activeMenuId
  }
  get activeItemId() {
    return this.activeMenuId[0] + '.' + this.activeMenuId[1]
  }

  get showFilter() {
    return vxm.packages.showFilter
  }

  set showFilter(value) {
    vxm.packages.setShowFilter(value)
  }

  setActiveMenu(id: string) {
    vxm.menu.setActiveMenu(id)
    vxm.menu.setMobileNav(false)
  }
}
</script>

<style scoped></style>
