<template>
  <div class="block block-rounded block-bordered">
    <div v-if="showAccount" class="block-content">
      <b-row class="d-flex justify-content-center">
        <b-col md="6" lg="4" xl="3">
          <b-input-group>
            <b-input-group-text slot="prepend">
              <font-awesome-icon
                :icon="['fas', searchState]"
                fixed-width
                :class="{ 'fa-blink': searchState === 'keyboard' }"
              />
            </b-input-group-text>
            <b-form-input
              v-model="accountSearch"
              placeholder="Search Account"
            ></b-form-input>
          </b-input-group>
        </b-col>
      </b-row>
    </div>
    <div class="block-content">
      <div class="table-responsive">
        <table class="table table-sm table-vcenter table-hover table-striped">
          <thead>
            <tr>
              <th class="text-center" style="width: 50px;">#</th>
              <th
                v-if="showAccount"
                @click="sort('account')"
                class="cursor"
                style="min-width: 150px;"
              >
                <sort-icons
                  :currentSort="currentSort"
                  :currentSortDir="currentSortDir"
                  category="account"
                />
                {{ $t('component.accountsTable.account') }}
              </th>
              <th
                v-else-if="showActionBtn"
                class="text-center"
                style="width: 135px;"
              ></th>
              <th style="min-width: 350px;">
                <span @click="sort('provider')" class="cursor">
                  <sort-icons
                    :currentSort="currentSort"
                    :currentSortDir="currentSortDir"
                    category="provider"
                  />
                  {{ $t('component.accountsTable.provider') }}
                </span>
                /
                <span @click="sort('service')" class="cursor">
                  <sort-icons
                    :currentSort="currentSort"
                    :currentSortDir="currentSortDir"
                    category="service"
                  />
                  {{ $t('component.accountsTable.service') }}
                </span>
                /
                <span @click="sort('pending_package')" class="cursor">
                  <sort-icons
                    :currentSort="currentSort"
                    :currentSortDir="currentSortDir"
                    category="pending_package"
                  />
                  {{ $t('component.accountsTable.package') }}
                </span>
              </th>
              <th
                @click="sort('status')"
                class="cursor text-center"
                style="min-width: 80px;"
              >
                <sort-icons
                  :currentSort="currentSort"
                  :currentSortDir="currentSortDir"
                  category="status"
                />
                {{ $t('component.accountsTable.status') }}
              </th>
              <th
                @click="sort('quota')"
                class="text-center cursor"
                style="min-width: 150px;"
              >
                <sort-icons
                  :currentSort="currentSort"
                  :currentSortDir="currentSortDir"
                  category="quota"
                />
                {{ $t('component.accountsTable.quota') }}
              </th>
              <th class="text-center" style="min-width: 175px;">
                PKG Period
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
                {{ $t('component.accountsTable.stake') }}
              </th>
            </tr>
          </thead>
          <tbody>
            <accounts-table-row
              v-for="(row, index) in searchedAccounts"
              :row="row"
              :count="index + offset"
              :showAccount="showAccount"
              :showActionBtn="showActionBtn"
              :key="index"
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
import { Watch, Prop, Component, Vue } from 'vue-property-decorator'
import { vxm } from '@/store/'
import SortIcons from '@/components/common/SortIcons.vue'
import AccountsTableRow from '@/components/accounts/AccountsTableRow.vue'
import { Accountext } from 'dapp-client'
const numeral = require('numeral')
const debounce = require('lodash.debounce')

@Component({
  components: {
    AccountsTableRow,
    SortIcons
  }
})
export default class AccountsTable extends Vue {
  @Prop() accounts!: Accountext[]
  @Prop() showAccount!: boolean
  @Prop() showActionBtn!: boolean
  private accountSearch: String = ''
  private searchOptions = {
    shouldSort: true,
    threshold: 0.3,
    location: 0,
    distance: 100,
    maxPatternLength: 12,
    minMatchCharLength: 1,
    keys: ['account']
  }
  searchResults: any = []
  private searchState: string = 'search'
  private numeral = numeral
  public debouncedGetSearch: any
  currentSort = 'balance'
  currentSortDir = 'desc'
  currentPage = 1
  limit = 10
  offset = 0

  get currentUser() {
    return vxm.transit.currentUser
  }

  get pages() {
    let count = 0
    if (this.searchResults.length) count = this.searchResults.length
    else count = this.accounts.length
    return Math.ceil(count / this.limit)
  }

  get searchedAccounts() {
    if (this.searchResults.length > 0)
      return this.searchResults.slice(this.offset, this.offset + this.limit)
    else return this.sortedAccounts
  }

  get sortedAccounts() {
    return this.accounts
      .sort((a: any, b: any) => {
        let modifier = 1
        if (this.currentSortDir === 'desc') modifier = -1
        if (
          this.currentSort === 'account' ||
          this.currentSort === 'provider' ||
          this.currentSort === 'pending_package' ||
          this.currentSort === 'service' ||
          this.currentSort === 'status'
        ) {
          if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier
          if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier
          return 0
        } else {
          if (parseFloat(a[this.currentSort]) < parseFloat(b[this.currentSort]))
            return -1 * modifier
          if (parseFloat(a[this.currentSort]) > parseFloat(b[this.currentSort]))
            return 1 * modifier
          return 0
        }
      })
      .slice(this.offset, this.offset + this.limit)
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

  isUser(account: string) {
    if (!this.currentUser) return false
    else if (this.currentUser.accountName === account) return true
  }

  sort(s: string) {
    if (s === this.currentSort) {
      this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc'
    }
    this.currentSort = s
  }

  searchAccounts() {
    // @ts-ignore
    this.$search(this.accountSearch, this.accounts, this.searchOptions).then(
      (results: any) => {
        this.searchResults = results
        if (this.accountSearch === '') this.searchState = 'search'
        else this.searchState = 'check'
      }
    )
  }

  @Watch('accountSearch')
  async onSearchChange(val: any, oldVal: any) {
    if (val !== '') {
      this.searchState = 'keyboard'
      this.debouncedGetSearch()
    } else {
      this.searchAccounts()
    }
  }

  // Lifecycle hooks
  mounted() {}
  created() {
    this.debouncedGetSearch = debounce(() => {
      this.searchAccounts()
    }, 500)
  }
  updated() {}
  destroyed() {}
}
</script>

<style lang="scss" scoped>
@keyframes fa-blink {
  0% {
    opacity: 1;
  }
  25% {
    opacity: 0.25;
  }
  50% {
    opacity: 0.5;
  }
  75% {
    opacity: 0.75;
  }
  100% {
    opacity: 0;
  }
}
.fa-blink {
  -webkit-animation: fa-blink 0.55s linear infinite;
  -moz-animation: fa-blink 0.55s linear infinite;
  -ms-animation: fa-blink 0.55s linear infinite;
  -o-animation: fa-blink 0.55s linear infinite;
  animation: fa-blink 0.55s linear infinite;
}
</style>
