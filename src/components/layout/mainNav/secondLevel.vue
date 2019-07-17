<template>
  <ul class="nav-main-submenu">
    <li
      v-for="item in items"
      :key="item.id"
      @click="setActiveMenu(item.id)"
      class="nav-main-item"
      :class="{ open: activeItemId === item.id }"
    >
      <router-link
        :to="{ name: item.target }"
        class="nav-main-link"
        :class="{ 'nav-main-link-submenu': item.items }"
      >
        <font-awesome-icon
          :icon="item.icon"
          fixed-width
          class="nav-main-link-icon"
        />
        <span v-text="item.name" class="nav-main-link-name"></span>
      </router-link>
      <template v-if="item.items">
        <third-level :items="item.items" />
      </template>
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { vxm } from '@/store/'
import thirdLevel from './thirdLevel.vue'

@Component({
  props: ['items'],
  components: {
    thirdLevel
  }
})
export default class MenuFirstLvl extends Vue {
  get activeMenuId() {
    return vxm.menu.activeMenuId
  }
  get activeItemId() {
    return (
      this.activeMenuId[0] +
      '.' +
      this.activeMenuId[1] +
      '.' +
      this.activeMenuId[2]
    )
  }

  setActiveMenu(id: string) {
    vxm.menu.setActiveMenu(id)
  }
}
</script>

<style scoped></style>
