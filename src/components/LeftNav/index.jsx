import React, { useEffect, useState } from 'react'
import './index.less'
import { Menu } from 'antd';
import * as Icon from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import menuLists from '../../config/menuConfig';
import memoryUtiles from '../../utils/memoryUtils'
const { SubMenu } = Menu;

export default function LeftNav() {
    const image = require('../../assets/logo.jpg');
    const hash = useLocation()//hock获取url地址参数
    const [openKey, setopenKey] = useState(hash.pathname.split('/')[1])
    const [openName, setopenName] = useState('')

    function hasAuth(item) {
        const { key, isPublic } = item
        const menus = memoryUtiles.user.role.menus
        const username = memoryUtiles.user.username
        if (username === 'admin' || isPublic || menus.indexOf(key) !== -1) {
            return true
        } else if (item.children) { // 4. 如果当前用户有此item的某个子item的权限
            return !!item.children.find(child => menus.indexOf(child.key) !== -1)
        }
        return false
    }

    //渲染左侧菜单栏
    function getMenuNodes(menuList) {
        return menuList.map(item => {
            //antd4中<Menu.Item icon={< PieChartOutlined />}>icon属性是节点属性，可以使用React.createElement方法来创建节点。
            const icon = React.createElement(Icon[item.icon])
            if (hasAuth(item)) {

                if (item.children) {
                    return (
                        <SubMenu key={item.key} icon={icon} title={item.title}>
                            {getMenuNodes(item.children)}
                        </SubMenu>
                    )
                } else {
                    return (
                        <Menu.Item key={item.key} icon={icon}>
                            <Link to={item.key} >
                                {item.title}
                            </Link>
                        </Menu.Item>
                    )
                }

            }
        })
    }

    useEffect(() => {
        if (hash.pathname.split('/')[3] === 'detaul' || hash.pathname.split('/')[3] === 'addupdate') {
            setopenName('/products/product')
        } else {
            setopenName(hash.pathname)
        }
    }, [hash])

    return (
        <div>
            <div className='left-nav'>
                <Link to={'/'} className="left-nav-header">
                    <img src={image} alt="" />
                    <h1>React</h1>
                </Link>
            </div>
            <div className="left-nav-sider">
                <Menu
                    selectedKeys={[openName]}
                    mode="inline"
                    theme="dark"
                    defaultOpenKeys={["/" + openKey]}
                >
                    {getMenuNodes(menuLists)}
                </Menu>
            </div>
        </div>
    )
}
