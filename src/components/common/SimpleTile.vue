<template>
  <div class="block block-rounded bg-primary-light text-center text-white">
    <div
      class="block-content block-content-full d-flex justify-content-center align-items-center"
    >
      <div>
        <div class="font-size-h1 font-w300">{{ value }}</div>
        <div class="font-w600 mt-2 text-uppercase">{{ title }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'vue-property-decorator'

@Component({
  components: {}
})
export default class SimpleTile extends Vue {
  // data
  @Prop() private title!: string
  @Prop() private value!: string

  // Lifecycle hooks
  created() {}
  mounted() {}
  updated() {}
  destroyed() {}
}
</script>

<style lang="scss" scoped></style>
