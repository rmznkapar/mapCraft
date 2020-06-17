<template>
  <div id="sidebar">
    <h2>{{ title }}</h2>
    <ColorPicker />
    <SearchInput class="bar-item" />
    <div class="bar-item">
      <span>Stroke Color: </span> <input v-model="mapColors.stroke" type="color">
    </div>
    <div class="bar-item">
      <span>Stroke Width: </span> <input v-model="mapColors.strokeWidth" type="range" min="0" max="10">
    </div>
    <div class="bar-item">
      <span>Normal Color: </span> <input v-model="mapColors.normal" type="color">
    </div>
    <div class="bar-item">
      <span>Background Color: </span> <input v-model="mapColors.background" type="color">
    </div>
    <div class="bar-item">
      <span>Title Text: </span> <input v-model="texts.title" type="text">
    </div>
    <div class="bar-item">
      <span>Desc Text: </span> <input v-model="texts.desc" type="text">
    </div>
    <LabelMaker :labels="labels "/>
    <div class="bar-item flexing">
      <button id="save-map" v-on:click="RENDER_MAP()">Save The Map</button>
    </div>
  </div>
</template>

<script>
import ColorPicker from './uis/ColorPicker.vue'
import SearchInput from './uis/SearchInput.vue'
import LabelMaker from './uis/LabelMaker.vue'
import { mapGetters, mapState, mapMutations, mapActions } from 'vuex'

export default {
  name: 'SideBar',
  computed: {
    ...mapGetters(['activeColor', 'labels', 'texts']),
    ...mapState(['activeColor'])
  },
  components: {
    ColorPicker,
    SearchInput,
    LabelMaker
  },
  data: function () {
    return {
      title: 'MapCraft',
      mapColors: {
        stroke: '#ffffff',
        normal: '#c0c0c0',
        background: '#ffffff',
        strokeWidth: 5
      }
    }
  },
  methods: {
    ...mapMutations(['CHOOSE_MAPCOLORS', 'CHOOSE_TEXTS', 'CHOOSE_LABELS']),
    ...mapActions(['RENDER_MAP']),
    saveMap: function () {
      // const ctx = document.getElementById('canvas').getContext('2d')
      // const cptBox = document.getElementById('caption-box')
      // ctx.beginPath()
      // ctx.rect(20, 20, cptBox.offsetWidth * 4.5, cptBox.offsetHeight * 4.5)
      // ctx.stroke()
    }
  },
  watch: {
    mapColors: {
      deep: true,
      handler: function () { this.CHOOSE_MAPCOLORS(this.mapColors) }
    },
    texts: {
      deep: true,
      handler: function () { this.CHOOSE_TEXTS(this.texts) }
    },
    labels: {
      deep: true,
      handler: function () { this.CHOOSE_LABELS(this.labels) }
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.bar-item {
  text-align: left;
  padding: 9px 0px;
  font-family: "Source Sans Pro", sans-serif;
}
.flexing{
  display: flex;
}
.input-box{
  margin-top: 15px;
}
.bar-item input[type="text"]{
  width: 100%;
  height: 25px;
  border-radius: 5px;
  box-shadow: none;
  border: 1px solid #ced6e0;
  transition: all 0.3s ease-in-out;
  font-size: 15px;
  padding: 5px 15px;
  background: none;
  color: #1a3b5d;
}
.bar-item input[type="text"]:hover{
  border-color: #3d9cff;
}
.bar-item input[type="text"]:focus{
  box-shadow: 0px 10px 20px -13px rgba(32, 56, 117, 0.35);
  outline: none;
}
.bar-item input[type="color"] {
  -webkit-appearance: none;
  border: none;
  box-shadow: 0px 0px 20px 0px #00000012;
  width: 25px;
  height: 25px;
  background: #dddddd;
}
.bar-item input[type="color"]:focus{
  outline: none;
}
.bar-item span{
  display: inline-block;
  font-size: 14px;
  margin-bottom: 5px;
  font-weight: 500;
  color: #1a3b5d;
  user-select: none;
}
.bar-item input[type="range"]{
  width: 90%;
}
.bar-item button{
  width: 100%;
  height: 55px;
  background: #2364d2;
  border: none;
  border-radius: 5px;
  font-size: 22px;
  font-weight: 500;
  font-family: "Source Sans Pro", sans-serif;
  box-shadow: 3px 10px 20px 0px rgba(35, 100, 210, 0.3);
  color: #fff;
  margin-top: 20px;
  cursor: pointer;
}

#save-map{
  width: 60%;
  height: 45px;
  position: relative;
  font-size: 16px;
  margin: 0 auto;
  margin-bottom: 10px;
  margin-top: 10px;
}
</style>
