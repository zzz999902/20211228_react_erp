import { reqLogin } from '../../api/index'
import storageUtils from "../../utils/storageUtils"
export const RECEIVE_USER = 'receive_user'  // 接收用户信息
export const SHOW_ERROR_MSG = 'show_error_msg' // 显示错误信息
export const RESET_USER = 'reset_user' // 重置用户信息


/**
 * 登录
 * @param {*} user 
 */
export function loginUserAction(user) {
    return {
        type: RECEIVE_USER,
        payload: user
    }
}

/*
显示错误信息同步action
 */
export function showErrorMsg(errorMsg) {
    return {
        type: SHOW_ERROR_MSG,
        payload: errorMsg
    }
}



/*
退出登陆的同步action
 */
export const logout = () => {
    // 删除local中的user
    storageUtils.removeUser()
    // 返回action对象
    return { type: RESET_USER }
}

/*
登陆的异步action
 */
export const login = (values) => {
    return async dispatch => {
        // 1. 执行异步ajax请求
        const result = await reqLogin(values)  // {status: 0, data: user} {status: 1, msg: 'xxx'}
        // 2.1. 如果成功, 分发成功的同步action
        if (result.status === 0) {
            const user = result.data
            // 保存local中
            storageUtils.saveUser(user)
            // 分发接收用户的同步action
            dispatch(loginUserAction(user))
        } else { // 2.2. 如果失败, 分发失败的同步action
            const msg = result.msg
            // message.error(msg)
            dispatch(showErrorMsg(msg))
        }

    }
}
