//test
const actions = {
	increment({commit}){
	    commit('INCREMENT')
	},
	decrement({commit}){
	    commit('DECREMENT')
	},
	setToken({commit},payload){
	    commit('SETTOKEN',payload)
	},
	logout({commit},payload){
	    commit('LOGOUT',payload)
	}
} 

export default actions;
