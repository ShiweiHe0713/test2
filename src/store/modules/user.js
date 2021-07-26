import storage from 'store'
import { loginApi, getInfo, logout } from '@/api/login'
import { userLogin } from '@/api/user'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { welcome } from '@/utils/util'

const user = {
 state: {
  token: '',

  info: {}
 },

 mutations: {
  SET_TOKEN: (state, token) => {
   state.token = token
  },
  SET_NAME: (state, { name, welcome }) => {
   state.name = name
   state.welcome = welcome
  },
  SET_AVATAR: (state, avatar) => {
   state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
   state.roles = roles
  },
  SET_INFO: (state, info) => {
   state.info = info
  }
 },

 actions: {
  // 登录
  Login ({ commit }, userInfo) {
   debugger
   return new Promise((resolve, reject) => {
    debugger
    userLogin(userInfo).then(res => {
     debugger
     if (res && res.code == '0') {
      const result = res.data
      storage.set(ACCESS_TOKEN, result.token)
      commit('SET_TOKEN', result.token)
      commit('SET_INFO', result)
      resolve()
     } else {
      reject(res)
     }
    }).catch(error => {
     reject(error)
    })
   })
  },

  // 获取用户信息
  GetInfo ({ commit }) {
   return new Promise((resolve, reject) => {

   })
  },

  // 登出
  Logout ({ commit, state }) {
   return new Promise((resolve) => {
    logout(state.token).then(() => {
     resolve()
    }).catch(() => {
     resolve()
    }).finally(() => {
     commit('SET_TOKEN', '')
     commit('SET_ROLES', [])
     storage.remove(ACCESS_TOKEN)
    })
   })
  }

 }
}

export default user
