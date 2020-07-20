<template>
  <div class="singer" ref="singer">
    歌手
    <!-- <list-view @select="selectSinger" :data="singers" ref="list"></list-view> -->
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">

export default {

}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
</style>
