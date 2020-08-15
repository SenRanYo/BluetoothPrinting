// 工具方法集合
import lodash from 'lodash'; // lodash Js方法 详情 https://www.lodashjs.com/
import queryParams from './queryParams.js'; // 对象转URL参数
import route from './route.js'; // 路由跳转
import http from './request.js'; // Http请求
import time from './time.js'; // 格式化时间
import test from './test.js'; // 规则校验
import md5 from './md5.js'; // md5加密
import random from './random.js'; // 随机数
import trim from './trim.js'; // 去除空格
import common from './common.js'; // 常用
import map from './map.js'; // 地图
import guid from './guid.js'; // 全局唯一标识符
import deepClone from './deepClone.js'; // 全局唯一标识符
import state from './state.js'; // 设置,获取Vux数据

export default {
    lodash,
    test: test,
    to: route.router,
    ...queryParams,
    ...http,
    ...time,
    ...md5,
    ...random,
    ...trim,
    ...common,
    ...map,
    ...guid,
    ...state,
    ...deepClone
}
