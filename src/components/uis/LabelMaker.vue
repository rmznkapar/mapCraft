<template>
    <div>
        <p>Labels</p>
        <div class="label-item">
            <input v-model="nowColor" v-on:change="takeColor(nowColor)" type="color"> <input v-on:keyup.enter="addLabel()" v-model="nowText" type="text"> <input class="labelButton" v-on:click="addLabel()" type="button" value="Add">
        </div>
        <ul>
            <li class="label-item" v-for="(label, index) in labels" :key="label.id">
                <input type="color" v-model="label.color" v-on:change="changeLabelColors(index, label.color)" v-on:click="takeColor(label.color)" >
                <input type="text" v-model="label.text">
                <button class="labelButton" v-on:click="deleteLabel(label)">X</button>
            </li>
        </ul>
    </div>
</template>

<script>

import { mapMutations, mapGetters } from 'vuex'

export default {
  name: 'LabelMaker',
  props: ['labels'],
  data () {
    return {
      nowColor: 'rgb(0, 0, 0)',
      nowText: ''
    }
  },
  computed: {
    ...mapGetters(['nowLabelColor', 'coloredCountry', 'countryList', 'mapColors'])
  },
  methods: {
    ...mapMutations(['CHOOSE_COLOR', 'CHOOSE_LABELCOLOR']),
    addLabel: function () {
      const rgb2hex = c => '#' + c.match(/\d+/g).map(x => (+x).toString(16).padStart(2, 0)).join``
      const labeling = {
        color: this.nowColor,
        text: this.nowText,
        countries: []
      }
      for (const item of this.coloredCountry) {
        if (rgb2hex(item.color) === labeling.color) {
          labeling.countries.push(item.id)
        }
      }
      this.labels.push(labeling)
      this.nowText = ''
    },
    takeColor: function (color) {
      const hex2rgb = c => `rgb(${c.substr(1).match(/../g).map(x => +`0x${x}`)})`
      this.CHOOSE_COLOR(hex2rgb(color))
    },
    deleteLabel: function (label) {
      const index = this.labels.indexOf(label)
      for (const contry of this.labels[index].countries) {
        document.getElementById(contry).style.fill = this.mapColors.normal
      }
      if (index >= 0) {
        this.labels.splice(index, 1)
      }
    },
    changeLabelColors: function (id, color) {
      for (const contry of this.labels[id].countries) {
        document.getElementById(contry).style.fill = color
      }
    }
  },
  watch: {
    nowLabelColor: function () {
      this.nowColor = this.nowLabelColor
    }
  }
}
</script>

<style scoped>

.label-item input[type="text"]{
  height: 20px;
  border-radius: 5px;
  margin: 0px 8px;
  box-shadow: none;
  border: 1px solid #ced6e0;
  transition: all 0.3s ease-in-out;
  font-size: 15px;
  padding: 5px 10px;
  background: none;
  color: #1a3b5d;
}
.label-item input[type="text"]:hover{
  border-color: #3d9cff;
}
.label-item input[type="text"]:focus{
  box-shadow: 0px 10px 20px -13px rgba(32, 56, 117, 0.35);
  outline: none;
}
.label-item input[type="color"] {
  -webkit-appearance: none;
  border: none;
  box-shadow: 0px 0px 20px 0px #00000012;
  width: 25px;
  height: 25px;
  background: #dddddd;
}
.label-item input[type="color"]:focus{
  outline: none;
}

.labelButton{
  margin-top: 5px;
  background: #2364d2;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 500;
  padding: 5px 10px;
  font-family: "Source Sans Pro", sans-serif;
  box-shadow: 3px 10px 20px 0px rgba(35, 100, 210, 0.21);
  color: #fff;
  cursor: pointer;

}
</style>
