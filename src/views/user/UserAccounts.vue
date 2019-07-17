<template>
  <b-row>
    <b-col>
      <router-view />
    </b-col>
  </b-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import PackagesFound from '@/components/packages/PackagesFound.vue'
import SearchFilter from '@/components/packages/SearchFilter.vue'
import { vxm } from '@/store'

@Component({
  components: {
    PackagesFound,
    SearchFilter
  }
})
export default class UserAccounts extends Vue {
  // Lifecycle hooks
  created() {}
  mounted() {}
  updated() {}
  destroyed() {}
}
</script>

<style lang="scss"></style>
