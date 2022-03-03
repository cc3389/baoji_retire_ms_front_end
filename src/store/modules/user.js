import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { asyncRoutes, resetRouter, constantRoutes} from '@/router'
const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    auth: '',
    routes: [],
    addRoutes: []
  }
}

const state = getDefaultState()

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  },
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AUTH: (state, auth) => {
    state.auth = auth
  }
}
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return [roles].some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}
export function filterAsyncRoutes(routes, roles) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })
  return res
}
const actions = {
  // user login
  // commit 为简写，加上就好，省略了context.commit
  login({ commit }, userInfo) {
    const { username, password } = userInfo // 赋值
    // promise 为异步操作
    return new Promise((resolve, reject) => {
      console.log('调用 login api接口 获取用户token')
      // 调用 login api接口 获取用户token
      login({ username: username.trim(), password: password }).then(response => {
        console.log('登录响应:')
        console.log(response)
        const { data } = response
        console.log('token信息：' + data.token + '保存到store中')
        // 保存到store中
        commit('SET_TOKEN', data.token)
        // 保存到cookie中
        console.log('保存到cookie中')
        setToken(data.token)
        console.log('返回')
        resolve(data.msg)// 返回
      }).catch(error => {
        console.log('失败返回')
        reject(error)// 失败返回
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      // 调用接口
      getInfo(state.token).then(response => {
        const { data } = response
        console.log('[user.js]userInfo', data)
        if (!data) {
          return reject('用户验证失败，请重新登录。')
        }

        const { name, auth } = data
        // 保存到store中
        commit('SET_NAME', name)
        commit('SET_AUTH', auth)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  },
  generateRoutes({ commit }, roles) {
    console.log('[user.js]{generateRoutes}data', roles)
    return new Promise(resolve => {
      console.log('[user.js]data', roles)
      const accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}

