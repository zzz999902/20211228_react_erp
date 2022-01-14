import ajax from './ajax'


/**
 * 登录
 */
export function reqLogin(movie): Promise<any> {
  return ajax('/login', { ...movie }, 'POST')
}

/**
 * 获取天气
 */
export function reqWeather(): Promise<any> {
  return ajax('/weather',)
}

/**
 * 获取一级或某个二级分类列表
 */
export function reqCategorys(parentId: string): Promise<any> {
  return ajax('/manage/category/list', { parentId })
}

/**
 * 添加分类
 */
export function reqAddCategorys(parentId, categoryName): Promise<any> {
  return ajax('/manage/category/add', { parentId, categoryName }, 'POST')
}

/**
 * 更新品类名称
 */
export function reqEditCategorys(movie): Promise<any> {
  return ajax('/manage/category/update', { ...movie }, 'POST')
}


/**
 * 获取商品分页列表  后台类型
 */
export function reqProducts(movie): Promise<any> {
  return ajax('/manage/product/list', { ...movie })
}

/**
  * 搜索商品分页列表 (根据商品名称/商品描述)
  * searchType: 搜索的类型, productName/productDesc
 */
export function reqSearchProducts(movie): Promise<any> {
  return ajax('/manage/product/search', {
    ...movie,
    [movie.serchType]:[movie.serchName]
  })
}

/**
 * 获取一个分类
 */
export function reqCategory(categoryId): Promise<any> {
  return ajax('/manage/category/info', { categoryId })
}

/**
 * 更新商品的状态(上架/下架)
 */
export function reqUpdateStatus(productId, status): Promise<any> {
  return ajax('/manage/product/updateStatus', { productId, status }, 'POST')
}

/**
 * 添加商品 and 修改商品
 */
export function reqAddOrUpdateProduct(product): Promise<any> {
  return ajax('/manage/product/' + (product._id ? 'update' : 'add'), product, 'POST')
}


// 删除指定名称的图片
export function reqDeleteImg(name): Promise<any> {
  return ajax('/manage/img/delete', { name }, 'POST')
}

// 获取所有角色的列表
export function reqRoles(): Promise<any> {
  return ajax('/manage/role/list',)
}

// 添加角色
export function reqAddRole(roleName): Promise<any> {
  return ajax('/manage/role/add', { roleName }, 'POST')
}

// 更新角色
export function reqUpdateRole(role): Promise<any> {
  return ajax('/manage/role/update', { ...role }, 'POST')
}


// 获取所有用户的列表
export function reqUsers(): Promise<any> {
  return ajax('/manage/user/list')
}

// 添加用户
export function reqAddOrUpdateUser(user): Promise<any> {
  return ajax('/manage/user/add', { ...user }, 'POST')
}

// 更新用户
export function reqUpdateUser(user): Promise<any> {
  return ajax('/manage/user/update', { ...user }, 'POST')
}

// 删除指定用户
export function reqDeleteUser(userId): Promise<any> {
  return ajax('/manage/user/delete', { userId }, 'POST')
}























/*
jsonp解决ajax跨域的原理
  1). jsonp只能解决GET类型的ajax请求跨域问题
  2). jsonp请求不是ajax请求, 而是一般的get请求
  3). 基本原理
   浏览器端:
      动态生成<script>来请求后台接口(src就是接口的url)
      定义好用于接收响应数据的函数(fn), 并将函数名通过请求参数提交给后台(如: callback=fn)
   服务器端:
      接收到请求处理产生结果数据后, 返回一个函数调用的js代码, 并将结果数据作为实参传入函数调用
   浏览器端:
      收到响应自动执行函数调用的js代码, 也就执行了提前定义好的回调函数, 并得到了需要的结果数据
 */