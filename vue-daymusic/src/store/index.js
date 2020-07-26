import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import state from './state'

import mutations from './mutations'
import createLogger from 'vuex/dist/logger'
// 这个logger作用就是每次通过commit mutations修改state时,控制台会去打印修改记录是什么



Vue.use(Vuex)

// npm run dev 这个值为true
// 
const debug = process.env.NODE_ENV !== 'production'


export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations,
  strict: debug,
  // 开启的就是线下的严格模式,它会去判断,这个state状态是否是由mutations操作而修改的
  // vuex严格模式,当发现这个state状态修改不是来源于commit mutations的话,会报错
  // 并且开启严格模式的话,会消耗一定的性能的,所以建议线上不适用
  
  plugins: debug ? [createLogger()] : []
})