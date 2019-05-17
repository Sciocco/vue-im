import Vue from 'vue'
import Vuex from 'vuex'
import webim from './model/webim';

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    webim
  }
})
