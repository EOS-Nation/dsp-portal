<template>
  <router-link
    tag="span"
    :to="{
      name: 'PkgDetails',
      params: { id: pkgId }
    }"
    class="cursor"
  >
    <span class="badge bg-orange text-uppercase font-w700 py-2 px-2">
      <font-awesome-icon icon="box-open" class="mr-1" fixed-width />
      {{ package }}
    </span>
  </router-link>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'vue-property-decorator'

@Component
export default class PackageButton extends Vue {
  @Prop() package!: string
  @Prop() pkgId!: number
}
</script>

<style scoped></style>
