<template>
  <div>
    <b-alert
      v-if="!state.dismissible"
      :show="state.show"
      fade
      dismissible
      @dismissed="dismissAlert()"
      :variant="state.variant"
      class="col-11 col-sm-5 col-xl-4"
      style="display: inline-block; margin: 0px auto; position: fixed; z-index: 1033; top: 20px; right: 20px;"
    >
      <h4 v-text="state.title" class="alert-heading"></h4>
      <p v-text="state.message"></p>
      <b-progress :variant="state.variant" :value="100" :max="100" animated />
    </b-alert>
    <b-alert
      v-else
      :show="state.dismissCountDown"
      fade
      dismissible
      @dismissed="dismissAlert()"
      @dismiss-count-down="countDownChanged"
      :variant="state.variant"
      class="col-11 col-sm-5 col-xl-4"
      style="display: inline-block; margin: 0px auto; position: fixed; z-index: 1033; top: 20px; right: 20px;"
    >
      <h4 v-text="state.title" class="alert-heading"></h4>
      <p>
        {{ state.message }}
        <a
          v-if="state.txId"
          :href="'https://bloks.io/transaction/' + state.txId"
          target="_blank"
        >
          - View Tx on Bloks.io</a
        >
      </p>
      <b-progress
        :variant="state.variant"
        :max="state.dismissSecs"
        :value="state.dismissCountDown"
        height="4px"
      ></b-progress>
    </b-alert>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { vxm } from '@/store/'

@Component({
  props: {},
  components: {}
})
export default class Alerts extends Vue {
  // computed
  get state() {
    return vxm.alerts.alertState
  }

  // method
  dismissAlert() {
    vxm.alerts.setAlert(null)
  }
  countDownChanged(dismissCountDown: number) {
    vxm.alerts.countDownAlert(dismissCountDown)
  }
  // Lifecycle hooks
  created() {}
  mounted() {}
  updated() {}
  destroyed() {}
}
</script>

<style lang="scss" scoped>
.alert-dismissible {
  padding: 0.75rem 1.25rem;
}
</style>
