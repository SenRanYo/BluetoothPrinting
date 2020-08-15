/**
 * @description 补全0
 */
function completeDate(value) {
    return value < 10 ? "0" + value : value;
}

/**
 * @description 获取指定日期的前几天后几天
 * @param Date date 指定时间
 * @param Number day 前几天或者后几天 可选 n -n
 * @return Date yyyy-mm-dd格式时间
 */
function getNextDate(date, day) {
    let dd = new Date(date);
    dd.setDate(dd.getDate() + day);
    let y = dd.getFullYear();
    let m = completeDate(dd.getMonth() + 1);
    let d = completeDate(dd.getDate());
    return y + "-" + m + "-" + d;
};

/**
 * @description 获取本周第一天
 * @return Date yyyy-mm-dd格式本周第一天
 */
function getNowWeekStart() {
    let date = new Date();
    date.setDate(date.getDate() - date.getDay() + 1);
    let start = date.getFullYear() + "-" + completeDate(date.getMonth() + 1) + "-" + completeDate(date.getDate());
    return start
};

/**
 * @description 获取本周最后一天
 * @return Date yyyy-mm-dd格式本周最后一天
 */
function getNowWeekEnd() {
    let date = new Date();
    date.setDate(date.getDate() - date.getDay() + 1 + 6);
    let end = date.getFullYear() + "-" + completeDate(date.getMonth() + 1) + "-" + completeDate(date.getDate());;
    return end
};

/**
 * @description 获取本周是当前年的第几周
 * @return Number 本年的第几周
 */
function getWeekOfYear() {
    let today = new Date();
    let firstDay = new Date(today.getFullYear(), 0, 1);
    let dayOfWeek = firstDay.getDay();
    let spendDay = 1;
    if (dayOfWeek != 0) {
        spendDay = 7 - dayOfWeek + 1;
    }
    firstDay = new Date(today.getFullYear(), 0, 1 + spendDay);
    let d = Math.ceil((today.valueOf() - firstDay.valueOf()) / 86400000);
    let result = Math.ceil(d / 7);
    return result + 1;
};

/**
 * @description 时间格式化
 * @param String timeVlaue 时间戳或者时间格式  不传则为当前时间
 * @param String fmt 格式
 * * @param String fmt 格式
 * @return 格式化后的时间
 */
function timeFormat(timeVlaue = new Date(), fmt = 'yyyy-mm-dd') {
    // 其他更多是格式化有如下:
    // yyyy:mm:dd|yyyy:mm|yyyy年mm月dd日|yyyy年mm月dd日 hh时MM分ss秒等,可自定义组合
    if (!isNaN(timeVlaue)) {
        // 判断用户输入的时间戳是秒还是毫秒,一般前端js获取的时间戳是毫秒(13位),后端传过来的为秒(10位)
        if (timeVlaue.toString().length == 10) timeVlaue *= 1000;
    }
    timeVlaue = new Date(timeVlaue);
    let ret;
    let opt = {
        "y+": timeVlaue.getFullYear().toString(), // 年
        "m+": (timeVlaue.getMonth() + 1).toString(), // 月
        "d+": timeVlaue.getDate().toString(), // 日
        "h+": timeVlaue.getHours().toString(), // 时
        "M+": timeVlaue.getMinutes().toString(), // 分
        "s+": timeVlaue.getSeconds().toString() // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
        };
    };
    return fmt;
}

/**
 * 时间戳转为多久之前
 * @param String timestamp 时间戳
 * @param String | Boolean format 如果为时间格式字符串，超出一定时间范围，返回固定的时间格式；
 * 如果为布尔值false，无论什么时间，都返回多久以前的格式
 */
function timeFrom(timestamp = null, format = 'yyyy-mm-dd') {
    if (timestamp == null) timestamp = Number(new Date());
    timestamp = parseInt(timestamp);
    // 判断用户输入的时间戳是秒还是毫秒,一般前端js获取的时间戳是毫秒(13位),后端传过来的为秒(10位)
    if (timestamp.toString().length == 10) timestamp *= 1000;
    var timer = (new Date()).getTime() - timestamp;
    timer = parseInt(timer / 1000);
    // 如果小于5分钟,则返回"刚刚",其他以此类推
    let tips = '';
    console.log(timer);
    switch (true) {
        case timer < 300:
            tips = '刚刚';
            break;
        case timer >= 300 && timer < 3600:
            tips = parseInt(timer / 60) + '分钟前';
            break;
        case timer >= 3600 && timer < 86400:
            tips = parseInt(timer / 3600) + '小时前';
            break;
        case timer >= 86400 && timer < 2592000:
            tips = parseInt(timer / 86400) + '天前';
            break;
        default:
            // 如果format为false，则无论什么时间戳，都显示xx之前
            if (format === false) {
                if (timer >= 2592000 && timer < 365 * 86400) {
                    tips = parseInt(timer / (86400 * 30)) + '个月前';
                } else {
                    tips = parseInt(timer / (86400 * 365)) + '年前';
                }
            } else {
                tips = timeFormat(timestamp, format);
            }
    }
    return tips;
}

export default {
    getNextDate,
    timeFormat,
    timeFrom,
    getNowWeekStart,
    getNowWeekEnd,
    getWeekOfYear
};
