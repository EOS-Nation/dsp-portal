<template>
  <div>
    <h2
      class="text-center"
      v-text="$t('view.packageDetails.packageDetails')"
    ></h2>
    <b-row class="gutters-tiny">
      <b-col cols="12">
        <package-card :pkg="pkgDetails" :showDetailsBtn="false" />
        <b-row class="row-deck gutters-tiny">
          <div class="col-12 col-sm-6 col-lg-3">
            <simple-tile
              :title="$t('view.packageDetails.quota')"
              :value="numeral(pkgDetails.quota).format('0,0[.][0000]')"
            />
          </div>
          <div class="col-12 col-sm-6 col-lg-3">
            <simple-tile
              :title="$t('view.packageDetails.minStakeQuantity')"
              :value="numeral(pkgDetails.min_stake_quantity).format('0,0')"
            />
          </div>
          <div class="col-12 col-sm-6 col-lg-3">
            <simple-tile
              :title="$t('view.packageDetails.unstakePeriod')"
              :value="
                numeral(pkgDetails.min_unstake_period / 60 / 60).format(
                  '0[.][00]'
                ) + 'h'
              "
            />
          </div>
          <div class="col-12 col-sm-6 col-lg-3">
            <simple-tile
              :title="$t('view.packageDetails.packagePeriod')"
              :value="
                numeral(pkgDetails.package_period / 60 / 60).format(
                  '0[.][00]'
                ) + 'h'
              "
            />
          </div>
        </b-row>
      </b-col>
    </b-row>
    <b-row class="row-deck gutters-tiny">
      <b-col lg="6">
        <div class="block block-rounded block-bordered">
          <div class="block-content">
            <table class="table table-borderless table-striped">
              <tbody>
                <tr>
                  <td class="font-w700">
                    {{ $t('view.packageDetails.account') }}
                  </td>
                  <td>
                    <router-link
                      :to="{
                        name: 'PrvDetails',
                        params: { provider: pkgDetails.provider }
                      }"
                    >
                      {{ pkgDetails.provider }}
                    </router-link>
                  </td>
                </tr>
                <tr v-if="pkgDetails.api_endpoint !== null">
                  <td class="font-w700">
                    {{ $t('view.packageDetails.apiEndpoint') }}
                  </td>
                  <td>
                    <a :href="pkgDetails.api_endpoint" target="_blank">{{
                      pkgDetails.api_endpoint
                    }}</a>
                  </td>
                </tr>
                <tr>
                  <td class="font-w700">
                    {{ $t('view.packageDetails.serviceId') }}
                  </td>
                  <td v-text="pkgDetails.service"></td>
                </tr>
                <tr>
                  <td class="font-w700">
                    {{ $t('view.packageDetails.pkgId') }}
                  </td>
                  <td v-text="pkgDetails.package_id"></td>
                </tr>
                <tr>
                  <td class="font-w700">{{ $t('view.packageDetails.uid') }}</td>
                  <td>{{ pkgDetails.id }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </b-col>
      <b-col lg="6" v-if="!pkgJson.error">
        <div class="block block-rounded block-bordered">
          <div class="block-content">
            <h4>{{ pkgJson.data.name }}</h4>
          </div>
          <div
            class="block-content"
            v-html="compileMarkdown(pkgJson.data.description)"
          ></div>
        </div>
      </b-col>
      <b-col cols="12" v-if="!pkgJson.error">
        <div class="block block-rounded block-bordered">
          <div class="block-content">
            <tile-map
              v-if="location.long && location.lat"
              :lat="location.lat"
              :long="location.long"
            />
          </div>
        </div>
      </b-col>
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
    <b-row class="mt-4">
      <b-col>
        <div class="d-flex justify-content-between align-items-center">
          <h4 class="font-w400 mb-0 pb-0">
            <font-awesome-icon icon="users" fixed-width class="mr-1" />
            {{ pkgUsers.length }}
            {{ $tc('view.packageDetails.users', pkgUsers.length) }}
          </h4>
        </div>
        <hr class="mt-2" />
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <accounts-table :accounts="pkgUsers" :showAccount="true" />
      </b-col>
    </b-row>
  </div>
</template>

<script lang="ts">
import { Watch, Prop, Component, Vue } from 'vue-property-decorator'
import { vxm } from '@/store/'
import * as helper from '@/assets/_js/helpers'
import SimpleTile from '@/components/common/SimpleTile.vue'
import PackageCard from '@/components/packages/PackageCard.vue'
import JsonFetchAlert from '@/components/common/JsonFetchAlert.vue'
import TileMap from '@/components/common/TileMap.vue'
import { Accountext, Package } from 'dapp-client'
import AccountsTable from '@/components/accounts/AccountsTable.vue'
import marked from 'marked'
const numeral = require('numeral')

@Component({
  components: {
    SimpleTile,
    PackageCard,
    JsonFetchAlert,
    TileMap,
    AccountsTable
  }
})
export default class PkgDetails extends Vue {
  // data
  @Prop() private id!: any
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

  // computed
  get pkgDetails() {
    return vxm.dappservices.packageTable.find(
      (pkg: Package) => pkg.id === parseInt(this.id)
    )
  }

  get location() {
    if (!this.pkgJson.error) {
      return {
        lat: this.pkgJson.data.locations[0].latitude,
        long: this.pkgJson.data.locations[0].longitude
      }
    } else return { lat: 0, long: 0 }
  }

  get pkgUsers() {
    return vxm.dappservices.accountTable.filter(
      (user: Accountext) =>
        user.provider === this.pkgDetails!.provider &&
        user.pending_package === this.pkgDetails!.package_id &&
        user.service === this.pkgDetails!.service
    )
  }

  // method
  selectPackage(pkg2select: any) {
    vxm.packages.selectPackage(pkg2select)
  }

  async loadData() {
    if (this.pkgDetails) {
      let pkgJson = await vxm.jsondb.getPkgJson(this.pkgDetails)
      let dspJson = await vxm.jsondb.getDspJson(this.pkgDetails)
      this.pkgJson = pkgJson
      this.dspJson = dspJson
    }
  }

  compileMarkdown(markdown: any) {
    return marked(markdown, { sanitize: true })
  }

  @Watch('pkgDetails')
  async onPkgChange(val: any, oldVal: any) {
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

<style lang="scss" scoped></style>
