<template>
  <div class="color-picker">
      <div class="swatches">
          <input type="text" v-model="copiedText" id="copiedText" class="no-display">
          <div class="last-colors" v-for="color in lastColors" :key="color.id">
              <span v-on:click="chooseColor(color)" class="swatch" v-bind:style="{backgroundColor: color}">
                  <span v-if="color === activeColor && color !== lastColors[0]" class="choosenOne"></span>
              </span>
          </div>
          <div v-for="color in colors" :key="color.id">
              <span v-on:click="chooseColor(color)" class="swatch" v-bind:style="{backgroundColor: color}">
                  <span v-if="color === activeColor" class="choosenOne"></span>
              </span>
          </div>
      </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'ColorPicker',
  data: function () {
    return {
      msg: 'Color Picker',
      colors: ['rgb(183, 28, 28)', 'rgb(211, 47, 47)', 'rgb(244, 67, 54)', 'rgb(229, 115, 115)', 'rgb(255, 205, 210)', 'rgb(136, 14, 79)', 'rgb(194, 24, 91)', 'rgb(233, 30, 99)', 'rgb(240, 98, 146)', 'rgb(248, 187, 208)', 'rgb(74, 20, 140)', 'rgb(123, 31, 162)', 'rgb(156, 39, 176)', 'rgb(186, 104, 200)', 'rgb(225, 190, 231)', 'rgb(49, 27, 146)', 'rgb(81, 45, 168)', 'rgb(103, 58, 183)', 'rgb(149, 117, 205)', 'rgb(209, 196, 233)', 'rgb(26, 35, 126)', 'rgb(48, 63, 159)', 'rgb(63, 81, 181)', 'rgb(121, 134, 203)', 'rgb(197, 202, 233)', 'rgb(13, 71, 161)', 'rgb(25, 118, 210)', 'rgb(33, 150, 243)', 'rgb(100, 181, 246)', 'rgb(187, 222, 251)', 'rgb(1, 87, 155)', 'rgb(2, 136, 209)', 'rgb(3, 169, 244)', 'rgb(79, 195, 247)', 'rgb(179, 229, 252)', 'rgb(0, 96, 100)', 'rgb(0, 151, 167)', 'rgb(0, 188, 212)', 'rgb(77, 208, 225)', 'rgb(178, 235, 242)', 'rgb(0, 77, 64)', 'rgb(0, 121, 107)', 'rgb(0, 150, 136)', 'rgb(77, 182, 172)', 'rgb(178, 223, 219)', 'rgb(25, 77, 51)', 'rgb(56, 142, 60)', 'rgb(76, 175, 80)', 'rgb(129, 199, 132)', 'rgb(200, 230, 201)', 'rgb(51, 105, 30)', 'rgb(104, 159, 56)', 'rgb(139, 195, 74)', 'rgb(174, 213, 129)', 'rgb(220, 237, 200)', 'rgb(130, 119, 23)', 'rgb(175, 180, 43)', 'rgb(205, 220, 57)', 'rgb(220, 231, 117)', 'rgb(240, 244, 195)', 'rgb(245, 127, 23)', 'rgb(251, 192, 45)', 'rgb(255, 235, 59)', 'rgb(255, 241, 118)', 'rgb(255, 249, 196)', 'rgb(255, 111, 0)', 'rgb(255, 160, 0)', 'rgb(255, 193, 7)', 'rgb(255, 213, 79)', 'rgb(255, 236, 179)', 'rgb(230, 81, 0)', 'rgb(245, 124, 0)', 'rgb(255, 152, 0)', 'rgb(255, 183, 77)', 'rgb(255, 224, 178)', 'rgb(191, 54, 12)', 'rgb(230, 74, 25)', 'rgb(255, 87, 34)', 'rgb(255, 138, 101)', 'rgb(255, 204, 188)', 'rgb(62, 39, 35)', 'rgb(93, 64, 55)', 'rgb(121, 85, 72)', 'rgb(161, 136, 127)', 'rgb(215, 204, 200)', 'rgb(38, 50, 56)', 'rgb(69, 90, 100)', 'rgb(96, 125, 139)', 'rgb(144, 164, 174)', 'rgb(207, 216, 220)', 'rgb(0, 0, 0)', 'rgb(82, 82, 82)', 'rgb(150, 150, 150)', 'rgb(217, 217, 217)', 'rgb(255, 255, 255)'],
      lastColors: ['rgb(255, 255, 255)', 'rgb(255, 255, 255)', 'rgb(255, 255, 255)', 'rgb(255, 255, 255)', 'rgb(255, 255, 255)', 'rgb(255, 255, 255)', 'rgb(255, 255, 255)', 'rgb(255, 255, 255)', 'rgb(255, 255, 255)', 'rgb(255, 255, 255)'],
      activeColor: '',
      isCopied: false,
      copiedText: ''
    }
  },
  methods: {
    ...mapMutations(['CHOOSE_COLOR']),
    chooseColor: function (color) {
      if (this.isCopied) {
        this.copiedText = color
        document.getElementById('copiedText').value = color
        document.getElementById('copiedText').select()
        document.execCommand('copy')
      }
      this.CHOOSE_COLOR(color)
      this.activeColor = color

      const existLastColor = this.lastColors.indexOf(color)

      this.lastColors.splice(existLastColor, 1)
      this.lastColors.push('rgb(255, 255, 255)')
      this.lastColors.unshift(color)
      this.lastColors.splice(this.lastColors.length - 1, 1)
    }
  },
  created: function () {
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Control' && !this.isCopied) {
        this.isCopied = true
      }
    })
    window.addEventListener('keyup', (e) => {
      if (e.key === 'Control' && this.isCopied) {
        this.isCopied = false
      }
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.swatches{
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    justify-content: center;
    height: 150px;
    overflow-y: scroll;
}
.swatch{
    position: relative;
    display: block;
    width: 22px;
    height: 22px;
    border-radius: 33%;
    margin: 3px;
    cursor: pointer;
    box-shadow: 0px 0px 4px #00000045;
    transition: all .2s ease-in-out;
}
.swatch:hover{
    transform: scale(1.15);
    box-shadow: 0px 0px 9px #0000002f;
}
.color-picker{
    display: flex;
    flex-direction: column;
}
.choosenOne{
    position: absolute;
    background-color: white;
    width: 14px;
    height: 14px;
    left: 4px;
    top: 4px;
    border-radius: 33%;
    box-shadow: inset 0px 0px 5px 0px #00000012;
    transition: all .2s ease-in-out;
}
.last-colors{
    border-bottom: 1px solid #51515196;
    margin-bottom: 5px;
    padding-bottom: 5px;
}
.no-display{
  position: absolute;
  top: -50px;
}
</style>
