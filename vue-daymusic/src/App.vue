<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <router-view></router-view>
  </div>
</template>

<script>


import MHeader from 'components/m-header/m-header'
import Tab from 'components/tab/tab'
export default {
  components: {
    MHeader,
    Tab
  }
}
</script>

<style scpoed lang='stylus' rel="stylesheet/stylus">
  @import '~common/stylus/variable.styl';

  #app
    color:$color-theme
</style>
