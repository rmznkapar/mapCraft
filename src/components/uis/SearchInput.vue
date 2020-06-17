<template>
  <div class="input-box">
    <span>Search Country: </span>
    <div class="inputer bar-item">
      <input v-model="input" v-on:keyup.enter="clickIn(guessList[0].code)" type="text">
      <ul v-show="guessList.length > 0">
          <li
            v-for="item in guessList"
            :key="item.id"
            v-on:click="clickIn(item.code)">
            {{ item.name }}
          </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import json from '../../jsons/europe.json'
export default {
  name: 'SearchInput',
  data: function () {
    return {
      input: '',
      guessList: [],
      matchList: json
    }
  },
  methods: {
    ...mapMutations(['CHOOSE_COUNTRY']),
    searchIn: function (val) {
      const guessList = []
      for (let i = 0; i < this.matchList.length; i++) {
        const item = this.matchList[i]
        if (val === item.name.substring(0, val.length)) {
          guessList.push(this.matchList[i])
        }
      }
      this.guessList = guessList
    },
    clickIn: function (val) {
      this.input = ''
      this.guessList = []
      this.CHOOSE_COUNTRY(val)
    }
  },
  watch: {
    input: function (val, oldValue) {
      if (typeof val !== 'string') {
        return false
      }
      val = val.toLowerCase()
      val = val.charAt(0).toUpperCase() + val.slice(1)
      if (val.length > 0) {
        this.searchIn(val)
      } else {
        this.guessList = []
      }
    }
  }
}
</script>

<style scoped>
.inputer{
  position: relative;
  display: inline-block;
}
.inputer ul{
  display: flex;
  text-align: left;
  background: white;
  flex-wrap: wrap;
  flex-direction: column;
  margin: 0 auto;
  box-shadow: 4px 7px 20px 0px #00000012;
  padding: 10px 0px;
  position: absolute;
  border: 1px solid #00000026;

}

.inputer ul li{
  padding: 5px 5px;
  cursor: pointer;
  margin: 0px;
  transition: ease-in .5;
}
.inputer ul li:hover{
  background-color: #e9e9e9;
}
</style>
