// 方法集合

/**
 * @description 消息提示框
 * @param String title 提示内容
 * @param String icon 可选值 success loading 默认 none
 * @param Number duration 多少毫秒后隐藏
 */
function toast(title = '', icon = 'none', duration = 1500) {
    uni.showToast({
        title,
        icon,
        duration
    })
};

/**
 * @description 消息弹窗
 * @param String content 提示内容
 * @param String title 提示标题
 * @param Function callback 回调方法
 */
function alert(content = '', title = '提示', callback) {
    callback = callback || function() {};
    uni.showModal({
        title,
        content,
        showCancel: false,
        success: (res) => {
            if (res.confirm) {
                callback()
            }
        }
    })
};

/**
 * @description 消息确认弹窗
 * @param String content 提示内容
 * @param String title 提示标题
 * @param Function callback 回调方法
 */
function confirm(content = '', title = '提示', callback) {
    callback = callback || function() {}
    uni.showModal({
        title,
        content,
        success: (res) => {
            if (res.confirm) {
                callback();
            } else if (res.cancel) {
                // console.log('用户点击取消');
            }
        }
    })
};

/**
 * @description 获取微信code码
 * @param Function callback 回调函数
 */
function getWeiXinCode(callback) {
    uni.login({
        provider: 'weixin',
        success: (res) => {
            uni.setStorageSync('weixinCode', res.code);
            callback(res.code);
        }
    })
};

/**
 * @description 函数防抖 短时间内多次触发同一事件，只执行最后一次，或者只执行最开始的一次，中间的不执行
 * @param Function func 目标函数
 * @param Number wait 延迟执行毫秒数
 * @param Booleans immediate true - 立即执行， false - 延迟执行
 */
function debounce(func, wait = 500, immediate = true) {
    let timer;
    return function() {
        let context = this,
            args = arguments;
        if (timer) clearTimeout(timer);
        if (immediate) {
            let callNow = !timer;
            timer = setTimeout(() => {
                timer = null;
            }, wait);
            if (callNow) func.apply(context, args);
        } else {
            timer = setTimeout(() => {
                func.apply
            }, wait)
        }
    }
};

/**
 * @description 函数节流 连续触发事件但是在 n 秒中只执行一次函数。即 2n 秒内执行 2 次
 * @param Function func 函数
 * @param Number wait 延迟执行毫秒数
 * @param Number type 1 表时间戳版，2 表定时器版
 */
function throttling(func, wait = 500, type = 1) {
    if (type === 1) {
        let previous = 0;
    } else if (type === 2) {
        let timeout;
    }
    return function() {
        let context = this;
        let args = arguments;
        if (type === 1) {
            let now = Date.now();
            if (now - previous > wait) {
                func.apply(context, args);
                previous = now;
            }
        } else if (type === 2) {
            if (!timeout) {
                timeout = setTimeout(() => {
                    timeout = null;
                    func.apply(context, args)
                }, wait)
            }
        }
    }
}

export default {
    toast,
    alert,
    confirm,
    getWeiXinCode,
    debounce,
    throttling
};
