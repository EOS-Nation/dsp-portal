<template>
  <div class="mb-0">
    <l-map
      style="height: 300px; margin-bottom: 1rem;"
      :zoom="zoom"
      :center="location"
      :options="{ scrollWheelZoom: false }"
    >
      <l-tile-layer :url="url" />
      <l-marker :lat-lng="location" />
    </l-map>
  </div>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'vue-property-decorator'
import L from 'leaflet'
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet'

@Component({
  components: {
    LMap,
    LTileLayer,
    LMarker
  }
})
export default class TileMap extends Vue {
  // props
  @Prop() long: number | undefined
  @Prop() lat: number | undefined
  url = 'https://{s}.tile.osm.org/{z}/{x}/{y}.png'
  zoom = 5

  get location() {
    if (this.long && this.lat) return L.latLng(this.lat, this.long)
    else return L.latLng(0, 0)
  }
}
</script>
