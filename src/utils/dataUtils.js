/*
包含n个日期时间处理的工具函数模块
*/

/*
  格式化日期
*/
export function formateDate(time) {
    if (!time) return ''
    var date = new Date(time)
    var len = time.toString().length;
    if (len < 13) {
        var sub = 13 - len;
        sub = Math.pow(10, sub);
        date = new Date(time * sub);
    }
    var M = date.getMonth() + 1;
    M = (M < 10 ? '0' + M : M);
    var d = date.getDate();
    d = (d < 10 ? '0' + d : d);
    var h = date.getHours();
    h = (h < 10 ? '0' + h : h) + ':';
    var m = date.getMinutes();
    m = (m < 10 ? '0' + m : m);
    var i = date.getSeconds()
    i = (i < 10 ? '0' + i : i);
    return date.getFullYear() + '-' + M + '-' + d
        + ' ' + h + m + ':' + i
}