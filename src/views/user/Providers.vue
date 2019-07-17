<template>
  <div>
    <h2 class="text-center" v-text="$t('view.providers.dsp')" />
    <div class="block block-rounded block-bordered">
      <div class="block-content">
        <div class="table-responsive">
          <table class="table table-sm table-vcenter table-hover table-striped">
            <thead>
              <tr>
                <th class="text-center" style="width: 50px;">#</th>
                <th
                  @click="sort('provider')"
                  class="cursor"
                  style="min-width: 190px;"
                >
                  <sort-icons
                    :currentSort="currentSort"
                    :currentSortDir="currentSortDir"
                    category="provider"
                  />
                  {{ $tc('view.providers.providers', 1) }}
                </th>
                <th
                  @click="sort('packages')"
                  class="text-right cursor"
                  style="min-width: 110px;"
                >
                  <sort-icons
                    :currentSort="currentSort"
                    :currentSortDir="currentSortDir"
                    category="packages"
                  />
                  {{ $t('view.providers.packages') }}
                </th>
                <th
                  @click="sort('services')"
                  class="text-right cursor"
                  style="min-width: 100px;"
                >
                  <sort-icons
                    :currentSort="currentSort"
                    :currentSortDir="currentSortDir"
                    category="services"
                  />
                  {{ $t('view.providers.services') }}
                </th>
                <th
                  @click="sort('balance')"
                  class="text-right cursor"
                  style="min-width: 180px;"
                >
                  <sort-icons
                    :currentSort="currentSort"
                    :currentSortDir="currentSortDir"
                    category="balance"
                  />
                  {{ $t('view.providers.rewards') }}
                </th>
                <th
                  @click="sort('balance')"
                  class="text-right cursor"
                  style="min-width: 150px;"
                >
                  <sort-icons
                    :currentSort="currentSort"
                    :currentSortDir="currentSortDir"
                    category="balance"
                  />
                  {{ $t('view.providers.dappStaked') }}
                </th>
                <th
                  @click="sort('balance')"
                  class="text-right cursor"
                  style="min-width: 180px;"
                >
                  <sort-icons
                    :currentSort="currentSort"
                    :currentSortDir="currentSortDir"
                    category="balance"
                  />
                  {{ $t('view.providers.totalStaked') }}
                </th>
                <th
                  @click="sort('userCount')"
                  class="text-right cursor"
                  style="min-width: 130px;"
                >
                  <sort-icons
                    :currentSort="currentSort"
                    :currentSortDir="currentSortDir"
                    category="userCount"
                  />
                  {{ $t('view.providers.userCount') }}
                </th>
              </tr>
            </thead>
            <tbody>
              <prv-table-row
                v-for="(dsp, index) in sortedProviders"
                :key="dsp.provider"
                :dsp="dsp"
                :index="index"
              />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { vxm } from '@/store/'
import SortIcons from '@/components/common/SortIcons.vue'
import PrvTableRow from '@/components/providers/PrvTableRow.vue'

const numeral = require('numeral')

@Component({
  components: {
    SortIcons,
    PrvTableRow
  }
})
export default class Providers extends Vue {
  // data
  private numeral = numeral
  currentSort = 'balance'
  currentSortDir = 'desc'

  // computed
  get sortedProviders() {
    let array = vxm.dappservices.dspRanking
    return array.sort((a: any, b: any) => {
      let aa = a[this.currentSort]
      let bb = b[this.currentSort]
      if (this.currentSort === 'packages' || this.currentSort === 'services') {
        aa = aa.length
        bb = bb.length
      }
      let modifier = 1
      if (this.currentSortDir === 'desc') modifier = -1
      if (aa < bb) return -1 * modifier
      if (aa > bb) return 1 * modifier
      return 0
    })
  }

  // methods
  sort(s: string) {
    if (s === this.currentSort) {
      this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc'
    }
    this.currentSort = s
  }

  // Lifecycle hooks
  mounted() {
    vxm.dappservices.getAccountTable()
  }
  created() {}
  updated() {}
  destroyed() {}
}
</script>

<style lang="scss" scoped></style>
