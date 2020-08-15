import Vue from "vue";
import Vuex from "vuex";
import * as getters from "./getters";
import test from "./modules/test.js";

Vue.use(Vuex);

// 定义永久性存储数据
let permanent = uni.getStorageSync('permanent') || {};
// 需要永久性存储，且下次APP启动需要取出的，在state中的变量名
let saveStateKeys = ['vuex_user', 'vuex_token'];
// 永久性存储方法
const savePermanent = (key, value) => {
    // 判断变量名是否在需要存储的数组中
    if (saveStateKeys.indexOf(key) != -1) {
        // 获取本地存储的permanent对象，将变量添加到对象中
        let tmp = uni.getStorageSync('permanent');
        // 第一次打开APP，不存在permanent变量，故放一个{}空对象
        tmp = tmp ? tmp : {};
        tmp[key] = value;
        // 执行这一步后，所有需要存储的变量，都挂载在本地的permanent对象中
        uni.setStorageSync('permanent', tmp);
    }
}
// 导出
export default new Vuex.Store({
    // 根级别State
    state: {
        // 如果上面从本地获取的permanent对象下有对应的属性，就赋值给state中对应的变量
        // 加上vuex_前缀，是防止变量名冲突，也让人一目了然
        vuex_user: permanent.vuex_user ? permanent.vuex_user : {},
        vuex_token: permanent.vuex_token ? permanent.vuex_token : '',
    },
    // 根级别Mutations
    mutations: {
        $setState(state, payload) {
            // 判断是否多层级调用，state中为对象存在的情况，诸如user.info.score = 1
            let nameArr = payload.name.split('.');
            let saveKey = '';
            let len = nameArr.length;
            if (nameArr.length >= 2) {
                let obj = state[nameArr[0]];
                for (let i = 1; i < len - 1; i++) {
                    obj = obj[nameArr[i]];
                }
                obj[nameArr[len - 1]] = payload.value;
                saveKey = nameArr[0];
            } else {
                // 单层级变量，在state就是一个普通变量的情况
                state[payload.name] = payload.value;
                saveKey = payload.name;
            }
            // 保存变量到本地，见顶部函数定义
            savePermanent(saveKey, state[saveKey])
        }
    },
    getters,
    modules: {
        test
    }
});
