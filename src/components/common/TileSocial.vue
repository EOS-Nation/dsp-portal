<template>
  <a
    class="block block-rounded text-center bg-gd-primary"
    :href="getPlatformLink"
    target="_blank"
  >
    <div
      class="block-content block-content-full aspect-ratio-16-9 d-flex justify-content-center align-items-center"
    >
      <div>
        <font-awesome-icon
          :icon="getPlatformIcon"
          class="text-primary-lighter fa-2x"
        />
        <div
          class="font-w600 mt-3 text-uppercase text-white"
          v-text="platform"
        />
      </div>
    </div>
  </a>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'vue-property-decorator'

@Component
export default class TileSocial extends Vue {
  // Prop
  @Prop() platform!: string
  @Prop() username!: string

  // computed
  get getPlatformLink() {
    switch (this.platform) {
      case 'steemit': {
        return 'https://steemit.com/@' + this.username
      }
      case 'twitter': {
        return 'https://twitter.com/' + this.username
      }
      case 'facebook': {
        return 'https://facebook.com/' + this.username
      }
      case 'github': {
        return 'https://github.com/' + this.username
      }
      case 'telegram': {
        return 'https://t.me/' + this.username
      }
      case 'youtube': {
        return 'https://youtube.com/' + this.username
      }
      case 'reddit': {
        return 'https://reddit.com/u/' + this.username
      }
      case 'keybase': {
        return 'https://keybase.io/' + this.username
      }
      case 'wechat': {
        return 'weixin://contacts/profile/' + this.username
      }
      default: {
        return ''
      }
    }
  }

  get getPlatformIcon() {
    if (this.platform === 'wechat') return ['fab', 'weixin']
    else if (this.platform === 'steemit') return ['fas', 'external-link-alt']
    else return ['fab', this.platform]
  }

  // method

  // Lifecycle hooks
  created() {}
  mounted() {}
  updated() {}
  destroyed() {}
}
</script>

<style lang="scss" scoped></style>
