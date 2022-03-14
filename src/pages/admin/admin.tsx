import { Layout } from 'antd';
import React, { useEffect } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import memoryUtils from '../../utils/memoryUtils';
import LeftNav from '../../components/LeftNav';
import Headers from '../../components/Header';

import Home from '../home/home'
import Category from '../category/category'
import Product from '../product/product'
import Role from '../role/role'
import User from '../user/user'
import Bar from '../charts/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'
import Notfound from '../not-found'
import Traffic from '../traffic'
import { connect } from 'react-redux';

const { Footer, Sider, Content } = Layout;

function Admin(props) {

    const navigate = useNavigate();
    const user = props.user

    useEffect(() => {
        if (!user || !user._id) {
            navigate('/login');
        }
    }, [user])

    return (
        <Layout style={{ width: "100%", minHeight: "100%" }}>
            <Sider>
                <LeftNav />
            </Sider>
            <Layout>
                <Headers></Headers>
                <Content style={{ margin: '20px', backgroundColor: "#fff" }}>
                    <Routes>
                        {/* <Route path='/' element={<Home />} /> */}
                        <Route path='/' element={<Home />} />
                        <Route path='products/category' element={<Category />} />
                        <Route path='products/product/*' element={<Product />} />
                        <Route path='role' element={<Role />} />
                        <Route path='user' element={<User />} />
                        <Route path='charts/bar' element={<Bar />} />
                        <Route path='charts/line' element={<Line />} />
                        <Route path='charts/pie' element={<Pie />} />
                        <Route path='order' element={<Traffic />} />
                        <Route path='*' element={<Notfound />} />
                    </Routes>
                </Content>
                <Footer style={{ textAlign: 'center', color: '#cccccc' }}>推荐使用谷歌浏览器，可以获得更佳页面操作体验</Footer>
            </Layout>
        </Layout>
    )
}

function mapStateToProps(state) {
    return {
        user: state.users
    }
}

export default connect(mapStateToProps)(Admin)