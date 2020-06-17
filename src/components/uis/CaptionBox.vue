<template>
  <div id="caption-box">
    <p class="title">{{ texts.title }}</p>
    <p class="desc">{{ texts.desc }}</p>
    <ul id="label-box" class="label-box">
      <li class="label" v-for="label in labels" :key="label.id">
        <div class="colorBox" :style="{backgroundColor: label.color}"></div>
        <span class="label-text">{{ label.text }}</span>
      </li>
    </ul>
        <!-- <ul class="label-box">
        <li class="label">Item 1</li>
        <li class="label">Item 2</li>
        <li class="label">Item 3</li>
        <li class="label">Item 4
           <ul>
                <li class="label">Sub Item 1</li>
                <li class="label">Sub Item 2</li>
                <li class="label">Sub Item 3</li>
                <li class="label">Sub Item 4</li>
           </ul>
        </li>
    </ul> -->
  </div>
</template>

<script>

export default {
  name: 'CaptionBox',
  props: ['texts', 'labels'],
  data: function () {
    return {

    }
  },
  methods: {
  }
}
</script>

<style scoped>
#caption-box{
  position: absolute;
  top: 20px;
  right: 125px;
  background: #ffffffcf;
  padding: 10px 22.5px;
  box-shadow: 2px 2px 15px #00000021;
  border-radius: 5px;
  max-width: 165px;
  /* border: 1px solid #7a7a7a; */
}
.title{
  font-weight: bold;
}
.desc{
  font-weight: 400;
  margin-top: 5px;
}
.colorBox{
  display: inline-block;
  flex: 0 0 auto;
  width: 20px;
  height: 20px;
}
.label{
  /* float: left; */
  display: flex;
  margin: 0px 2px;
  padding: 5px 0px;
}
.label-text{
  margin-left: 5px;
  margin-top: 1.25px;
  font-size: 15px;
  display: block;
  max-width: 135px;
  flex: 30 5 auto;
  text-align: left;
}
</style>
