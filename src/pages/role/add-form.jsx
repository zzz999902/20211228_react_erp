import { Form, Input, Modal, message } from 'antd'
import React from 'react'
import { reqAddRole } from '../../api/index'
export default function AddFrom({ getRoles, delemoladAdd, isModalAdd }) {

    const [form] = Form.useForm()

    function handleOk() {
        form.validateFields().then(async values => {
            const { roleName } = values
            const resp = await reqAddRole(roleName)
            if (resp.status === 0) {
                message.success("添加成功！")
                form.resetFields()
                getRoles()
                delemoladAdd()
            } else {
                message.error("添加失败！")
            }
        })
    }


    return (
        <Modal
            title="添加分类"
            visible={isModalAdd}
            onOk={handleOk}
            onCancel={() => {
                delemoladAdd()
            }}
        >
            <Form
                name="basic"
                layout="vertical"
                form={form}
            >
                <Form.Item
                    label="角色名称:"
                    name="roleName"
                    rules={[{ required: true, message: '角色名称必须输入' }]}
                >
                    <Input placeholder='请输入角色名称' />
                </Form.Item>
            </Form>
        </Modal>
    )
}
