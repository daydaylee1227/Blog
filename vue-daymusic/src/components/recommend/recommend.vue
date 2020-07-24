<template>
  <div class="recommend" ref="recommend">
    <!-- 传递一个data给scroll组件,组件收到数据的变化,就会去更新refresh -->
    <scroll ref="scroll" class="recommend-content" :data="discList">
      <div>
        <div v-if="recommends.length" class="slider-wrapper" ref="sliderWrapper">
          <slider>
            <div v-for="item in recommends" :key="item.id">
              <a :href="item.linkUrl">
                <!-- 监听load事件的原因就是保证scroll组件可以正确计算高度,这样子保证能滑到最低步 -->
                <img class="needsclick"  :src="item.picUrl" @load="loadImage">
                <!-- class='needclick' 监听这个dom,这样子默认就不会阻止点击点击事件 -->
              </a>
            </div>
          </slider>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li @click="selectItem(item)" v-for="(item, index) in discList" class="item" :key="index">
              <div class="icon">
                <img width="60" height="60" v-lazy="item.imgurl">
              </div>
              <div class="text">
                <h2 class="name" v-html="item.creator.name"></h2>
                <p class="desc" v-html="item.dissname"></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- <div class="loading-container" v-show="!discList.length">
        <loading></loading>
      </div> -->
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'base/scroll/scroll'
  import Slider from 'base/slider/slider'
  import {getRecommend, getDiscList} from 'api/recommend'
  import {ERR_OK} from 'api/config'
export default {
  name: 'recommend',
  data(){
    return {
      recommends : [],
      discList : [],
    }
  },
  created(){
    this._getRecommend();
    this._getDiscList();
    
  },
  mounted(){
    var that = this;
    console.log(this)
    window.addEventListener('resize',() => { 
        
        if(!this.$refs.scroll) return 
        this.$refs.scroll.refresh()
        // 页面的视口发生变化的话,重新去计算better-scroll
    })
  },
  methods:{
    //获取轮播图的数据
    _getRecommend(){
      getRecommend().then((res)=>{
          if(res.code === ERR_OK){
            this.recommends = res.data.slider
          }
      })
    },
    selectItem(item){

    },
    // 获取热门歌单的数据
    _getDiscList() {
        getDiscList().then((res) => {
          if (res.code === ERR_OK) {
            this.discList = res.data.list
          }
        },(err) => {
          // console.log(1232)
        })
    },
    // 给IMG绑定一个事件
    loadImage(){
      // 判断图片是否加载完毕,加载完毕的话,获取scroll组件,重新去refresh,重新计算宽高
      if(!this.loadImag){
        this.loadImag = true
        // console.log(this.$refs.scroll)
        this.$refs.scroll.refresh();
      }
    }
  },
  components : {
    Slider,
    Scroll,
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>