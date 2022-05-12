export const SETHEADERTITLE = Symbol("set-header-title");

/**
 * 设置登录页面标题
 * @param {*} name 
 */
export function setHeadTitle(name) {
    return {
        type: SETHEADERTITLE,
        payload: name
    }
}