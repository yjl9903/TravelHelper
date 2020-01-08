<template>
  <v-bottom-sheet v-model="show" hide-overlay>
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" v-if="!hideBtn">
        {{ btnText || '选择地点' }}
      </v-btn>
    </template>
    <v-sheet>
      <v-container>
        <div class="title text-center mb-2">{{ btnText || '选择地点' }}</div>
        <div class="amap-container">
          <el-amap-search-box
            class="search-box"
            :search-option="searchOption"
            :on-search-result="onSearchResult"
          ></el-amap-search-box>
          <el-amap
            class="amap-el"
            vid="amapDemo"
            :plugin="plugin"
            :events="events"
            :center="center"
            :zoom="16"
          >
            <el-amap-marker
              v-for="(marker, i) in markers"
              :key="i"
              :position="marker"
              :events="markerEvents"
            ></el-amap-marker>
          </el-amap>
        </div>
        <div class="mt-3" style="display: flex; justify-content: space-between">
          <v-chip v-if="selected">{{ selected | formatPos | maxLen }}</v-chip>
          <v-chip v-else>尚未选中地点</v-chip>
          <v-chip @click="submit" color="green" text-color="white">
            <v-avatar left>
              <v-icon>send</v-icon>
            </v-avatar>
            提交
          </v-chip>
        </div>
      </v-container>
    </v-sheet>
  </v-bottom-sheet>
</template>

<script>
export default {
  name: 'select-pos',
  props: {
    btnText: String,
    hideBtn: Boolean,
    notfirstLoc: Boolean
  },
  data: () => ({
    show: false,
    center: [118.857344, 32.022667],
    markers: [],
    searchOption: {},
    geocoder: null,
    selected: null
  }),
  computed: {
    plugin() {
      const that = this;
      return [
        {
          pName: 'Geolocation',
          extensions: 'all',
          events: {
            init(o) {
              if (!that.notfirstLoc) return;
              o.getCurrentPosition((status, result) => {
                if (result && result.position) {
                  that.center[0] = result.position.lng;
                  that.center[1] = result.position.lat;
                  that.onClick({
                    lnglat: {
                      lng: result.position.lng,
                      lat: result.position.lat
                    }
                  });
                }
              });
            }
          }
        },
        {
          pName: 'Geocoder',
          events: {
            init(o) {
              that.geocoder = o;
            }
          }
        }
      ];
    },
    events() {
      const that = this;
      return {
        click: that.onClick
      };
    },
    markerEvents() {
      const that = this;
      return {
        click: that.onClick
      };
    }
  },
  methods: {
    open(pos) {
      if (pos) {
        this.center = pos;
        setTimeout(() => {
          this.markers.splice(0);
          this.markers.push(pos);
          this.onClick({ lnglat: { lng: pos[0], lat: pos[1] } });
        }, 0);
      }
      this.markers.splice(0);
      this.selected = null;
      this.show = true;
    },
    onSearchResult(pois) {
      let latSum = 0;
      let lngSum = 0;
      if (pois.length > 0) {
        pois.forEach(poi => {
          let { lng, lat } = poi;
          lngSum += lng;
          latSum += lat;
          this.markers.push([poi.lng, poi.lat]);
        });
        const center = {
          lng: lngSum / pois.length,
          lat: latSum / pois.length
        };
        this.center = [center.lng, center.lat];
      }
    },
    onClick({ lnglat: { lng, lat } }) {
      if (!this.geocoder) return;
      this.geocoder.getAddress([lng, lat], (status, result) => {
        if (status === 'complete' && result.info === 'OK') {
          const {
            regeocode: { formattedAddress, addressComponent }
          } = result;
          this.selected = {
            addressComponent,
            formattedAddress,
            lnglat: [lng, lat]
          };
        }
      });
    },
    submit() {
      if (this.selected) {
        this.show = false;
        this.$emit('confirm', this.selected);
        this.selected = null;
      }
    }
  },
  filters: {
    maxLen(s, l = 20) {
      if (s.length > l) {
        s = s.substr(0, l) + '...';
      }
      return s;
    }
  }
};
</script>

<style>
#amapDemo {
  height: 400px;
}
.amap-el {
  height: 400px;
  margin-top: -45px;
}
.search-box {
  display: absolute;
  top: 20px;
  left: 20px;
}
.amap-container {
  display: relative;
  height: 400px !important;
}
</style>
