import { createStore } from 'vuex'

const store = createStore({
  state: {
    response: null,
  },
  mutations: {
    UPDATE_RESPONSE(state, payload) {
      state.response = payload
    },
  },
  actions: {
    updateResponse({ commit }, payload) {
      commit('UPDATE_RESPONSE', payload)
    },
  },
  getters: {
    $response(state) {
      return state.response
    },
  },
})

export default store
