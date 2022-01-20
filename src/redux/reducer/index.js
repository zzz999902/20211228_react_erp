import usersReducer from '../reducer/users'
import HeadTitle from '../reducer/headTitle'
import { combineReducers } from 'redux'


export default combineReducers({
    titles: HeadTitle,
    users: usersReducer
})