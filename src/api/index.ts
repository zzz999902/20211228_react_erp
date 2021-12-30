import ajax from './ajax'
import { IResponseError, IResponseData, IMovie, IDatas } from './CommonTypes'


/**
 * 登录
 */
export function reqLogin(movie: IDatas): Promise<IResponseData<IMovie> | IResponseError> {
    return ajax('/login', { ...movie }, 'POST')
}
