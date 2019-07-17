<template>
  <b-row>
    <b-col>
      <h2 class="text-center">Settings</h2>
      <div class="block block-rounded block-bordered">
        <div class="block-content">
          <h2 class="content-heading">Authentication</h2>
          <b-row class="push">
            <b-col lg="4">
              <p class="text-muted">
                Change the authentication and transaction behaviour to your
                needs.
              </p>
            </b-col>
            <b-col lg="8" xl="5">
              <div class="form-group">
                <b-form-checkbox
                  v-model="autoLogin"
                  class="mb-3"
                  name="settings-autologin"
                  switch
                >
                  Auto Login
                </b-form-checkbox>
                <b-form-checkbox
                  v-model="onlyErrorAlerts"
                  class="mb-3"
                  name="settings-notifications"
                  switch
                >
                  Show Error Notifications only
                </b-form-checkbox>
                <b-form-checkbox
                  v-model="txDelay"
                  class="mb-3"
                  name="settings-txdelay"
                  switch
                >
                  TX Delay
                </b-form-checkbox>
                <b-input-group v-if="txDelay" class="ml-4" append="Seconds">
                  <b-form-input
                    type="number"
                    v-model="txDelaySec"
                    style="max-width: 200px"
                  ></b-form-input>
                </b-input-group>
              </div>
            </b-col>
          </b-row>
        </div>
        <div class="block-content">
          <h2 class="content-heading">Portal</h2>
          <b-row class="push">
            <b-col lg="4">
              <p class="text-muted">
                Change the authentication and transaction behaviour to your
                needs.
              </p>
            </b-col>
            <b-col lg="8" xl="5">
              <div class="form-group">
                <b-form-checkbox
                  class="mb-3"
                  name="settings-autologin"
                  switch
                  disabled
                >
                  Dark Mode
                  <span class="text-muted font-size-sm"> (coming soon)</span>
                </b-form-checkbox>
                <b-form-checkbox
                  v-model="showLangSelect"
                  class="mb-3"
                  name="settings-txdelay"
                  switch
                >
                  Show Language Switcher
                </b-form-checkbox>
              </div>
            </b-col>
          </b-row>
        </div>
      </div>
    </b-col>
  </b-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { vxm } from '@/store'

@Component
export default class UserSettings extends Vue {
  // computed
  get autoLogin() {
    return vxm.core.settings.autoLogin
  }
  set autoLogin(value) {
    vxm.core.setSingleSetting({ key: 'autoLogin', value: value })
  }

  get onlyErrorAlerts() {
    return vxm.core.settings.onlyErrorAlerts
  }
  set onlyErrorAlerts(value) {
    vxm.core.setSingleSetting({ key: 'onlyErrorAlerts', value: value })
    vxm.alerts.setAlert(null)
  }

  get txDelay() {
    return vxm.core.settings.txDelay
  }
  set txDelay(value) {
    vxm.core.setSingleSetting({ key: 'txDelay', value: value })
    if (!value) this.txDelaySec = 0
  }

  get txDelaySec() {
    return vxm.core.settings.txDelaySec
  }
  set txDelaySec(value) {
    vxm.core.setSingleSetting({ key: 'txDelaySec', value: value })
  }

  get showLangSelect() {
    return vxm.core.settings.showLangSelect
  }
  set showLangSelect(value) {
    vxm.core.setSingleSetting({ key: 'showLangSelect', value: value })
  }
  // Lifecycle hooks
  created() {}
  mounted() {}
  updated() {}
  destroyed() {}
}
</script>

<style lang="scss"></style>
