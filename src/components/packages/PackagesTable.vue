<template>
  <div class="block block-rounded block-bordered">
    <div class="block-content">
      <div class="table-responsive" style="min-height: 220px">
        <table class="table table-hover table-striped table-vcenter">
          <tbody>
            <packages-table-row
              v-for="pkg in pkgbyPages"
              :key="pkg.id"
              :pkg="pkg"
            />
          </tbody>
        </table>
      </div>
      <div class="d-flex justify-content-center">
        <ul class="pagination">
          <template v-if="currentPage > 1">
            <li
              @click="setPagination('first')"
              class="paginate_button page-item cursor"
            >
              <span class="page-link">
                <font-awesome-icon icon="angle-double-left" />
              </span>
            </li>
            <li
              @click="setPagination('prev')"
              class="paginate_button page-item cursor"
            >
              <span class="page-link">
                <font-awesome-icon icon="angle-left" />
              </span>
            </li>
          </template>
          <template v-else>
            <li class="paginate_button page-item disabled">
              <span class="page-link">
                <font-awesome-icon icon="angle-double-left" />
              </span>
            </li>
            <li class="paginate_button page-item disabled">
              <span class="page-link">
                <font-awesome-icon icon="angle-left" />
              </span>
            </li>
          </template>
          <li class="paginate_button page-item">
            <span class="page-link">
              {{ $t('component.accountsTable.pageOf', [currentPage, pages]) }}
            </span>
          </li>
          <template v-if="currentPage < pages">
            <li
              @click="setPagination('next')"
              class="paginate_button page-item cursor"
            >
              <span class="page-link">
                <font-awesome-icon icon="angle-right" />
              </span>
            </li>
            <li
              @click="setPagination('last')"
              class="paginate_button page-item cursor"
            >
              <span class="page-link">
                <font-awesome-icon icon="angle-double-right" />
              </span>
            </li>
          </template>
          <template v-else>
            <li class="paginate_button page-item disabled">
              <span class="page-link">
                <font-awesome-icon icon="angle-right" />
              </span>
            </li>
            <li class="paginate_button page-item disabled">
              <span class="page-link">
                <font-awesome-icon icon="angle-double-right" />
              </span>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'vue-property-decorator'
import { vxm } from '@/store/'
import PackagesTableRow from './PackagesTableRow.vue'
import { Package } from 'dapp-client'

const numeral = require('numeral')

@Component({
  components: {
    PackagesTableRow
  }
})
export default class PackagesTable extends Vue {
  // Props
  @Prop() filteredPkgs!: Package[]
  // Data
  currentPage = 1
  limit = 10
  offset = 0

  get pkgbyPages() {
    return this.filteredPkgs.slice(this.offset, this.offset + this.limit)
  }

  get pages() {
    return Math.ceil(this.filteredPkgs.length / this.limit)
  }

  setPagination(page: 'first' | 'last' | 'next' | 'prev') {
    if (page === 'first') {
      this.offset = 0
      this.currentPage = 1
    } else if (page === 'last') {
      this.offset = this.pages * this.limit - this.limit
      this.currentPage = this.pages
    } else if (page === 'next') {
      this.offset += this.limit
      this.currentPage++
    } else if (page === 'prev') {
      this.offset -= this.limit
      this.currentPage--
    }
  }

  // Lifecycle hooks
  created() {}
  mounted() {}
  updated() {}
  destroyed() {}
}
</script>

<style lang="scss"></style>
