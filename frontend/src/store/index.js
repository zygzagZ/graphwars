import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
/*
function connectWebsocket(opt) {
  if (!opt.interval) opt.interval = 1000
  ws = new WebSocket(document.location.href.replace(/^http/, 'ws'))

  ws.addEventListener('error', (e) => {
    console.error(e)
    opt.interval = Math.min(opt.interval * 1.5, 30000)
  })

  ws.addEventListener('open', () => {
    opt.interval = 1000
    $('.navbar').removeClass('bg-red').addClass('bg-dark')
  })

  ws.addEventListener('close', (e) => {
    $('.navbar').removeClass('bg-dark').addClass('bg-red')
    setTimeout(connectWebsocket, opt.interval, opt)
  })

  ws.addEventListener('open', opt.open)
  ws.addEventListener('close', opt.close)
  ws.addEventListener('message', opt.message)

  return ws
}*/

const store = new Vuex.Store({
  state: {
    ws: null,
    connected: false,
    nick: '',
    interval: 1000
  },
  mutations: {
    setInterval(state, value) {
      state.interval = value
    },
    setConnected(state, value) {
      state.connected = value
      if (value) {
        state.interval = 1000
      } else {
        state.interval = Math.min(state.interval * 1.5, 30000)
      }
    },
    setNick(state, value) {
      state.nick = value
    },
    setWS(state, value) {
      state.ws = value
    }
  },
  actions: {
    connect({ store, commit }) {
      return new Promise((resolve) => {
        const ws = new WebSocket(document.location.href.replace(/^http/, 'ws'))
        ws.addEventListener('error', (e) => {
          console.log('ws error', e)
        })
        ws.addEventListener('close', () => {
          console.log('store close')
          commit('setConnected', false)
          setTimeout(() => resolve(store.dispatch('connect')), store.interval)
        })
        ws.addEventListener('open', () => {
          console.log('store open')
          commit('setConnected', true)
          resolve(ws)
        })
        console.log('store connect', ws)
        commit('setWS', ws)
      })
    },
    login({ commit }, nick) {
      commit('setNick', nick)
    }
  },
  getters: {
    sendJSON(state) {
      return (json) => {
        if (!state.ws) return
        state.ws.send(JSON.stringify(json))
      }
    }
  },
  modules: {
  }
})

console.log(store.dispatch('connect'))

export default store
