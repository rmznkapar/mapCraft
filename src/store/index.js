import Vue from 'vue'
import Vuex from 'vuex'

import json from '../jsons/europe.json'
import html2canvas from 'html2canvas'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    activeColor: 'rgb(0, 0, 0)',
    choosenCountry: '',
    mapColors: {
      normal: '#c0c0c0',
      stroke: '#ffffff',
      background: '#ffffff',
      strokeWidth: 0.400821
    },
    texts: {
      title: 'Some Title In Here',
      desc: ''
    },
    countryList: json,
    nowLabelColor: 'rgb(255, 255, 255)',
    coloredCountry: [],
    labels: []
  },
  getters: {
    activeColor: state => {
      return state.activeColor
    },
    choosenCountry: state => {
      return state.choosenCountry
    },
    mapColors: state => {
      return state.mapColors
    },
    texts: state => {
      return state.texts
    },
    nowLabelColor: state => {
      return state.nowLabelColor
    },
    countryList: state => {
      return state.countryList
    },
    coloredCountry: state => {
      return state.coloredCountry
    },
    labels: state => {
      return state.labels
    }
  },
  mutations: {
    CHOOSE_COLOR (state, color) {
      state.activeColor = color
      const rgb2hex = c => '#' + c.match(/\d+/g).map(x => (+x).toString(16).padStart(2, 0)).join``
      state.nowLabelColor = rgb2hex(color)
    },
    CHOOSE_MAPCOLORS (state, color) {
      state.mapColors.normal = color.normal
      state.mapColors.background = color.background
      state.mapColors.stroke = color.stroke
      state.mapColors.strokeWidth = Math.abs((color.strokeWidth / 10))
    },
    CHOOSE_COUNTRY (state, country) {
      state.choosenCountry = country
    },
    CHOOSE_TEXTS (state, text) {
      state.texts.title = text.title
      state.texts.desc = text.desc
    },
    CHOOSE_LABELS (state, labels) {
      state.labels = labels
    },
    CHOOSE_LABELCOLOR (state, color) {
      state.nowLabelColor = color
    }
  },
  actions: {
    RENDER_MAP () {
      const mapBox = document.getElementById('map-box')
      const scaler = document.getElementById('svg3157').getBoundingClientRect()
      // const svgMap = document.getElementById('svg3157')
      console.log(scaler)
      html2canvas(mapBox, { width: scaler.width, height: scaler.height, x: scaler.x }).then(function (canvas) {
        var ctx = canvas.getContext('2d')
        ctx.font = '17px Arial'
        ctx.fillText('mapcraft.netlify.app', scaler.x + 20, 20)
        var dataURL = canvas.toDataURL('image/jpeg', 1.0)
        var a = document.createElement('a')
        a.href = dataURL
        a.setAttribute('download', 'mapCraftEurope.png')
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        document.body.appendChild(canvas)
      })
    }
  },
  modules: {
  }
})
