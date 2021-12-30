//失败
export interface IResponseError {
    status: number
    msg: string
}

//成功
export interface IResponseData<T> {
    status: number
    data: T
}

//返回类型
export interface IMovie {
    _id: string,
    username: string,
    password: string,
    create_time: number,
    __v: number,
    role?: object,
}

//传参类型
export interface IDatas {
    username: string,
    password: string,
    phone?: string,
    email?: string,
    role_id?: string
}