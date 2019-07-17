<template>
  <div>
    <b-row>
      <b-col class="text-center">
        <h2>Welcome to EOS Nation's</h2>
        <div class="block block-rounded bg-gd-primary py-3">
          <div class="block-content mb-1">
            <font-awesome-icon icon="rocket" class="mx-2 text-white fa-3x" />
          </div>
          <div class="block-content pt-2">
            <!-- Logo -->
            <span class="link-fx font-size-h1 font-w700 text-white">
              <span class="text-white-75">DSP </span>
              <span class="text-white">Portal</span>
            </span>
            <!-- END Logo -->
            <h4 class="text-white-50 mt-2">
              Our DAPP Service Provider (DSP) Portal with an intuitive interface
              and a great user experience.
            </h4>
          </div>
        </div>
      </b-col>
    </b-row>
    <b-row class="row-deck">
      <b-col sm="6">
        <div class="block block-rounded">
          <div class="block-content">
            <h3 class="text-center text-primary-light font-w700">
              <font-awesome-icon icon="info-circle" class="mr-3" />About Us
            </h3>
            <p>
              {{ $t('view.welcome.p1') }} To learn more head over to our
              <router-link :to="{ name: 'faq' }"
                ><font-awesome-icon icon="question-circle" /> Frequently Asked
                Questions</router-link
              >
              section.
            </p>
          </div>
        </div>
      </b-col>
      <b-col sm="6">
        <div class="block block-rounded">
          <div class="block-content">
            <h3 class="text-center text-primary-light font-w700">
              <font-awesome-icon icon="question-circle" class="mr-3" />How to
              use our DSP Portal
            </h3>
            <b-row>
              <b-col xl="6">
                <a
                  class="block block-rounded block-link-pop text-center bg-body-dark"
                  href="https://www.youtube.com/watch?v=W9df_JRmRBA"
                  target="_blank"
                >
                  <div
                    class="block-content block-content-full d-flex justify-content-center align-items-center"
                  >
                    <div>
                      <font-awesome-icon
                        :icon="['fab', 'youtube']"
                        class="fa-2x"
                      />
                      <div class="font-w600 mt-3 text-uppercase">
                        Video Tutorial
                      </div>
                    </div>
                  </div>
                </a>
              </b-col>
              <b-col xl="6">
                <a
                  class="block block-rounded block-link-pop text-center bg-body-dark"
                  href="https://medium.com/@eosnationbp/eos-nation-dsp-portal-tutorial-d414670b9ad6"
                  target="_blank"
                >
                  <div
                    class="block-content block-content-full d-flex justify-content-center align-items-center"
                  >
                    <div>
                      <font-awesome-icon
                        :icon="['fab', 'medium']"
                        class="fa-2x"
                      />
                      <div class="font-w600 mt-3 text-uppercase">
                        Written Tutorial
                      </div>
                    </div>
                  </div>
                </a>
              </b-col>
            </b-row>
          </div>
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <div class="block block-rounded">
          <div class="block-content">
            <h3 class="text-center text-primary-light font-w700">
              <font-awesome-icon icon="question-circle" class="mr-3" />
              {{ $t('view.welcome.subTitle') }}
            </h3>
            <b-row>
              <b-col class="text-justify" lg="4"
                ><p v-text="$t('view.welcome.p2')"></p
              ></b-col>
              <b-col class="text-justify" lg="4"
                ><p v-text="$t('view.welcome.p3')"></p
              ></b-col>
              <b-col class="text-justify" lg="4"
                ><p v-text="$t('view.welcome.p4')"></p
              ></b-col>
              <b-col class="text-center my-2" cols="12"
                ><h5 v-text="$t('view.welcome.p7')"></h5
              ></b-col>
              <b-col class="text-justify" lg="4"
                ><p v-text="$t('view.welcome.p5')"></p
              ></b-col>
              <b-col class="text-justify" lg="4"
                ><p>
                  Since the EOS Mainnet launch back in June 2018, EOS Nation has
                  proven itself to be a reliable EOSIO Block Producer, having
                  produced over 500,000 blocks with 99.991% round availability.
                </p></b-col
              >
              <b-col class="text-justify" lg="4"
                ><p>
                  In fact, EOS Nation sits in the top producer reliability
                  position; in the 42,292 times we were scheduled to produce
                  blocks, we have only ever missed 4 rounds and recovered
                  immediately within 2 minutes (1 round) of it happening every
                  time.
                </p></b-col
              >
            </b-row>
          </div>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { vxm } from '@/store'

@Component({
  components: {}
})
export default class UserWelcome extends Vue {
  // Lifecycle hooks
  created() {}
  mounted() {}
  updated() {}
  destroyed() {}
}
</script>

<style lang="scss"></style>
