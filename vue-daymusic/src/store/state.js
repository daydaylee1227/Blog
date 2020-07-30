import {playMode} from 'common/js/config'
import {loadSearch, loadPlay, loadFavorite} from 'common/js/cache'

const state = {
  singer: {},
  playing: false,           // 控制播放状态
  fullScreen: false,       // 播放器的展开缩小
  playlist: [],           // 播放歌曲的list
  sequenceList: [],      // 这个播放歌曲的随机列表
  mode: playMode.sequence,    //  播放模式, 随机播放,顺序播放,循环播放
  currentIndex: -1,     // 当前播放的索引
  disc: {},
  topList: {},
  searchHistory: loadSearch(),
  playHistory: loadPlay(),
  favoriteList: loadFavorite()
}

export default state