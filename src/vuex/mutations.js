// 定义所需的 mutations
const mutations = {
    INCREMENT(state) {
        state.count++
    },
    DECREMENT(state) {
        state.count--
    },
    SETTOKEN(state,payload){
    	state.token = payload.token;
    },
    LOGOUT(state){
    	state.token = '';
    }
}

export default mutations;