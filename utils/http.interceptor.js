// 这里的vm，就是我们在vue文件里面的this，所以我们能在这里获取vuex的变量，比如存放在里面的token
// 同时，我们也可以在此使用getApp().globalData，如果你把token放在getApp().globalData的话，也是可以使用的
const install = (Vue, vm) => {
    let baseUrl = null;
    // 开发环境和生产环境判断
    if (process.env.NODE_ENV === 'development') {
        // 这里配置开发环境基础请求地址
        baseUrl = 'http://127.0.0.1:3000';
    } else {
        // 这里配置生产环境基础请求地址
        baseUrl = 'http://47.113.121.251/fqhw-server';
    }
    Vue.prototype.$http.setConfig({
        baseUrl
        // 如果将此值设置为true，拦截回调中将会返回服务端返回的所有数据response，而不是response.data
        // 设置为true后，就需要在this.$http.interceptor.response进行多一次的判断，请打印查看具体值
        // originalData: true, 
        // 设置自定义头部content-type
        // header: {
        // 	'content-type': 'xxx'
        // }
    });
    // 请求拦截，配置Token等参数
    Vue.prototype.$http.interceptor.request = (config) => {
        // 方式一，存放在vuex的token，假设使用了uView封装的vuex方式，见：https://uviewui.com/components/globalVariable.html
        // config.header.token = vm.token;

        // 方式二，如果没有使用uView封装的vuex方法，那么需要使用$store.state获取
        // config.header.token = vm.$store.state.token;

        // 方式三，如果token放在了globalData，通过getApp().globalData获取
        // config.header.token = getApp().globalData.username;

        // 方式四，如果token放在了Storage本地存储中，拦截是每次请求都执行的，所以哪怕您重新登录修改了Storage，下一次的请求将会是最新值
        config.header.token = uni.getStorageSync('vuex_token');

        if (process.env.NODE_ENV === 'development') {
            console.log(`%c请求地址  ${baseUrl}${config.url}\n${JSON.stringify(config)}`, "color: #06D078");
        }
        
        return config;
    }
    // 响应拦截，判断状态码是否通过
    Vue.prototype.$http.interceptor.response = (res) => {
        uni.stopPullDownRefresh() // 停止下拉动作
        let errCode = ['1000', '1001', '0404']
        // 如果把originalData设置为了true，这里得到将会是服务器返回的所有的原始数据
        // 判断可能变成了res.statueCode，或者res.data.code之类的，请打印查看结果
        if (res.respCode == '0000') {
            // 如果把originalData设置为了true，这里return回什么，this.post的then回调中就会得到什么
            return res.data;
        } else if (errCode.includes(res.respCode)) {
            uni.removeStorageSync('token');
            uni.showToast({
                title: res.respMsg,
                icon: 'none',
                duration: 2000
            });
            uni.switchTab({
                url: '/pages/login/index'
            });
            return false;
        } else {
            uni.showModal({
                title: '提示',
                content: res.respMsg || '请求出错,状态码:' + res.respCode,
                confirmColor: '#06d078',
                showCancel: false,
                success: function(res) {}
            });
            return false;
        };
    }
}

export default {
    install
}
