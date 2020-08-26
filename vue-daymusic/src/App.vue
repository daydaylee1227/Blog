<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <keep-alive>  
      <!-- 缓存组件,好处在于避免了组件的重新的渲染 -->
    <router-view></router-view>
    </keep-alive>
    <player></player>
  </div>
</template>

<script>


import MHeader from 'components/m-header/m-header'
import Tab from 'components/tab/tab'
import Player from 'components/player/player'
export default {
  components: {
    MHeader,
    Tab,
    Player
  }
}
</script>

<style scpoed lang='stylus' rel="stylesheet/stylus">
  @import '~common/stylus/variable.styl';

  #app
    color:$color-theme
</style>
