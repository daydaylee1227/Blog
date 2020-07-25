<template>
  <div class="singer" ref="singer">
    歌手
    <!-- <list-view @select="selectSinger" :data="singers" ref="list"></list-view> -->
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">

  import {getSingerList} from 'api/singer'
  import {ERR_OK} from 'api/config'
export default {

      data(){
        return {
            singers: []
        }
      },
      created(){
          this._getSingerList()
      },
      methods:{
        // 获取数据,调用对应api接口数据
        _getSingerList(){
            getSingerList().then((res) => {
              this.singers = res.list;
              console.log(res.data)
            })
        },
      }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
</style>
