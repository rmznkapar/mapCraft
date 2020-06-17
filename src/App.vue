<template>
  <div id="app">
    <div id="land">
      <Map />
      <SideBar />
    </div>
  </div>
</template>

<script>
import SideBar from './components/SideBar.vue'
import Map from './components/Map.vue'
import { store } from './store/index.js'

export default {
  name: 'App',
  store,
  components: {
    SideBar,
    Map
  },
  created () {
    window.addEventListener('beforeunload', (e) => {
      e.preventDefault()
      e.returnValue = ''
      delete e.returnValue
    })
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}
#land{
  display: flex;
  height: 100%;
}
#sidebar{
  flex-grow: 3;
  max-width: 320px;
  box-shadow: -10px 0px 20px #e4e4e4;
  display: flex;
  flex-direction: column;
  padding: 0px 40px;
  overflow-y: auto;
}
#map-box{
  flex-grow: 9;
  position: relative;
}
</style>
