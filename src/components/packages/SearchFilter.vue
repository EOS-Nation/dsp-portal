<template>
  <b-col md="6" lg="5" xl="3" :class="{ 'd-none': !showFilter }">
    <div class="content p-0">
      <h4 class="font-w400 mb-0 pb-0">
        <font-awesome-icon icon="filter" fixed-width />
        {{ $t('view.packages.searchFilter') }}
      </h4>
      <hr class="mt-2" />
      <b-form-group>
        <b-row>
          <b-col cols="6">
            <b-dd
              size="sm"
              variant="secondary"
              :text="$t('view.packages.sort') + ' ' + getSortString(sortBy)"
              class="btn-block"
              no-caret
            >
              <b-dropdown-item-button @click="sortBy = 'random'">
                {{ $t('view.packages.random') }}
              </b-dropdown-item-button>
              <b-dropdown-item-button @click="sortBy = 'id'">
                Date Added
              </b-dropdown-item-button>
              <b-dropdown-item-button @click="sortBy = 'provider'">
                {{ $tc('view.packages.providers', 1) }}
              </b-dropdown-item-button>
              <b-dropdown-item-button @click="sortBy = 'service'">
                {{ $tc('view.packages.services', 1) }}
              </b-dropdown-item-button>
              <b-dropdown-item-button @click="sortBy = 'package_id'">
                {{ $tc('view.packages.packages', 1) }}
              </b-dropdown-item-button>
              <b-dropdown-item-button @click="sortBy = 'quota'">
                {{ $t('view.packages.quota') }}
              </b-dropdown-item-button>
              <b-dropdown-item-button @click="sortBy = 'min_stake_quantity'">
                {{ $t('view.packages.minStake') }}
              </b-dropdown-item-button>
            </b-dd>
          </b-col>
          <b-col cols="6">
            <b-btn
              @click="
                orderBy === 'Ascending'
                  ? (orderBy = 'Descending')
                  : (orderBy = 'Ascending')
              "
              size="sm"
              variant="secondary"
              class="btn-block"
              v-text="orderBy"
              :disabled="sortBy === 'Random'"
            ></b-btn>
          </b-col>
        </b-row>
      </b-form-group>
      <div class="push">
        <v-select
          class="form-select"
          :placeholder="$t('view.packages.searchProvider')"
          multiple
          label="name"
          v-model="selectedProvider"
          :options="allProviders"
          :reduce="name => name.name"
        />
      </div>
      <div class="block block-rounded block-bordered border-2x">
        <div class="block-header block-header-default">
          <h3 class="block-title">
            <font-awesome-icon
              icon="star-of-life"
              fixed-width
              class="text-muted mr-1"
            />
            {{ $tc('view.packages.services', 0) }}
          </h3>
        </div>
        <div class="block-content">
          <b-form-group>
            <b-row>
              <b-col
                cols="6"
                v-for="service in allServices"
                :key="service.value"
              >
                <b-form-checkbox
                  v-model="selectedService"
                  :value="service.value"
                  switch
                  class="mb-2"
                >
                  <font-awesome-icon
                    :icon="service.icon"
                    fixed-width
                    class="mr-1"
                  />
                  {{ service.text }}
                </b-form-checkbox>
              </b-col>
            </b-row>
          </b-form-group>
        </div>
      </div>
      <div class="block block-rounded block-bordered border-2x">
        <div class="block-header block-header-default">
          <h3 class="block-title">
            <font-awesome-icon
              icon="star-of-life"
              fixed-width
              class="text-muted mr-1"
            />
            {{ $t('view.packages.limits') }}
          </h3>
        </div>
        <div class="block-content">
          <label for="range-stake">
            {{ $t('view.packages.minStakeLimit') }} {{ selectedMinStake }}
          </label>
          <b-form-input
            id="range-stake"
            v-model="selectedMinStake"
            type="range"
            :min="minStakeRange.min"
            :max="minStakeRange.max"
            class="mb-2"
          ></b-form-input>
          <label for="range-quota">
            {{ $t('view.packages.quotaLimit') }} {{ selectedQuota }}
          </label>
          <b-form-input
            id="range-quota"
            v-model="selectedQuota"
            type="range"
            :min="quotaRange.min"
            :max="quotaRange.max"
            class="mb-2"
          ></b-form-input>
          <label for="range-pkg-period">
            {{ $t('view.packages.packagePeriodLimit') }}
            {{ selectedPkgPeriod }}h
          </label>
          <b-form-input
            id="range-pkg-period"
            v-model="selectedPkgPeriod"
            type="range"
            :min="pkgPeriodRange.min"
            :max="pkgPeriodRange.max"
            class="mb-2"
          ></b-form-input>
        </div>
      </div>
      <div class="block block-rounded block-bordered border-2x">
        <div class="block-header block-header-default">
          <h3 class="block-title">
            <font-awesome-icon
              icon="star-of-life"
              fixed-width
              class="text-muted mr-1"
            />
            {{ $t('view.packages.status') }}
          </h3>
        </div>
        <div class="block-content">
          <b-form-group>
            <b-row>
              <b-col cols="6" v-for="status in allStatuses" :key="status.value">
                <b-form-checkbox
                  v-model="selectedStatus"
                  :value="status"
                  switch
                  class="mb-2"
                >
                  {{ status }}
                </b-form-checkbox>
              </b-col>
            </b-row>
          </b-form-group>
        </div>
      </div>
      <div v-if="false" class="text-center">
        <b-btn @click="reset()" size="sm" variant="danger">
          <font-awesome-icon icon="trash-alt" fixed-width /> Reset
        </b-btn>
      </div>
    </div>
  </b-col>
</template>

<script lang="ts">
import { Watch, Component, Vue } from 'vue-property-decorator'
import { vxm } from '@/store/'

@Component
export default class SearchFilter extends Vue {
  // data
  private allStatuses = ['Available', 'Selected', 'Deprecated']

  // computed
  get allProviders() {
    return vxm.dappservices.getAllProviders
  }

  get allServices() {
    return vxm.dappservices.getAllServices
  }

  get minStakeRange() {
    return vxm.packages.getMinStakeRange
  }

  get quotaRange() {
    return vxm.packages.getQuotaRange
  }

  get pkgPeriodRange() {
    return vxm.packages.getPkgPeriodRange
  }

  get showFilter() {
    return vxm.packages.showFilter
  }

  get selectedProvider() {
    return vxm.packages.selectedProvider
  }
  set selectedProvider(value) {
    vxm.packages.setSelectedProvider(value)
  }

  get selectedService() {
    return vxm.packages.selectedService
  }
  set selectedService(value) {
    vxm.packages.setSelectedService(value)
  }

  get selectedMinStake() {
    return vxm.packages.selectedMinStake
  }
  set selectedMinStake(value) {
    vxm.packages.setSelectedMinStake(value)
  }

  get selectedQuota() {
    return vxm.packages.selectedQuota
  }
  set selectedQuota(value) {
    vxm.packages.setSelectedQuota(value)
  }

  get selectedPkgPeriod() {
    return vxm.packages.selectedPkgPeriod
  }
  set selectedPkgPeriod(value) {
    vxm.packages.setSelectedPkgPeriod(value)
  }

  get selectedStatus() {
    return vxm.packages.selectedStatus
  }

  set selectedStatus(value) {
    vxm.packages.setSelectedStatus(value)
  }

  get sortBy() {
    return vxm.packages.sortBy
  }

  set sortBy(value) {
    vxm.packages.setSortOrder({ sort: value, order: this.orderBy })
  }

  get orderBy() {
    return vxm.packages.orderBy
  }

  set orderBy(value) {
    vxm.packages.setSortOrder({ sort: this.sortBy, order: value })
  }

  get queryParams() {
    let params: any = {}
    if (this.selectedProvider.length)
      params.providers = this.selectedProvider.join('-')
    if (this.selectedService.length)
      params.services = this.selectedService.join('-')
    if (this.sortBy !== 'random') params.sortBy = this.sortBy
    return params
  }

  // methods
  getSortString(sort: string) {
    switch (sort) {
      case 'random': {
        return this.$t('view.packages.random')
      }
      case 'provider': {
        return this.$tc('view.packages.providers', 1)
      }
      case 'id': {
        return 'Date Added'
      }
      case 'service': {
        return this.$tc('view.packages.services', 1)
      }
      case 'package_id': {
        return this.$tc('view.packages.packages', 1)
      }
      case 'quota': {
        return this.$t('view.packages.quota')
      }
      case 'min_stake_quantity': {
        return this.$t('view.packages.minStake')
      }
      default: {
        return sort
      }
    }
  }

  @Watch('queryParams')
  onParamsChange(val: any, oldVal: any) {
    if (val !== {}) {
      this.$router.push({ name: 'UserPackages', query: val })
    }
  }

  // Lifecycle hooks
  created() {
    const params = this.$route.query
    if (params.providers && typeof params.providers === 'string') {
      this.selectedProvider = params.providers.split('-')
    }
    if (params.services && typeof params.services === 'string') {
      this.selectedService = params.services.split('-')
    }
    if (params.sortBy && typeof params.sortBy === 'string') {
      this.sortBy = params.sortBy
    }
  }
  mounted() {}
  updated() {}
  destroyed() {}
}
</script>

<style lang="scss">
.form-select .vs__dropdown-toggle,
.form-select .vs__dropdown-menu {
  padding: 0.25rem 0.25rem 0.5rem 0.25rem;
  background: #ffffff;
  border: 2px solid #d8dfed;
}

.form-select .vs__clear,
.form-select .vs__open-indicator {
}
</style>
