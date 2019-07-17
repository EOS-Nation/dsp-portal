<template>
  <header id="page-header">
    <!-- Header Content -->
    <div class="content-header">
      <!-- Left Section -->
      <div class="d-flex align-items-center">
        <!-- Logo -->
        <router-link
          :to="{ name: 'Welcome' }"
          class="link-fx font-size-lg font-w600 text-white"
        >
          <span class="text-white-75">DSP</span>
          <font-awesome-icon icon="rocket" class="mx-2" />
          <span class="text-white">Portal</span>
        </router-link>
        <!-- END Logo -->

        <!-- Search -->
        <b-form @submit="onSubmit" class="d-none d-lg-inline-block ml-4">
          <b-form-input
            size="sm"
            v-model="search"
            type="text"
            :placeholder="$t('layout.mainHeader.searchAccount')"
            class="border-0 rounded"
            style="min-width: 320px;"
          ></b-form-input>
        </b-form>
        <!-- END Search -->

        <b-btn
          @click="showSearch = true"
          variant="primary"
          class="d-lg-none ml-1"
        >
          <font-awesome-icon icon="search" fixed-width />
        </b-btn>
      </div>
      <!-- END Left Section -->

      <!-- Right Section -->
      <div class="d-flex align-items-center">
        <b-dropdown v-if="showLangSelect" variant="primary" right>
          <template slot="button-content">
            <span class="text-uppercase">{{ getLanguage }}</span>
          </template>
          <b-dd-header
            class="text-center text-muted"
            v-text="$t('layout.mainHeader.language')"
          ></b-dd-header>
          <b-dropdown-item
            @click="setLanguage('en')"
            :active="getLanguage === 'en'"
          >
            <div class="d-flex justify-content-between">
              <span class="font-weight-bolder">
                {{ $t('layout.mainHeader.english') }}
              </span>
              <font-awesome-icon icon="globe-americas" />
            </div>
          </b-dropdown-item>
          <b-dropdown-item
            @click="setLanguage('zh')"
            :active="getLanguage === 'zh'"
          >
            <div class="d-flex justify-content-between">
              <span class="font-weight-bolder">
                {{ $t('layout.mainHeader.chinese') }}
              </span>
              <font-awesome-icon icon="globe-asia" />
            </div>
          </b-dropdown-item>
        </b-dropdown>
        <!-- Transit Auth Button -->
        <transit-auth />
        <!-- END Transit Auth Button -->
      </div>
      <!-- END Right Section -->
    </div>
    <!-- END Header Content -->
    <div
      id="page-header-search"
      class="overlay-header bg-primary"
      :class="{ show: showSearch }"
    >
      <div class="content-header">
        <b-form class="w-100" @submit="onSubmit">
          <div class="input-group">
            <div @click="showSearch = false" class="input-group-prepend">
              <button type="button" class="btn btn-primary">
                <font-awesome-icon icon="times-circle" fixed-width />
              </button>
            </div>
            <input
              type="text"
              class="form-control border-0"
              placeholder="Search account ..."
              v-model="search"
              id="page-header-search-input"
              name="page-header-search-input"
            />
          </div>
        </b-form>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import TransitAuth from '@/components/TransitAuth.vue'
import { vxm } from '@/store/'

@Component({
  components: {
    TransitAuth
  }
})
export default class MainHeader extends Vue {
  private search: string = ''

  get allProviders() {
    return vxm.dappservices.getAllProviders
  }

  get isMobile() {
    return vxm.core.isMobile
  }

  get showSearch() {
    return vxm.core.showSearch
  }

  set showSearch(value) {
    vxm.core.setShowSearch(value)
  }

  get getLanguage() {
    return vxm.core.language
  }

  get showLangSelect() {
    return vxm.core.settings.showLangSelect
  }

  setLanguage(lang: string) {
    vxm.core.setLanguage(lang)
  }

  onSubmit(evt: any) {
    let searchString = this.search.toLowerCase()
    evt.preventDefault()
    if (this.allProviders.find((p: any) => p.name === searchString)) {
      this.$router.push({
        name: 'PrvDetails',
        params: { provider: searchString }
      })
    } else {
      this.$router.push({
        name: 'AccountDetails',
        params: { account: searchString }
      })
    }
    this.search = ''
    this.showSearch = false
  }
}
</script>

<style lang="scss" scoped></style>
