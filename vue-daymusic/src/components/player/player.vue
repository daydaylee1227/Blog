<template>
  <!-- 检测一下是否可行 playlist.length-->
  <div class="player" v-show="playlist.length>0">
    
    <!-- 绑定钩子函数 -->
    <transition name="normal"
                @enter="enter"
                @after-enter="afterEnter"
                @leave="leave"
                @after-leave="afterLeave"
    >
    <!-- 唱片的div部分, -->
    <div class="normal-player" v-show="fullScreen">
        <div class="background">
          <img width="100%" height="100%" :src="currentSong.image">
        </div>
        <div class="top">
          <div class="back" @click="back">
            <i class="icon-back"></i>
          </div>
          <h1 class="title" v-html="currentSong.name"></h1>
          <h2 class="subtitle" v-html="currentSong.singer"></h2>
        </div>

        <div class="middle"
        >
          <div class="middle-l" ref="middleL">
            <div class="cd-wrapper" ref="cdWrapper">
              <div class="cd" :class="cdCls">
                <img class="image" :src="currentSong.image">
              </div>
            </div>
            <div class="playing-lyric-wrapper">
              <div class="playing-lyric">{{playingLyric}}</div>
            </div>
          </div>

          <!-- <scroll class="middle-r" ref="lyricList" >
            <div class="lyric-wrapper">
              <div v-if="currentLyric">
                
              </div>
            </div>
          </scroll> -->
        </div>

        <!-- 下面控制按钮 -->

        <div class="bottom">
          <div class="dot-wrapper">
            <span class="dot" ></span>
            <span class="dot" ></span>
          </div>

          <!-- 进度条 -->
          <div class="progress-wrapper">

            <span class="time time-l">{{format(this.currentTime)}}</span>
            <div class="progress-bar-wrapper">
              <progress-bar :percent="percent" @percentChange="onProgressBarChange"></progress-bar>
            </div>
            <span class="time time-r">{{format(currentSong.duration)}}</span>
          </div>
          
          
          <!-- 五个操作符按钮 -->
          <div class="operators">
            <!-- 点击事件,每次换icon-loop icon-random icon-sequence -->
            <div class="icon i-left" @click="changeMode">
              <i  :class="iconMode"></i>
            </div>
            <div class="icon i-left" >
              <i  @click="prev" class="icon-prev"></i>
            </div>
            <!-- 播放涨停按钮 -->
            <div class="icon i-center" >
              <i  @click="togglePlaying" :class="playIcon"></i>
            </div>
            <div class="icon i-right" >
              <i  @click="next" class="icon-next"></i>
            </div>
            <div class="icon i-right">
              <!-- 这个是不喜欢的按钮 icon-favorite -->
              <i  class="icon icon-not-favorite" ></i>
            </div>
          </div>
        </div>
      </div>
    
    <!-- 这个就是小型的播放器 -->
    </transition>

    <!-- 设置name属性,完成动画效果 -->
    <transition name="mini">
    <div class="mini-player" v-show="!fullScreen" @click="open">
        <div class="icon">
          <img :class="cdCls" width="40" height="40" :src="currentSong.image">
        </div>
        <div class="text">
          <h2 class="name" v-html="currentSong.name"></h2>
          <p class="desc" v-html="currentSong.singer"></p>
        </div>
        <div class="control">
          <progress-circle :radius="radius" :percent="percent">
            <!-- 取消冒泡以及点击事件 -->
            <i @click.stop="togglePlaying" class="icon-mini" :class="miniIcon"></i>
          </progress-circle>
          
          
        </div>
        <div class="control" >
          <i class="icon-playlist"></i>
        </div>
      </div>
    
      
    
    </transition>
    <audio ref="audio" :src="currentSong.url" @play="ready" @error="error" 
           @ended="end"></audio>
    
    
    
    
    
    
    <!-- <transition name="normal"
                @enter="enter"
                @after-enter="afterEnter"
                @leave="leave"
                @after-leave="afterLeave"
    >
      <div class="normal-player" v-show="fullScreen">
        <div class="background">
          <img width="100%" height="100%" :src="currentSong.image">
        </div>
        <div class="top">
          <div class="back" @click="back">
            <i class="icon-back"></i>
          </div>
          <h1 class="title" v-html="currentSong.name"></h1>
          <h2 class="subtitle" v-html="currentSong.singer"></h2>
        </div>
        <div class="middle"
             @touchstart.prevent="middleTouchStart"
             @touchmove.prevent="middleTouchMove"
             @touchend="middleTouchEnd"
        >
          <div class="middle-l" ref="middleL">
            <div class="cd-wrapper" ref="cdWrapper">
              <div class="cd" :class="cdCls">
                <img class="image" :src="currentSong.image">
              </div>
            </div>
            <div class="playing-lyric-wrapper">
              <div class="playing-lyric">{{playingLyric}}</div>
            </div>
          </div>
          <scroll class="middle-r" ref="lyricList" :data="currentLyric && currentLyric.lines">
            <div class="lyric-wrapper">
              <div v-if="currentLyric">
                <p ref="lyricLine"
                   class="text"
                   :class="{'current': currentLineNum ===index}"
                   v-for="(line,index) in currentLyric.lines">{{line.txt}}</p>
              </div>
            </div>
          </scroll>
        </div>
        <div class="bottom">
          <div class="dot-wrapper">
            <span class="dot" :class="{'active':currentShow==='cd'}"></span>
            <span class="dot" :class="{'active':currentShow==='lyric'}"></span>
          </div>
          <div class="progress-wrapper">
            <span class="time time-l">{{format(currentTime)}}</span>
            <div class="progress-bar-wrapper">
              <progress-bar :percent="percent" @percentChange="onProgressBarChange"></progress-bar>
            </div>
            <span class="time time-r">{{format(currentSong.duration)}}</span>
          </div>
          <div class="operators">
            <div class="icon i-left" @click="changeMode">
              <i :class="iconMode"></i>
            </div>
            <div class="icon i-left" :class="disableCls">
              <i @click="prev" class="icon-prev"></i>
            </div>
            <div class="icon i-center" :class="disableCls">
              <i @click="togglePlaying" :class="playIcon"></i>
            </div>
            <div class="icon i-right" :class="disableCls">
              <i @click="next" class="icon-next"></i>
            </div>
            <div class="icon i-right">
              <i @click="toggleFavorite(currentSong)" class="icon" :class="getFavoriteIcon(currentSong)"></i>
            </div>
          </div>
        </div>
      </div>
    </transition> -->


    <!-- <transition name="mini">
      <div class="mini-player" v-show="!fullScreen" @click="open">
        <div class="icon">
          <img :class="cdCls" width="40" height="40" :src="currentSong.image">
        </div>
        <div class="text">
          <h2 class="name" v-html="currentSong.name"></h2>
          <p class="desc" v-html="currentSong.singer"></p>
        </div>
        <div class="control">
          <progress-circle :radius="radius" :percent="percent">
            <i @click.stop="togglePlaying" class="icon-mini" :class="miniIcon"></i>
          </progress-circle>
        </div>
        <div class="control" @click.stop="showPlaylist">
          <i class="icon-playlist"></i>
        </div>
      </div>
    </transition> -->

    <!-- <playlist ref="playlist"></playlist> -->
    
    <!-- <audio ref="audio" :src="currentSong.url" @play="ready" @error="error" @timeupdate="updateTime"
           @ended="end"></audio> -->
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters, mapMutations, mapActions} from 'vuex'
  // 第三方提供的js动画
  import animations from 'create-keyframe-animation'
  import {prefixStyle} from 'common/js/dom'
  import ProgressBar from 'base/progress-bar/progress-bar'
  import ProgressCircle from 'base/progress-circle/progress-circle'
  import {playMode} from 'common/js/config'
  import Lyric from 'lyric-parser'
  import Scroll from 'base/scroll/scroll'
  // import {playerMixin} from 'common/js/mixin'
  // import Playlist from 'components/playlist/playlist'
  import {shuffle} from 'common/js/util'
  const transform = prefixStyle('transform')
  const transitionDuration = prefixStyle('transitionDuration')

  export default {
    // mixins: [playerMixin],
    data() {
      return {
        songReady: false,
        currentTime: 0,
        radius: 32,
        currentLyric: null,
        currentLineNum: 0,
        currentShow: 'cd',
        playingLyric: ''
      }
    },
    computed: {
      cdCls() {
        return this.playing ? 'play' : 'play pause'
      },
      playIcon() {
        return this.playing ? 'icon-pause' : 'icon-play'
      },
      miniIcon() {
        return this.playing ? 'icon-pause-mini' : 'icon-play-mini'
      },
      disableCls() {
        return this.songReady ? '' : 'disable'
      },
      percent() {
        return this.currentTime / this.currentSong.duration
      },
      iconMode(){
        return this.mode === playMode.sequence ? 'icon-sequence' : this.mode === playMode.loop ? 'icon-loop' : 'icon-random'
      },
      ...mapGetters([
        'currentIndex',
        'fullScreen',
        'playing',
        'playlist',
        'currentSong',
        'mode',
        'sequenceList'
      ])
    },
    created() {
      this.touch = {}
    },
    methods:{
      back(){
         //放回上一步
        this.setFullScreen(false)
      },
      open(){
         // 点击小播放按钮,跳转到播放界面
        this.setFullScreen(true)
      },
      // 前一首
      prev(){
          if(this.mode === playMode.loop) {
            this.loop()
            return 
          }
          let index = this.currentIndex - 1
          if(index === -1) {
            index = this.playlist.length - 1
          }
          this.setCurrentIndex(index)

          if(!this.playing){
            this.togglePlaying()
          }
          // this.songReady = false
      },
      // 后一首
      next(){
          if(this.mode === playMode.loop){
            this.loop()
            return 
          }
          let index = this.currentIndex - 1
          if(index === this.playlist.length){
            index = 0
          }
          this.setCurrentIndex(index)
          if(!this.playing){
            this.togglePlaying()
          }
          // this.songReady = false
      },
      togglePlaying(){
        // if (!this.songReady) {
        //   return
        // }
        this.setPlayingState(!this.playing)
      },
      // enter afterEnter leave afterLeave 四个动画钩子函数
      enter(el, done) {
        // 获取到对于的初始化数据
        const {x, y, scale} = this._getPosAndScale()

        // 设置动画的配置信息
        let animation = {
          0: {
            transform: `translate3d(${x}px,${y}px,0) scale(${scale})`
          },
          60: {
            transform: `translate3d(0,0,0) scale(1.1)`
          },
          100: {
            transform: `translate3d(0,0,0) scale(1)`
          }
        }
        // 注册animate
        animations.registerAnimation({
          name: 'move',
          animation,
          presets: {
            // 动画时间
            duration: 400,
            easing: 'linear'
          }
        })

        // 运行animate

        animations.runAnimation(this.$refs.cdWrapper, 'move', done)

      },
      afterEnter() {
        // 消除move动画
        animations.unregisterAnimation('move')
        // 把样式都置为空
        this.$refs.cdWrapper.style.animation = ''
      },
      leave(el, done) {  // 需要的效果就是将 唱片平移到左小角
        this.$refs.cdWrapper.style.transition = 'all 0.4s'
        const {x, y, scale} = this._getPosAndScale()
        this.$refs.cdWrapper.style[transform] = `translate3d(${x}px,${y}px,0) scale(${scale})`
        this.$refs.cdWrapper.addEventListener('transitionend', done)
      },
      afterLeave() {
        // 清空样式 动画
        this.$refs.cdWrapper.style.transition = ''
        this.$refs.cdWrapper.style[transform] = ''
      },
      ready(){
        this.songReady = true
      },
      error(){

      },
      _pad(num, n = 2) {  // 格式化时间
        let len = num.toString().length
        while (len < n) {
          num = '0' + num
          len++
        }
        return num
      },
      format(interval) { // 事件格式化
        interval = interval | 0
        const minute = interval / 60 | 0
        const second = this._pad(interval % 60)
        return `${minute}:${second}`
      },
      onProgressBarChange(percent){
        const currentTime = this.currentSong.duration * percent
        this.$refs.audio.currentTime = currentTime
        if (!this.playing) {
          this.togglePlaying()
        }
      },
      changeMode(){
        const mode = ( this.mode + 1)%3
        this.setPlayMode(mode);
        let arr_random = null
        if(mode === playMode.random){
          arr_random = shuffle(this.sequenceList)
        }else{
          arr_random = this.sequenceList
        }
        // 确保这个歌曲播放模式修改以后,当前歌曲为改变index
        this.resetCurrentIndex(arr_random)

        this.setPlayList(arr_random)
      },
      resetCurrentIndex(list){
        // 当前歌曲为修改  保证
        let index = list.findIndex((item)=>{
          return item.id === this.currentSong.id
        })
        this.setCurrentIndex(index)
      },
      end() {
        if (this.mode === playMode.loop) {
          this.loop()
        } else {
          this.next()
        }
      },
      // 循环播放
      loop() {
        this.$refs.audio.currentTime = 0
        this.$refs.audio.play()
        this.setPlayingState(true)
        // if (this.currentLyric) {
        //   this.currentLyric.seek(0)
        // }
      },
      getLyric() {
        console.log(2)
        this.currentSong.getLyric().then((lyric) => {
          if (this.currentSong.lyric !== lyric) {
            return
          }
          this.currentLyric = new Lyric(lyric, this.handleLyric)
          console.log(this.currentLyric)
          if (this.playing) {
            this.currentLyric.play()
          }
        }).catch(() => {
          this.currentLyric = null
          this.playingLyric = ''
          this.currentLineNum = 0
        })
      },
      _getPosAndScale() {
        // 缩放比例 动态的获取x,y,scale
        const targetWidth = 40
        const paddingLeft = 40
        const paddingBottom = 30
        const paddingTop = 80
        const width = window.innerWidth * 0.8
        const scale = targetWidth / width
        const x = -(window.innerWidth / 2 - paddingLeft)
        const y = window.innerHeight - paddingTop - width / 2 - paddingBottom
        return {
          x,
          y,
          scale
        }
      },
      
      ...mapActions([
        'selectPlay',
      ]),
      ...mapMutations({
        setFullScreen: 'SET_FULL_SCREEN',
        setPlayingState : 'SET_PLAYING_STATE',
        setCurrentIndex : 'SET_CURRENT_INDEX',
        setPlayMode : 'SET_PLAY_MODE',
        setSequenctList :'SET_SEQUENCE_LIST',
        setPlayList:'SET_PLAYLIST'
      })
    },
    watch : {
      currentSong(newSong,oldSong){
        if(newSong.id === oldSong.id) return 
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.$refs.audio.play()
          this.getLyric()
        },1000)
      },
      playing(newPlaying) {
        // 保证的话,就是切换歌曲播放模式的情况下,方面不修改
        // if(newPlaying.id === oldPlaying.id) return 
        const audio = this.$refs.audio
        this.$nextTick(() => {
          newPlaying ? audio.play() : audio.pause()
          
        })
      }
    },
    components : {
      ProgressCircle,
      ProgressBar,
    }
    // methods: {
    //   togglePlaying() {
    //     if (!this.songReady) {
    //       return
    //     }
    //     this.setPlayingState(!this.playing)
    //     if (this.currentLyric) {
    //       this.currentLyric.togglePlay()
    //     }
    //   },
    //   end() {
    //     if (this.mode === playMode.loop) {
    //       this.loop()
    //     } else {
    //       this.next()
    //     }
    //   },
    //   loop() {
    //     this.$refs.audio.currentTime = 0
    //     this.$refs.audio.play()
    //     this.setPlayingState(true)
    //     if (this.currentLyric) {
    //       this.currentLyric.seek(0)
    //     }
    //   },
    //   next() {
    //     if (!this.songReady) {
    //       return
    //     }
    //     if (this.playlist.length === 1) {
    //       this.loop()
    //       return
    //     } else {
    //       let index = this.currentIndex + 1
    //       if (index === this.playlist.length) {
    //         index = 0
    //       }
    //       this.setCurrentIndex(index)
    //       if (!this.playing) {
    //         this.togglePlaying()
    //       }
    //     }
    //     this.songReady = false
    //   },
    //   prev() {
    //     if (!this.songReady) {
    //       return
    //     }
    //     if (this.playlist.length === 1) {
    //       this.loop()
    //       return
    //     } else {
    //       let index = this.currentIndex - 1
    //       if (index === -1) {
    //         index = this.playlist.length - 1
    //       }
    //       this.setCurrentIndex(index)
    //       if (!this.playing) {
    //         this.togglePlaying()
    //       }
    //     }
    //     this.songReady = false
    //   },
    //   ready() {
    //     this.songReady = true
    //     this.savePlayHistory(this.currentSong)
    //   },
    //   error() {
    //     this.songReady = true
    //   },
    //   updateTime(e) {
    //     this.currentTime = e.target.currentTime
    //   },
    //   format(interval) {
    //     interval = interval | 0
    //     const minute = interval / 60 | 0
    //     const second = this._pad(interval % 60)
    //     return `${minute}:${second}`
    //   },
    //   onProgressBarChange(percent) {
    //     const currentTime = this.currentSong.duration * percent
    //     this.$refs.audio.currentTime = currentTime
    //     if (!this.playing) {
    //       this.togglePlaying()
    //     }
    //     if (this.currentLyric) {
    //       this.currentLyric.seek(currentTime * 1000)
    //     }
    //   },
    //   getLyric() {
    //     this.currentSong.getLyric().then((lyric) => {
    //       if (this.currentSong.lyric !== lyric) {
    //         return
    //       }
    //       this.currentLyric = new Lyric(lyric, this.handleLyric)
    //       if (this.playing) {
    //         this.currentLyric.play()
    //       }
    //     }).catch(() => {
    //       this.currentLyric = null
    //       this.playingLyric = ''
    //       this.currentLineNum = 0
    //     })
    //   },
    //   handleLyric({lineNum, txt}) {
    //     this.currentLineNum = lineNum
    //     if (lineNum > 5) {
    //       let lineEl = this.$refs.lyricLine[lineNum - 5]
    //       this.$refs.lyricList.scrollToElement(lineEl, 1000)
    //     } else {
    //       this.$refs.lyricList.scrollTo(0, 0, 1000)
    //     }
    //     this.playingLyric = txt
    //   },
    //   showPlaylist() {
    //     this.$refs.playlist.show()
    //   },
    //   middleTouchStart(e) {
    //     this.touch.initiated = true
    //     const touch = e.touches[0]
    //     this.touch.startX = touch.pageX
    //     this.touch.startY = touch.pageY
    //   },
    //   middleTouchMove(e) {
    //     if (!this.touch.initiated) {
    //       return
    //     }
    //     const touch = e.touches[0]
    //     const deltaX = touch.pageX - this.touch.startX
    //     const deltaY = touch.pageY - this.touch.startY
    //     if (Math.abs(deltaY) > Math.abs(deltaX)) {
    //       return
    //     }
    //     const left = this.currentShow === 'cd' ? 0 : -window.innerWidth
    //     const offsetWidth = Math.min(0, Math.max(-window.innerWidth, left + deltaX))
    //     this.touch.percent = Math.abs(offsetWidth / window.innerWidth)
    //     this.$refs.lyricList.$el.style[transform] = `translate3d(${offsetWidth}px,0,0)`
    //     this.$refs.lyricList.$el.style[transitionDuration] = 0
    //     this.$refs.middleL.style.opacity = 1 - this.touch.percent
    //     this.$refs.middleL.style[transitionDuration] = 0
    //   },
    //   middleTouchEnd() {
    //     let offsetWidth
    //     let opacity
    //     if (this.currentShow === 'cd') {
    //       if (this.touch.percent > 0.1) {
    //         offsetWidth = -window.innerWidth
    //         opacity = 0
    //         this.currentShow = 'lyric'
    //       } else {
    //         offsetWidth = 0
    //         opacity = 1
    //       }
    //     } else {
    //       if (this.touch.percent < 0.9) {
    //         offsetWidth = 0
    //         this.currentShow = 'cd'
    //         opacity = 1
    //       } else {
    //         offsetWidth = -window.innerWidth
    //         opacity = 0
    //       }
    //     }
    //     const time = 300
    //     this.$refs.lyricList.$el.style[transform] = `translate3d(${offsetWidth}px,0,0)`
    //     this.$refs.lyricList.$el.style[transitionDuration] = `${time}ms`
    //     this.$refs.middleL.style.opacity = opacity
    //     this.$refs.middleL.style[transitionDuration] = `${time}ms`
    //     this.touch.initiated = false
    //   },
    //   _pad(num, n = 2) {
    //     let len = num.toString().length
    //     while (len < n) {
    //       num = '0' + num
    //       len++
    //     }
    //     return num
    //   },
    //   _getPosAndScale() {
    //     const targetWidth = 40
    //     const paddingLeft = 40
    //     const paddingBottom = 30
    //     const paddingTop = 80
    //     const width = window.innerWidth * 0.8
    //     const scale = targetWidth / width
    //     const x = -(window.innerWidth / 2 - paddingLeft)
    //     const y = window.innerHeight - paddingTop - width / 2 - paddingBottom
    //     return {
    //       x,
    //       y,
    //       scale
    //     }
    //   },
    //   ...mapMutations({
    //     setFullScreen: 'SET_FULL_SCREEN'
    //   }),
    //   ...mapActions([
    //     'savePlayHistory'
    //   ])
    // },
    // watch: {
    //   currentSong(newSong, oldSong) {
    //     if (!newSong.id) {
    //       return
    //     }
    //     if (newSong.id === oldSong.id) {
    //       return
    //     }
    //     if (this.currentLyric) {
    //       this.currentLyric.stop()
    //       this.currentTime = 0
    //       this.playingLyric = ''
    //       this.currentLineNum = 0
    //     }
    //     clearTimeout(this.timer)
    //     this.timer = setTimeout(() => {
    //       this.$refs.audio.play()
    //       this.getLyric()
    //     }, 1000)
    //   },
    //   playing(newPlaying) {
    //     const audio = this.$refs.audio
    //     this.$nextTick(() => {
    //       newPlaying ? audio.play() : audio.pause()
    //     })
    //   }
    // },
    // components: {
    //   ProgressBar,
    //   ProgressCircle,
    //   Scroll,
    //   Playlist
    // }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .player
    .normal-player
      position: fixed
      left: 0
      right: 0
      top: 0
      bottom: 0
      z-index: 150
      background: $color-background
      .background
        position: absolute
        left: 0
        top: 0
        width: 100%
        height: 100%
        z-index: -1
        opacity: 0.6
        filter: blur(20px)
      .top
        position: relative
        margin-bottom: 25px
        .back
          position absolute
          top: 0
          left: 6px
          z-index: 50
          .icon-back
            display: block
            padding: 9px
            font-size: $font-size-large-x
            color: $color-theme
            transform: rotate(-90deg)
        .title
          width: 70%
          margin: 0 auto
          line-height: 40px
          text-align: center
          no-wrap()
          font-size: $font-size-large
          color: $color-text
        .subtitle
          line-height: 20px
          text-align: center
          font-size: $font-size-medium
          color: $color-text
      .middle
        position: fixed
        width: 100%
        top: 80px
        bottom: 170px
        white-space: nowrap
        font-size: 0
        .middle-l
          display: inline-block
          vertical-align: top
          position: relative
          width: 100%
          height: 0
          padding-top: 80%
          .cd-wrapper
            position: absolute
            left: 10%
            top: 0
            width: 80%
            height: 100%
            .cd
              width: 100%
              height: 100%
              box-sizing: border-box
              border: 10px solid rgba(255, 255, 255, 0.1)
              border-radius: 50%
              &.play
                animation: rotate 20s linear infinite
              &.pause
                animation-play-state: paused
              .image
                position: absolute
                left: 0
                top: 0
                width: 100%
                height: 100%
                border-radius: 50%

          .playing-lyric-wrapper
            width: 80%
            margin: 30px auto 0 auto
            overflow: hidden
            text-align: center
            .playing-lyric
              height: 20px
              line-height: 20px
              font-size: $font-size-medium
              color: $color-text-l
        .middle-r
          display: inline-block
          vertical-align: top
          width: 100%
          height: 100%
          overflow: hidden
          .lyric-wrapper
            width: 80%
            margin: 0 auto
            overflow: hidden
            text-align: center
            .text
              line-height: 32px
              color: $color-text-l
              font-size: $font-size-medium
              &.current
                color: $color-text
      .bottom
        position: absolute
        bottom: 50px
        width: 100%
        .dot-wrapper
          text-align: center
          font-size: 0
          .dot
            display: inline-block
            vertical-align: middle
            margin: 0 4px
            width: 8px
            height: 8px
            border-radius: 50%
            background: $color-text-l
            &.active
              width: 20px
              border-radius: 5px
              background: $color-text-ll
        .progress-wrapper
          display: flex
          align-items: center
          width: 80%
          margin: 0px auto
          padding: 10px 0
          .time
            color: $color-text
            font-size: $font-size-small
            flex: 0 0 30px
            line-height: 30px
            width: 30px
            &.time-l
              text-align: left
            &.time-r
              text-align: right
          .progress-bar-wrapper
            flex: 1
        .operators
          display: flex
          align-items: center
          .icon
            flex: 1
            color: $color-theme
            &.disable
              color: $color-theme-d
            i
              font-size: 30px
          .i-left
            text-align: right
          .i-center
            padding: 0 20px
            text-align: center
            i
              font-size: 40px
          .i-right
            text-align: left
          .icon-favorite
            color: $color-sub-theme
      &.normal-enter-active, &.normal-leave-active
        transition: all 0.4s
        .top, .bottom
          transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32)
      &.normal-enter, &.normal-leave-to
        opacity: 0
        .top
          transform: translate3d(0, -100px, 0)
        .bottom
          transform: translate3d(0, 100px, 0)
    .mini-player
      display: flex
      align-items: center
      position: fixed
      left: 0
      bottom: 0
      z-index: 180
      width: 100%
      height: 60px
      background: $color-highlight-background
      &.mini-enter-active, &.mini-leave-active
        transition: all 0.4s
      &.mini-enter, &.mini-leave-to
        opacity: 0
      .icon
        flex: 0 0 40px
        width: 40px
        padding: 0 10px 0 20px
        img
          border-radius: 50%
          &.play
            animation: rotate 10s linear infinite
          &.pause
            animation-play-state: paused
      .text
        display: flex
        flex-direction: column
        justify-content: center
        flex: 1
        line-height: 20px
        overflow: hidden
        .name
          margin-bottom: 2px
          no-wrap()
          font-size: $font-size-medium
          color: $color-text
        .desc
          no-wrap()
          font-size: $font-size-small
          color: $color-text-d
      .control
        flex: 0 0 30px
        width: 30px
        padding: 0 10px
        .icon-play-mini, .icon-pause-mini, .icon-playlist
          font-size: 30px
          color: $color-theme-d
        .icon-mini
          font-size: 32px
          position: absolute
          left: 0
          top: 0

  @keyframes rotate
    0%
      transform: rotate(0)
    100%
      transform: rotate(360deg)
</style>