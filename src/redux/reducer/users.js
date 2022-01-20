import storageUtils from "../../utils/storageUtils"
import { RECEIVE_USER, SHOW_ERROR_MSG, RESET_USER } from '../action/loginUserAction'
const initialState = storageUtils.getUser()


export default (state = initialState, { type, payload }) => {
    switch (type) {
        case RECEIVE_USER:
            return payload
        case SHOW_ERROR_MSG:
            const errorMsg = payload
            // state.errorMsg = errorMsg  // 不要直接修改原本状态数据
            return { ...state, errorMsg }
        case RESET_USER:
            return {}
        default:
            return state
    }
}