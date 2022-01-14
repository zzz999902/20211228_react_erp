import { Form, Input, Modal, message, Select } from 'antd'
import React, { useState, useEffect } from 'react'
import { reqUpdateUser } from '../../api/index'
const { Option } = Select;
export default function AddFrom({ userFrom = {}, initClumns, rolest, delemoladAdd, isModalVisible }) {
    const formItemLayout = {
        labelCol: { span: 4 },  // 左侧label的宽度
        wrapperCol: { span: 15 }, // 右侧包裹的宽度
    }
    const [form] = Form.useForm()
    // const [user, setUser] = useState(userFrom || {})

    function handleOk() {
        form.validateFields().then(async values => {
            values._id = userFrom._id
            const result = await reqUpdateUser(values)
            if (result.status === 0) {
                message.success('修改成功')
                initClumns()
                form.resetFields()
                delemoladAdd()
            }
        })
    }

    useEffect(() => {
        if (userFrom !== {}) {
            form.setFieldsValue({
                username: userFrom.username,
                phone: userFrom.phone,
                email: userFrom.email,
                role_id: userFrom.role_id,
            })
        }
    }, [userFrom])

    return (
        <Modal
            title='修改用户'
            visible={isModalVisible !== '0'}
            onOk={handleOk}
            onCancel={() => {
                delemoladAdd()
                form.resetFields()
            }}
        >
            <Form
                name="basic"
                form={form}
                {...formItemLayout}
            >
                <Form.Item
                    label="用户名:"
                    name="username"

                    rules={[{ required: true, message: '用户名必须输入' }]}
                >
                    <Input placeholder='请输入用户名' />
                </Form.Item>
                {
                    userFrom._id ? null : (
                        <Form.Item
                            label="密码:"
                            name="password"
                            rules={[{ required: true, message: '密码必须输入' }]}
                        >
                            <Input type='password' placeholder='请输入密码' />
                        </Form.Item>
                    )
                }
                <Form.Item
                    label="手机号:"
                    name="phone"
                >
                    <Input placeholder='请输入手机号' />
                </Form.Item>
                <Form.Item
                    label="邮箱:"
                    name="email"
                >
                    <Input placeholder='请输入邮箱' />
                </Form.Item>
                <Form.Item
                    label="角色:"
                    name="role_id"
                >
                    <Select placeholder="请选择角色">
                        {
                            rolest.map(role => <Option key={role._id} value={role._id}>{role.name}</Option>)
                        }
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    )
}
