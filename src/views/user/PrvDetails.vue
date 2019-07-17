<template>
  <div>
    <h2
      class="text-center"
      v-text="$t('view.providerDetails.providerDetails')"
    />
    <b-row class="gutters-tiny">
      <b-col cols="12">
        <div class="block block-rounded block-bordered">
          <div
            class="block-content block-content-full text-center bg-gd-primary"
          >
            <img
              class="img-avatar img-avatar-thumb img-avatar-rounded mb-4 bg-white"
              :src="getNameLogo.dspLogoUrl"
              alt="Provider Logo"
            />
            <h3 class="font-size-h4  text-white font-w700 mb-2">
              {{ getNameLogo.name }}
            </h3>
            <div v-if="!dspJson.error" class="d-flex justify-content-center">
              <a
                :href="dspJson.data.website"
                target="_blank"
                class="badge bg-orange text-uppercase font-w700 py-2 px-3 mr-1"
              >
                {{ $t('view.providerDetails.website') }}
              </a>
              <a
                :href="'mailto:' + dspJson.data.email"
                target="_blank"
                class="badge bg-orange text-uppercase font-w700 py-2 px-3 mr-1"
              >
                {{ $t('view.providerDetails.email') }}
              </a>
            </div>
          </div>
        </div>
      </b-col>
      <b-col cols="12">
        <b-row class="row-deck gutters-tiny">
          <div class="col-12 col-sm-6 col-lg-3">
            <simple-tile
              :title="$tc('view.providerDetails.packages', 0)"
              :value="dspNumbers.packages.length"
            />
          </div>
          <div class="col-12 col-sm-6 col-lg-3">
            <simple-tile
              :title="$t('view.providerDetails.services')"
              :value="dspNumbers.services.length"
            />
          </div>
          <div class="col-12 col-sm-6 col-lg-3">
            <simple-tile
              :title="$t('view.providerDetails.stakeWeight')"
              :value="
                numeral((dspNumbers.balance / totalStaked) * 100).format(
                  '0.0'
                ) + ' %'
              "
            />
          </div>
          <div class="col-12 col-sm-6 col-lg-3">
            <simple-tile
              :title="$tc('view.providerDetails.users', 0)"
              :value="dspNumbers.userCount"
            />
          </div>
        </b-row>
      </b-col>
    </b-row>
    <b-row v-if="!dspJson.error">
      <b-col cols="12">
        <div class="block block-rounded block-bordered mb-0">
          <div class="block-content">
            <tile-map
              v-if="location.long && location.lat"
              :lat="location.lat"
              :long="location.long"
            />
          </div>
        </div>
      </b-col>
    </b-row>
    <b-row class="mt-4">
      <b-col>
        <div class="d-flex justify-content-between align-items-center">
          <h4 class="font-w400 mb-0 pb-0">
            <font-awesome-icon icon="box-open" fixed-width class="mr-1" />
            {{ filteredPkgs.length }}
            {{ $tc('view.providerDetails.packages', filteredPkgs.length) }}
          </h4>
          <div>
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
              class="cursor"
              :class="{ 'text-muted': !tableView }"
              fixed-width
            />
          </div>
        </div>
        <hr class="mt-2" />
      </b-col>
    </b-row>
    <b-row v-if="!tableView" class="d-flex justify-content-center">
      <b-col lg="6" xl="4" v-for="pkg in filteredPkgs" :key="pkg.id">
        <package-card :pkg="pkg" :showDetailsBtn="true" />
      </b-col>
    </b-row>
    <b-row v-else>
      <b-col>
        <packages-table :filteredPkgs="filteredPkgs" />
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <div class="d-flex justify-content-between align-items-center">
          <h4 class="font-w400 mb-0 pb-0">
            <font-awesome-icon icon="users" fixed-width class="mr-1" />
            {{ prvUsers.length }}
            {{ $tc('view.providerDetails.users', prvUsers.length) }}
          </h4>
        </div>
        <hr class="mt-2" />
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <accounts-table :accounts="prvUsers" :showAccount="true" />
      </b-col>
    </b-row>
    <b-row v-if="dspJson.error">
      <b-col v-if="pkgJson.error || dspJson.error">
        <div
          class="block block-rounded block-bordered d-flex align-items-center"
        >
          <div class="block-content">
            <json-fetch-alert :pkgJson="pkgJson" :dspJson="dspJson" />
          </div>
        </div>
      </b-col>
    </b-row>
    <template v-else>
      <b-row>
        <b-col>
          <div class="d-flex justify-content-between align-items-center">
            <h4 class="font-w400 mb-0 pb-0">
              <font-awesome-icon
                icon="share-alt-square"
                fixed-width
                class="mr-1"
              />
              {{ $t('view.providerDetails.socialLinks') }}
            </h4>
          </div>
          <hr class="mt-2" />
        </b-col>
      </b-row>
      <b-row class="d-flex justify-content-center">
        <template v-for="(value, name, index) in dspJson.data.social">
          <b-col v-if="value" :key="index">
            <tile-social :platform="name" :username="value" />
          </b-col>
        </template>
      </b-row>
    </template>
  </div>
</template>

<script lang="ts">
import { Watch, Prop, Component, Vue } from 'vue-property-decorator'
import { vxm } from '@/store'
import PackageCard from '@/components/packages/PackageCard.vue'
import JsonFetchAlert from '@/components/common/JsonFetchAlert.vue'
import SimpleTile from '@/components/common/SimpleTile.vue'
import PackagesTable from '@/components/packages/PackagesTable.vue'
import * as helper from '@/assets/_js/helpers'
import TileMap from '@/components/common/TileMap.vue'
import { Accountext, Package } from 'dapp-client'
import AccountsTable from '@/components/accounts/AccountsTable.vue'
import TileSocial from '@/components/common/TileSocial.vue'
const numeral = require('numeral')

@Component({
  components: {
    PackageCard,
    PackagesTable,
    JsonFetchAlert,
    SimpleTile,
    TileMap,
    AccountsTable,
    TileSocial
  }
})
export default class PrvDetails extends Vue {
  @Prop() private provider!: string
  private numeral = numeral
  private pkgJson: any = {
    error: true,
    errorMsg: '',
    data: {}
  }
  private dspJson: any = {
    error: true,
    errorMsg: '',
    data: {}
  }

  get prvDetails() {
    return vxm.dappservices.packageTable.find(
      (pkg: Package) => pkg.provider === this.provider && pkg.package_json_uri
    )
  }

  get totalStaked() {
    let total = 0
    for (const prv of vxm.dappservices.dspRanking) {
      total += prv.balance
    }
    return total
  }

  get prvUsers() {
    return vxm.dappservices.accountTable.filter(
      (user: Accountext) => user.provider === this.provider
    )
  }

  get dspNumbers() {
    let res = vxm.dappservices.dspRanking.find(
      (prv: any) => prv.provider === this.provider
    )
    if (res) return res
    else return { balance: 0, packages: 0 }
  }

  get filteredPkgs() {
    const allPkgs = vxm.dappservices.packageTable
    let results = allPkgs.filter((pkg: any) => pkg.provider === this.provider)
    return results
  }

  get getNameLogo() {
    return helper.nameLogo(this.provider, this.pkgJson, this.dspJson)
  }

  get location() {
    if (!this.dspJson.error) {
      return {
        lat: this.dspJson.data.location.latitude,
        long: this.dspJson.data.location.longitude
      }
    } else return { lat: 0, long: 0 }
  }

  get tableView() {
    return vxm.core.tableView
  }

  set tableView(value) {
    vxm.core.setTableView(value)
  }

  async loadData() {
    if (this.prvDetails) {
      let pkgJson = await vxm.jsondb.getPkgJson(this.prvDetails)
      let dspJson = await vxm.jsondb.getDspJson(this.prvDetails)
      this.pkgJson = pkgJson
      this.dspJson = dspJson
    }
  }

  @Watch('prvDetails')
  async onPrvChange(val: any, oldVal: any) {
    await this.loadData()
  }

  // Lifecycle hooks
  created() {}

  async mounted() {
    await this.loadData()
  }

  updated() {}

  destroyed() {}
}
</script>

<style lang="scss"></style>
