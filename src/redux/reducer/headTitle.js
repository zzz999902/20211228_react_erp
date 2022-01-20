import { SETHEADERTITLE } from '../action/setHeadTitle'
const initialState = ''

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case SETHEADERTITLE:
            return payload
        default:
            return state
    }
}