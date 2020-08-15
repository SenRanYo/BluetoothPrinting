// 快捷状态管理可以用于页面传参,临时存储数据
import store from '../store/index.js'

function setState(name,value){
    store.commit('$setState',{ name, value});
};

function getState(name){
    return store.state[name];
};

export default {
    setState,
    getState
}