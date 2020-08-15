// 此文件是Vuex模块化结构示例
// import System from '@/common/common';
// import utils from '@/common/util';

// 响应式state
const state = {
    testValue: '我是一个测试值'
};
// 同步mutations
const mutations = {
    setTestData(state, data) {
        state.testValue = data;
    }
};
// 异步actions
const actions = {

}

export default {
    state,
    mutations,
    actions
};
