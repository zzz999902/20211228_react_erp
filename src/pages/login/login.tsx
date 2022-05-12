import React, { useEffect } from 'react'
import './login.less'
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { reqLogin } from '../../api';
import { useNavigate } from 'react-router-dom';
import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils';
import { connect } from 'react-redux';
import { login } from '../../redux/action/loginUserAction'
function Login(props) {
    const navigate = useNavigate();
    const image = require('../../assets/logo.jpg');
    const user = props.user

    useEffect(() => {
        if (user && user._id) {
            navigate('/');
        }
    }, [user])

    async function onFinish(values) {

        props.login(values)
        
        // const resp = await reqLogin(values)

        // //一：类型断言
        // // if (resp.status === 0) {
        // //     message.success('登录成功');
        // //     memoryUtils.user = (resp as any).data//保存到自定义的数据的工具模块
        // //     storageUtils.saveUser((resp as any).data)//保存到store
        // //     navigate('/');
        // // } else {
        // //     message.error(`登录失败：${(resp as any).msg}`)
        // // }

        // //二：js里面的in  放入ts 会有 类型收窄 的作用 
        // if ('data' in resp) {
        //     message.success('登录成功');
        //     memoryUtils.user = resp.data//保存到自定义的数据的工具模块
        //     storageUtils.saveUser(resp.data)//保存到store
        //     navigate('/');
        // } else {
        //     message.error(`登录失败：${resp.msg}`)
        // }

    };



    const validators = (_: any, value: any) => {
        if (!value) {
            return Promise.reject(new Error('密码必须输入'));
        } else if (value.length < 4) {
            return Promise.reject(new Error('密码长度不能小于4位'));
        } else if (value.length > 12) {
            return Promise.reject(new Error('密码长度不能大于12位'));
        } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
            return Promise.reject(new Error('密码必须是英文、数字或下划线组成'));
        } else {
            return Promise.resolve();// 验证通过
        }
    }

    return (
        <div className='login'>
            <header className='login-header'>
                <img src={image} alt="" />
                <h1>后台管理系统</h1>
            </header>
            <section className='login-content'>
                <div className={user.errorMsg ? 'error-msg show' : 'error-msg'}>{user.errorMsg}</div>
                <h2>用户登陆</h2>
                <Form
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    autoComplete="off"
                    className="login-form"
                >
                    <Form.Item
                        name="username"
                        initialValue={'admin'}
                        rules={[
                            { required: true, whitespace: true, message: '用户名必须输入' },
                            { min: 4, message: '用户名至少4位' },
                            { max: 12, message: '用户名最多12位' },
                            { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线组成' },
                        ]}
                    >
                        <Input
                            prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="账号"
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[
                            {
                                validator: validators
                            },
                        ]}
                    >
                        <Input
                            prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="密码"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                    </Form.Item>

                </Form>
            </section>
        </div>
    )
}



const mapStateToProps = state => ({
    user: state.users
})

const creators = {
    login,
};

export default connect(mapStateToProps, creators)(Login)