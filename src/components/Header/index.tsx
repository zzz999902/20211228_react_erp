import React, { useState, useEffect } from 'react'
import { reqWeather } from '../../api'
import './index.less'
import { formateDate } from '../../utils/dataUtils';
import { useLocation } from 'react-router-dom';
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import LinkButton from '../LinkButton';
import { connect } from 'react-redux';
import { setHeadTitle } from '../../redux/action/setHeadTitle';
import { logout } from '../../redux/action/loginUserAction';
import menus from '../../config/menuConfig'
import Item from 'antd/lib/list/Item';
import { has } from '@antv/util';

function Headers(props) {
    const navigate = useNavigate();
    const { confirm } = Modal;
    const hash = useLocation()//hock获取url地址参数
    // const [uname, setuname] = useState(false)//用户账号
    const uname = props.user.username
    const [currentTime, setcurrentTime] = useState(formateDate((Date.now())))//时间
    const [weather, setweather] = useState(false)//文本
    const [dayPictureUrl, setdayPictureUrl] = useState("")//图片
    // const [Titles, setTitles] = useState()//标题
    const Titles = props.headTitle //redux标题

    function showConfirm() {
        confirm({
            icon: <ExclamationCircleOutlined />,
            content: '确定退出吗？',
            onOk() {
                props.logout()
                // storageUtils.removeUser();
                // memoryUtils.user = {}
                // navigate('/login')
            },
        });
    }

    // function getTitle() {
    //     menuList.map(item => {
    //         if (item.key === hash.pathname) {
    //             setTitles(item.title)
    //         } else if (item.children) {
    //             // 在所有子item中查找匹配的
    //             const cItem = item.children.find(cItem => hash.pathname.indexOf(cItem.key) === 0)
    //             // 如果有值才说明有匹配的
    //             if (cItem) {
    //                 // 取出它的title
    //                 setTitles(cItem.title)
    //             }
    //         }
    //     })
    // }

    //动态显示标题
    // useEffect(() => {
    //     getTitle()
    // }, [hash.pathname])

    useEffect(() => {
        // setuname(memoryUtils.user.username)

        //天气情况
        reqWeather().then(item => {
            setweather(item.results[0].weather_data[0].weather)
            setdayPictureUrl(item.results[0].weather_data[0].dayPictureUrl)
        })
    }, [])

    //动态显示当前时间
    useEffect(() => {
        const t = setInterval(() => {
            setcurrentTime(formateDate((Date.now())))
        }, 1000)

        return () => {
            clearTimeout(t)
        }

    }, [])
    return (
        <div className='header'>
            <div className="header-top">
                <span>欢迎，{uname}</span>
                <LinkButton onClick={() => showConfirm()}>
                    退出
                </LinkButton>
            </div>
            <div className="header-bottom">
                <div className="header-bottom-left">
                    {Titles}
                </div>
                <div className="header-bottom-right">
                    <span>{currentTime}</span>
                    <img
                        style={{ width: '30px', height: '30px' }}
                        src={dayPictureUrl}
                        alt="天气" />
                    <span>{weather}</span>
                </div>
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        headTitle: state.titles,
        user: state.users
    }
}

const creators = {
    setHeadTitle,
    logout
};

export default connect(mapStateToProps, creators)(Headers)