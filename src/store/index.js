import Vue from 'vue'
import Vuex from 'vuex'

import json from '../jsons/europe.json'
// import html2canvas from 'html2canvas'
// import Canvg, {
//   presets
// } from 'canvg'
// import domtoimage from 'dom-to-image'
// import * as fileSaver from 'file-saver'
import { ForeignHtmlRenderer } from '../ForeignHtmlRenderer.js'
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
    labels: [],
    firstSave: true
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
    async RENDER_MAP () {
      // const svg = document.getElementById('svg3157')
      // const dataUri = `data:image/svg+xml;base64,${window.btoa(svg)}`

      // const img = new Image()
      // img.src = dataUri
      // console.log(dataUri)
      // const canvas = document.createElement('canvas')
      // canvas.width = img.width
      // canvas.height = img.height

      // const canvasCtx = canvas.getContext('2d')
      // canvasCtx.drawImage(img, 0, 0, 1000, 1000)

      // window.alert(canvas.toDataURL('image/png'))

      // function dataURLtoBlob (dataUrl) {
      //   var binary = atob(dataUrl.split(',')[1])

      //   var array = []
      //   for (var i = 0; i < binary.length; i++) {
      //     array.push(binary.charCodeAt(i))
      //   }

      //   return new Blob([new Uint8Array(array)], {
      //     type: 'image/png'
      //   })
      // }

      // function response (myBlob) {
      //   const img = new Image()
      //   img.src = myBlob
      //   var urlCreator = window.URL || window.webkitURL
      //   var imageUrl = urlCreator.createObjectURL(myBlob)
      //   document.querySelector('#image').src = imageUrl
      // }

      // response(dataURLtoBlob(dataUri))
      const svg = document.getElementById('svg3157').outerHTML
      console.log(svg)
      const renderer = new ForeignHtmlRenderer(document.styleSheets)
      renderer
        .renderToBase64Png(svg,
          4600,
          3200)
        .then((base64png) => {
          var link = document.createElement('a')
          link.download = 'map-craft.png'
          link.href = base64png
          link.click()
          // document.getElementById('image-box').innerHTML = `<img src="${base64png}" />`
        })

      // domtoimage.toBlob(document.getElementById('europe'))
      //   .then(function (dataUrl) {
      //     // window.alert(dataUrl)
      //     // var img = new Image()
      //     // img.src = dataUrl
      //     // document.body.appendChild(img)

      //     var link = document.createElement('a')
      //     link.download = 'map-craft.png'
      //     link.href = dataUrl
      //     link.click()
      //   })
      //   .catch(function (error) {
      //     console.error('oops, something went wrong!', error)
      //   })

      // const svger = document.getElementById('svg3157').outerHTML
      // const canvas = new OffscreenCanvas(4600, 3200)
      // const ctx = canvas.getContext('2d')
      // const v = await Canvg.from(ctx, svger, presets.offscreen())
      // // Render only first frame, ignoring animations and mouse.
      // await v.render()

      // var DOMURL = window.URL || window.webkitURL || window

      // var svg = new Blob([svger], { type: 'image/svg+xml' })
      // var url = DOMURL.createObjectURL(svg)
      // window.alert(url)
      // var img = new Image()

      // img.onload = function () {
      //   ctx.drawImage(img, 0, 0)
      //   DOMURL.revokeObjectURL(url)
      // }
      // img.src = url

      // window.open(url, '_blank').focus()
      // document.body.appendChild(img)
      // const blob = await canvas.convertToBlob()
      // const pngUrl = URL.createObjectURL(blob)

      // var win = window.open(pngUrl, '_blank')
      // win.focus()

      // self.postMessage({
      //   pngUrl
      // })
    }
  },
  modules: {
  }
})
