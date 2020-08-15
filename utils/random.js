/**
 * @description 置随机数
 * @param Number min 最小数
 * @param Number max 最大数
 */
function random(min, max) {
    if (min >= 0 && max > 0 && max >= min) {
        let gab = max - min + 1;
        return Math.floor(Math.random() * gab + min);
    } else {
        return 0;
    }
}

export default {
    random
};
