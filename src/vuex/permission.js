// store/permission.js
import { asyncRouterMap, constantRouterMap } from '../router/routes';
import {getUserInfo} from '../api/api'

function hasPermission(roles, route) {
  if (route.meta && route.meta.role) {
    return roles.some(role => route.meta.role.indexOf(role) >= 0)
  } else {
    return true
  }
}

export const state = {
    token: window.sessionStorage.getItem('token') || '',
    routers: constantRouterMap,
    roles: [],
    addRouters: []
};
export const getters = {
  token: state => state.token,
  roles: state => state.roles,
  addRouters: state => state.addRouters
};
export const mutations = {
  SET_TOKEN(state,payload){
      window.sessionStorage.setItem('token', payload.token);
    state.token = payload.token;
  },
  LOG_OUT(state){
      window.sessionStorage.removeItem('token');
    state.token = '';
  },
  GET_INFO(state, payload){
      state.roles = payload.roles;
  },
  SET_ROUTERS: (state, routers) => {
    state.addRouters = routers;
    state.routers = constantRouterMap.concat(routers);
  }
};
export const actions = {
  SetToken({commit},payload){
      commit('SET_TOKEN',payload)
  },
  LogOut({commit},payload){
      commit('LOG_OUT',payload)
  },
  GetInfo({commit},payload){
    return getUserInfo();
  },
  GenerateRoutes({ commit }, data) {
    return new Promise(resolve => {
      const { roles } = data;
      const accessedRouters = asyncRouterMap.filter(v => {
        if (roles.indexOf('admin') >= 0) return true;
        if (hasPermission(roles, v)) {
          if (v.children && v.children.length > 0) {
            v.children = v.children.filter(child => {
              if (hasPermission(roles, child)) {
                return child
              }
              return false;
            });
            return v
          } else {
            return v
          }
        }
        return false;
      });
      commit('SET_ROUTERS', accessedRouters);
      resolve();
    })
  }
};

