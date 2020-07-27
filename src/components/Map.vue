<template>
  <div @mousemove="hoverCountry($event)" id="map-box">
    <canvas width="4600" height="3200" id="canvas"></canvas>
    <Europe
    v-if="choosenMap === 'Europe'"
      v-bind:texts="texts"
      v-bind:labels="labels"
      v-on:click.native="clickCountry($event)"
    />
        <World
        v-if="choosenMap === 'World'"
      v-bind:texts="texts"
      v-bind:labels="labels"
      v-on:click.native="clickCountry($event)"
    />
    <div>{{ hoverCountryId }}</div>
    <div id="image-box"></div>
  </div>
</template>

<script>
import Europe from './maps/Europe.vue'
import World from './maps/World.vue'

import { mapGetters, mapState, mapMutations } from 'vuex'

export default {
  name: 'Map',
  components: {
    Europe,
    World
    // CaptionBox
  },
  computed: {
    ...mapGetters([
      'activeColor',
      'mapColors',
      'choosenCountry',
      'texts',
      'labels',
      'coloredCountry',
      'countryList',
      'choosenMap'
    ]),
    ...mapState(['activeColor', 'countryList'])
  },
  data: function () {
    return {
      country: '',
      mapLayerId: 'layer1',
      mapId: 'svg3157',
      oldVals: {
        stroke: '#ffffff',
        normal: '#c0c0c0',
        background: '#ffffff',
        strokeWidth: 0.5
      },
      hoverCountryId: '',
      isCtrl: false,
      isShift: false
    }
  },
  methods: {
    ...mapMutations(['CHOOSE_COLOR']),
    changeColor: function () {
      const rgb2hex = c =>
        '#' + c.match(/\d+/g).map(x => (+x).toString(16).padStart(2, 0)).join``
      if (this.country !== '') {
        const ctrList = this.coloredCountry.filter(
          ctr => ctr.id === this.country
        )

        if (this.isShift) {
          const indexCtr = this.coloredCountry.indexOf(ctrList[0])
          this.coloredCountry.splice(indexCtr, 1)
          document.getElementById(
            this.country
          ).style.fill = this.mapColors.normal
          for (let i = 0; i < this.countryList.length; i++) {
            const ctr = this.countryList[i]
            if (ctr.code === this.country) {
              this.countryList[i].color = ''
            }
          }
          for (let i = 0; i < this.labels.length; i++) {
            const label = this.labels[i]
            for (let j = 0; j < label.countries.length; j++) {
              const country = label.countries[j]
              if (country === this.country) {
                this.labels[i].countries.splice(j, 1)
              }
            }
          }
        } else if (this.isCtrl) {
          this.CHOOSE_COLOR(document.getElementById(this.country).style.fill)
        } else {
          if (ctrList.length > 0) {
            const indexCtr = this.coloredCountry.indexOf(ctrList[0])
            this.coloredCountry.splice(indexCtr, 1)
          }
          this.coloredCountry.push({
            id: this.country,
            color: this.activeColor
          })

          for (let i = 0; i < this.labels.length; i++) {
            const label = this.labels[i]
            for (let j = 0; j < label.countries.length; j++) {
              const country = label.countries[j]
              if (country === this.country) {
                this.labels[i].countries.splice(j, 1)
              }
            }
            if (rgb2hex(this.activeColor) === label.color) {
              this.labels[i].countries.push(this.country)
            }
          }
          for (let i = 0; i < this.countryList.length; i++) {
            const ctr = this.countryList[i]
            if (ctr.code === this.country) {
              this.countryList[i].color = rgb2hex(this.activeColor)
            }
          }
          document.getElementById(this.country).style.fill = this.activeColor
        }
      }
    },
    clickCountry: function (event) {
      this.country = event.path[0].id
      if (this.country.substring(0, 4) === 'path') {
        this.country = event.path[0].parentNode.id
      }
      if (this.country === 'background') {
        return
      }
      this.changeColor()
    },
    hoverCountry: function (event) {
      if (
        event.path[0].id.length === 2 &&
        this.hoverCountryId !== event.path[0].id
      ) {
        // if kaldirlicak europe svg tamamlaninca
        this.hoverCountryId = this.countryList.filter(
          ctr => ctr.code === event.path[0].id
        )
        if (this.hoverCountryId.length > 0) {
          this.hoverCountryId = this.hoverCountryId[0].name
        }
      }
    },
    saveMap: function () {
      const ctx = document.getElementById('canvas').getContext('2d')
      const mapSvg = document.getElementById('europe').firstChild
      const img = new Image()
      const xml = new XMLSerializer().serializeToString(mapSvg)

      img.onload = function () {
        ctx.imageSmoothingEnabled = false
        ctx.drawImage(img, 0, 0)
      }
      img.src = 'data:image/svg+xml;base64,' + btoa(xml)
    }
  },
  watch: {
    choosenCountry: function () {
      this.country = this.choosenCountry
      this.changeColor()
    },
    mapColors: {
      deep: true,
      handler: function () {
        let countries
        if (this.choosenMap === 'Europe') {
          countries = document
            .getElementById(this.mapLayerId).getElementsByTagName('path')
        } else {
          countries = document
            .getElementById(this.mapLayerId).children
        }

        // for (const [key, value] of Object.entries(countries)) {
        //   console.log(value)
        //   countries[key] = value
        // }
        // console.log(typeof countries)
        // countries = countries.map(country => {
        //   if (country.id.substring(0, 4) === 'path') {
        //     country = country.parentNode
        //   }
        //   return country
        // })

        document.getElementById(
          'background'
        ).style.fill = this.mapColors.background

        for (let i = 0; i < countries.length; i++) {
          const isColored = this.coloredCountry.filter(
            obj => obj.id === countries[i].id
          ).length
          if (this.mapColors.stroke !== this.oldVals.stroke) {
            countries[i].style.stroke = this.mapColors.stroke
          }
          if (countries[i].style.fill !== this.oldVals.normal && !isColored) {
            countries[i].style.fill = this.mapColors.normal
          }
          if (this.mapColors.strokeWidth !== this.oldVals.strokeWidth) {
            countries[i].style.strokeWidth = this.mapColors.strokeWidth
          }
        }
        this.oldVals = {
          stroke: this.mapColors.stroke,
          normal: this.mapColors.normal,
          background: this.mapColors.background,
          strokeWidth: this.mapColors.strokeWidth
        }
      }
    }
  },
  created: function () {
    window.addEventListener('keydown', e => {
      if (e.key === 'Control' && !this.isCtrl) {
        this.isCtrl = true
      }
      if (e.key === 'Shift' && !this.isShift) {
        this.isShift = true
      }
    })
    window.addEventListener('keyup', e => {
      if (e.key === 'Control' && this.isCtrl) {
        this.isCtrl = false
      }
      if (e.key === 'Shift' && this.isShift) {
        this.isShift = false
      }
    })
  }
}
</script>

<style scoped>
#canvas {
  display: none;
}
</style>
