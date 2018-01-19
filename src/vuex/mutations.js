// 定义所需的 mutations
const mutations = {
    INCREMENT(state) {
        state.count++
    },
    DECREMENT(state) {
        state.count--
    },
    SETTOKEN(state,payload){
        window.sessionStorage.setItem('token', payload.token);
    	state.token = payload.token;
    },
    LOGOUT(state){
        window.sessionStorage.removeItem('token');
    	state.token = '';
    }
}

export default mutations;