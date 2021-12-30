import React, { useEffect } from 'react'
import './login.less'
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { reqLogin } from '../../api';
import { IDatas } from '../../api/CommonTypes';
import { useNavigate } from 'react-router-dom';
import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils';

export default function Login() {
    const navigate = useNavigate();
    const image = require('../../assets/logo.jpg');
    const user = memoryUtils.user
    
    useEffect(() => {
        if (user && user._id) {
            navigate('/');
            return
        }
    }, [])


    async function onFinish(values: IDatas) {
        const resp = await reqLogin(values)
        if (resp.data) {
            message.success('登录成功');
            memoryUtils.user = resp.data//保存到自定义的数据的工具模块
            storageUtils.saveUser(resp.data)//保存到store
            navigate('/');
        } else {
            message.error(`登录失败：${resp.msg}`)
        }
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
