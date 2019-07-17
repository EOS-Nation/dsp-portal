<template>
  <b-col
    :md="getColSpan.md"
    :lg="getColSpan.lg"
    :xl="getColSpan.xl"
    :class="{ 'd-none d-md-inline': showFilter }"
  >
    <b-row>
      <b-col>
        <div class="d-flex justify-content-between align-items-center">
          <h4 class="font-w400 mb-0 pb-0">
            <font-awesome-icon
              v-if="isLoading"
              icon="spinner"
              fixed-width
              pulse
            />
            <font-awesome-icon v-else icon="search" fixed-width />
            {{ filteredPkgs.length }}
            {{ $tc('view.packages.packages', filteredPkgs.length) }}
          </h4>
          <div>
            <span class="mr-2">View Mode:</span>
            <font-awesome-icon
              @click="tableView = false"
              icon="th"
              class="cursor mr-2"
              :class="{ 'text-muted': tableView }"
              fixed-width
            />
            <font-awesome-icon
              @click="tableView = true"
              icon="th-list"
              class="cursor mr-2"
              :class="{ 'text-muted': !tableView }"
              fixed-width
            />
          </div>
        </div>
        <hr class="mt-2" />
      </b-col>
    </b-row>
    <template v-if="filteredPkgs.length">
      <b-row v-if="!tableView">
        <b-col lg="6" xl="4" v-for="pkg in filteredPkgs" :key="pkg.id">
          <package-card :pkg="pkg" :showDetailsBtn="true" />
        </b-col>
      </b-row>
      <packages-table v-else :filteredPkgs="filteredPkgs" />
    </template>
    <h2
      v-else
      class="text-center text-muted mt-5"
      v-text="$t('view.packages.noResults')"
    ></h2>
  </b-col>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { vxm } from '@/store/'
import PackageCard from '@/components/packages/PackageCard.vue'
import PackagesTable from '@/components/packages/PackagesTable.vue'
import { Package } from 'dapp-client'

@Component({
  props: {},
  components: {
    PackageCard,
    PackagesTable
  }
})
export default class PackagesFound extends Vue {
  // data
  private randomized: boolean = true

  // computed
  get getColSpan() {
    if (this.showFilter) {
      return { md: 6, lg: 7, xl: 9 }
    } else return { md: 12, lg: 12, xl: 12 }
  }

  get tableView() {
    return vxm.core.tableView
  }
  set tableView(value) {
    vxm.core.setTableView(value)
  }
  get isLoading() {
    return vxm.packages.isLoadingPkgs
  }

  get selectedProvider() {
    return vxm.packages.selectedProvider
  }

  get selectedService() {
    return vxm.packages.selectedService
  }

  get selectedMinStake() {
    return vxm.packages.selectedMinStake
  }

  get selectedQuota() {
    return vxm.packages.selectedQuota
  }

  get selectedPkgPeriod() {
    return vxm.packages.selectedPkgPeriod
  }

  get selectedStatus() {
    return vxm.packages.selectedStatus
  }

  get sortBy() {
    return vxm.packages.sortBy
  }

  get orderBy() {
    return vxm.packages.orderBy
  }

  random(array: any) {
    let randomArray = array
    if (this.randomized) {
      return array
    } else {
      let currentIndex = randomArray.length,
        temporaryValue,
        randomIndex

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex -= 1

        // And swap it with the current element.
        temporaryValue = randomArray[currentIndex]
        randomArray[currentIndex] = randomArray[randomIndex]
        randomArray[randomIndex] = temporaryValue
      }
      this.randomized = true
      return randomArray
    }
  }

  sort(array: any) {
    if (this.sortBy === 'random') return this.random(array)
    else this.randomized = false
    return array.sort((a: any, b: any) => {
      let aa = a[this.sortBy]
      let bb = b[this.sortBy]
      if (this.sortBy !== 'id') {
        aa = a[this.sortBy].split(' ')
        bb = b[this.sortBy].split(' ')
        if (aa.length > 1) {
          aa = parseFloat(aa[0])
          bb = parseFloat(bb[0])
        } else {
          aa = aa[0]
          bb = bb[0]
        }
      }
      let modifier = 1
      if (this.orderBy === 'Descending') modifier = -1
      if (aa < bb) return -1 * modifier
      if (aa > bb) return 1 * modifier
      return 0
    })
  }

  get filteredPkgs() {
    const allPkgs = vxm.dappservices.packageTable
    let results: any[] = []
    if (this.selectedService.length > 0) {
      results = allPkgs.filter((pkg: Package) =>
        this.selectedService.includes(pkg.service)
      )
    } else results = allPkgs
    if (this.selectedProvider.length > 0) {
      results = results.filter((pkg: Package) =>
        this.selectedProvider.includes(pkg.provider)
      )
    }
    if (this.selectedMinStake > 0) {
      results = results.filter(
        (pkg: Package) =>
          parseFloat(pkg.min_stake_quantity) <= this.selectedMinStake
      )
    }
    if (this.selectedQuota > 0) {
      results = results.filter(
        (pkg: Package) => parseFloat(pkg.quota) <= this.selectedQuota
      )
    }
    if (this.selectedPkgPeriod > 0) {
      results = results.filter(
        (pkg: Package) => pkg.package_period / 60 / 60 <= this.selectedPkgPeriod
      )
    }
    if (this.selectedStatus.length > 0) {
      results = results.filter((pkg: Package) =>
        this.selectedStatus.includes(this.getPkgStatus(pkg))
      )
    }
    return this.sort(results)
  }

  getPkgStatus(pkg: Package) {
    if (this.isDeprecated(pkg)) return 'Deprecated'
    else if (this.isPkgSelected(pkg)) return 'Selected'
    else return 'Available'
  }

  isPkgSelected(pkg: Package) {
    for (const el of vxm.user.selectedPackages) {
      if (
        el.provider === pkg.provider &&
        el.pending_package === pkg.package_id &&
        el.service === pkg.service
      ) {
        return true
      }
    }
    return false
  }

  isDeprecated(pkg: Package) {
    return !(
      pkg.api_endpoint !== '' &&
      pkg.api_endpoint !== null &&
      pkg.api_endpoint !== 'null' &&
      pkg.api_endpoint !== undefined
    )
  }

  get showFilter() {
    return vxm.packages.showFilter
  }

  // Lifecycle hooks
  created() {}
  mounted() {}
  updated() {}
  destroyed() {}
}
</script>

<style lang="scss" scoped></style>
