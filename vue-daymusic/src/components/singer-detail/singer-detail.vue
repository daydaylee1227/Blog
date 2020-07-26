<template>
  <transition name="slide">
    
    <div style="" class="xt">
      1232
    </div>
    <!-- <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list> -->
  </transition>
</template>

<script type="text/ecmascript-6">
  // import MusicList from 'components/music-list/music-list'
  // import {getSingerDetail} from 'api/singer'
  // import {ERR_OK} from 'api/config'
  // import {createSong} from 'common/js/song'
  import {mapGetters} from 'vuex'

  export default {
    computed: {
      // title() {
      //   return this.singer.name
      // },
      // bgImage() {
      //   return this.singer.avatar
      // },
      ...mapGetters([
        'singer'
        // 这个时候就是类似于直接拿到数据，this.singer就存在这个数据了
      ])
    },
    data() {
      return {
        songs: []
      }
    },
    created() {
      // this._getDetail()
      // console.log(this.singer)
    },
    methods: {
      // _getDetail() {
      //   if (!this.singer.id) {
      //     this.$router.push('/singer')
      //     return
      //   }
      //   getSingerDetail(this.singer.id).then((res) => {
      //     if (res.code === ERR_OK) {
      //       this.songs = this._normalizeSongs(res.data.list)
      //     }
      //   })
      // },
      // _normalizeSongs(list) {
      //   let ret = []
      //   list.forEach((item) => {
      //     let {musicData} = item
      //     if (musicData.songid && musicData.albummid) {
      //       ret.push(createSong(musicData))
      //     }
      //   })
      //   return ret
      // }
    },
    components: {
      // MusicList
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
  .xt
    position:fixed
    top: 0
    left:0
    right:0
    bottom:0
    z-index :100
    background :red

</style>