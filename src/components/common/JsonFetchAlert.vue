<template>
  <div>
    <h5
      v-if="pkgJson.error || dspJson.error"
      class="text-center text-muted mb-2"
    >
      {{ $t('component.jsonFetchAlert.unableToFetch') }}
    </h5>
    <b-alert
      variant="info"
      :show="pkgJson.error && pkgJson.errorMsg !== ''"
      class="text-center font-w700"
    >
      <font-awesome-icon icon="exclamation-triangle" fixed-width class="mr-1" />
      Package-JSON
      <font-awesome-icon icon="exclamation-triangle" fixed-width class="ml-1" />
      <br />
      {{ pkgJson.errorMsg }}
    </b-alert>
    <b-alert
      variant="info"
      :show="dspJson.error && dspJson.errorMsg !== ''"
      class="text-center font-w700"
    >
      <font-awesome-icon icon="exclamation-triangle" fixed-width class="mr-1" />
      DSP-JSON
      <font-awesome-icon icon="exclamation-triangle" fixed-width class="ml-1" />
      <br />
      {{ dspJson.errorMsg }}
    </b-alert>
  </div>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'vue-property-decorator'

@Component({
  components: {}
})
export default class JsonFetchAlert extends Vue {
  // data
  @Prop() private pkgJson!: any
  @Prop() private dspJson!: any

  // Lifecycle hooks
  created() {}
  mounted() {}
  updated() {}
  destroyed() {}
}
</script>

<style lang="scss" scoped></style>
