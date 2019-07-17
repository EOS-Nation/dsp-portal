<template>
  <ul class="nav-main-submenu">
    <li
      v-for="item in items"
      :key="item.id"
      @click="setActiveMenu(item.id)"
      class="nav-main-item"
    >
      <router-link :to="{ name: item.target }" class="nav-main-link">
        <font-awesome-icon
          :icon="item.icon"
          fixed-width
          class="nav-main-link-icon"
        />
        <span v-text="item.name" class="nav-main-link-name"></span>
      </router-link>
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { vxm } from '@/store/'

@Component({
  props: ['items']
})
export default class MenuFirstLvl extends Vue {
  setActiveMenu(id: string) {
    vxm.menu.setActiveMenu(id)
  }
}
</script>

<style scoped></style>
