<template>
  <router-link
    :to="{
      name: 'PkgDetails',
      params: { id: pkgId }
    }"
  >
    <span class="badge bg-orange text-uppercase font-w700 py-2 px-3">
      <font-awesome-icon :icon="getServiceIcon" class="mr-1" fixed-width />
      {{ prettyServiceString }}
    </span>
  </router-link>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'vue-property-decorator'
import * as helper from '@/assets/_js/helpers'

@Component
export default class ServiceButton extends Vue {
  @Prop() service!: string
  @Prop() pkgId!: number

  // getter
  get getServiceIcon() {
    if (this.service === 'ipfsservice1') return 'memory'
    else if (this.service === 'stakeservice') return 'chart-line'
    else if (this.service === 'oracleservic') return 'database'
    else if (this.service === 'cronservices') return 'clock'
    else return 'asterisk'
  }

  get prettyServiceString() {
    return helper.prettyServiceString(this.service)
  }
}
</script>

<style scoped></style>
