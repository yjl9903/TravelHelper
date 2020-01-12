<template>
  <v-bottom-sheet v-model="show" hide-overlay>
    <v-sheet>
      <v-container>
        <div
          class="title text-center mb-2 d-flex align-center justify-center"
          style="position: relative"
        >
          <span>导航</span>
          <v-btn small class="ml-2" color="success" @click="searchNav"
            >查询</v-btn
          >
          <v-btn icon class="close-btn" @click="show = false">
            <v-icon>close</v-icon>
          </v-btn>
        </div>
        <div class="amap-container">
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
        <!-- <div class="mt-3" style="display: flex; justify-content: space-between">
          <v-chip v-if="selected">{{ selected | formatPos | maxLen }}</v-chip>
          <v-chip v-else>尚未选中地点</v-chip>
        </div> -->
      </v-container>
    </v-sheet>
  </v-bottom-sheet>
</template>

<script>
export default {
  name: 'show-pos',
  data: () => ({
    show: false,
    center: [118.857344, 32.022667],
    markers: [],
    searchOption: {},
    geocoder: null,
    selected: null,
    transfer: null,
    destination: null,
    nowlnglat: null,
    amap: null
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
              o.getCurrentPosition((status, result) => {
                if (result && result.position) {
                  that.nowlnglat = [result.position.lng, result.position.lat];
                  that.markers.push([result.position.lng, result.position.lat]);
                }
                if (result && result.position && that.destination) {
                  that.center[0] =
                    (result.position.lng + that.destination.lnglat[0]) / 2.0;
                  that.center[1] =
                    (result.position.lat + that.destination.lnglat[1]) / 2.0;
                }
              });
            }
          }
        },
        {
          pName: 'Geocoder',
          city: '南京',
          events: {
            init(o) {
              that.geocoder = o;
            }
          }
        },
        {
          pName: 'Transfer',
          events: {
            init(o) {
              that.transfer = o;
            }
          }
        }
      ];
    },
    events() {
      const that = this;
      return {
        click: that.onClick,
        init(o) {
          that.amap = o;
        }
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
      this.center = [118.857344, 32.022667];
      this.nowlnglat = null;
      this.markers.splice(0);
      if (pos) {
        this.destination = pos;
        this.center[0] = pos.lnglat[0];
        this.center[1] = pos.lnglat[1];
        setTimeout(() => {
          this.markers.push(this.center);
        }, 0);
      }
      this.markers.splice(0);
      this.selected = null;
      this.show = true;
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
    searchNav() {
      if (!this.transfer) return;
      if (!this.destination) return;
      if (!this.nowlnglat) return;
      this.transfer.setCity(this.destination.addressComponent.city);
      const st = this.nowlnglat;
      const ed = this.destination.lnglat;
      this.transfer.search(st, ed, (status, result) => {
        this.transfer.searchOnAMAP({
          origin: result.origin,
          destination: result.destination
        });
      });
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

<style scoped>
#amapDemo {
  height: 400px;
}
.amap-el {
  height: 400px;
}
.amap-container {
  position: relative;
  height: 400px !important;
}
.close-btn {
  position: absolute;
  right: 0px;
  top: 0px;
}
</style>
