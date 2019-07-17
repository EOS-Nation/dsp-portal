<template>
  <div>
    <div class="text-center mb-4">
      <h2>
        {{ $t('view.faq.faq') }}
      </h2>
      <h5>
        Help us improve this FAQ Catalog on
        <a href="https://github.com/EOS-Nation/dapp-faq" target="_blank"
          >GitHub</a
        >
      </h5>
      <a
        v-for="(category, index) in faqData"
        :key="index"
        :href="'#' + (index + 1)"
        class="btn btn-outline-primary mr-1"
      >
        {{ category.categoryTitle }}
      </a>
    </div>
    <div
      v-for="(category, index) in faqData"
      :key="index"
      :id="index + 1"
      class="block block-rounded block-bordered"
    >
      <div class="block-header block-header-default">
        <h3 class="block-title">
          {{ index + 1 }} - {{ category.categoryTitle }}
        </h3>
      </div>
      <div class="block-content">
        <template v-for="(subCategory, subIndex) in category.subCategory">
          <h2 :key="'header' + subIndex" class="content-heading">
            <strong>{{ index + 1 }}.{{ subIndex + 1 }} -</strong>
            {{ subCategory.subCategoryTitle }}
          </h2>
          <div :key="'content' + subIndex" class="row items-push">
            <div class="col-lg-4">
              <p class="text-muted">{{ subCategory.subCategoryDesc }}</p>
            </div>
            <div class="col-lg-8">
              <div id="faq1" role="tablist">
                <div
                  v-for="(qa, qaIndex) in subCategory.questionsAnswers"
                  class="block block-rounded mb-1"
                  :key="qaIndex"
                >
                  <div
                    @click="setActiveFaq(index + 1, subIndex + 1, qaIndex + 1)"
                    class="block-header block-header-default cursor"
                    role="tab"
                    v-b-toggle="
                      'faq-' +
                        (index + 1) +
                        '.' +
                        (subIndex + 1) +
                        '.' +
                        (qaIndex + 1)
                    "
                  >
                    <span class="font-w600">
                      {{ index + 1 }}.{{ subIndex + 1 }}.{{ qaIndex + 1 }} -
                      {{ qa.question }}
                    </span>
                    <font-awesome-icon
                      v-if="
                        activeFaq ===
                          index + 1 + '.' + (subIndex + 1) + '.' + (qaIndex + 1)
                      "
                      icon="chevron-down"
                    />
                    <font-awesome-icon v-else icon="chevron-right" />
                  </div>
                  <b-collapse
                    :id="
                      'faq-' +
                        (index + 1) +
                        '.' +
                        (subIndex + 1) +
                        '.' +
                        (qaIndex + 1)
                    "
                    accordion="faq"
                    role="tabpanel"
                  >
                    <div class="block-content">
                      <p>{{ qa.answer }}</p>
                    </div>
                  </b-collapse>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { vxm } from '@/store'

@Component
export default class UserFaq extends Vue {
  // data
  private activeFaq: string = ''

  // computed
  get faqData() {
    return vxm.faq.faqEn
  }

  // method
  setActiveFaq(index: number, subIndex: number, qaIndex: number) {
    const newActiveFaq = index + '.' + subIndex + '.' + qaIndex
    if (this.activeFaq === newActiveFaq) this.activeFaq = ''
    else this.activeFaq = newActiveFaq
  }

  // Lifecycle hooks
  created() {}
  mounted() {}
  updated() {}
  destroyed() {}
}
</script>

<style lang="scss" scoped></style>
