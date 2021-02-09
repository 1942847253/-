//vuex核心管理对象
import Vue from 'vue'
import vuex from 'vuex'

import state from './state'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'


Vue.use(vuex);
export default new vuex.Store({
    state,
    actions,
    getters,
    mutations
})