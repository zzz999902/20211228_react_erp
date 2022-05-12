import { createStore, applyMiddleware } from "redux";
import reducer from "./reducer"
import thunk from "redux-thunk"
import { composeWithDevTools } from 'redux-devtools-extension'


export default createStore(reducer,// 创建store对象内部会第一次调用reducer()得到初始状态值
    composeWithDevTools(
        applyMiddleware(thunk)
    )
) 