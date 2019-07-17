<template>
  <b-row>
    <search-filter />
    <packages-found />
  </b-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import PackagesFound from '@/components/packages/PackagesFound.vue'
import SearchFilter from '@/components/packages/SearchFilter.vue'

@Component({
  components: {
    PackagesFound,
    SearchFilter
  }
})
export default class UserPackages extends Vue {
  // Lifecycle hooks
  created() {}
  mounted() {}
  updated() {}
  destroyed() {}
}
</script>

<style lang="scss"></style>
