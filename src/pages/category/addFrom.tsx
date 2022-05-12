import { Form, Select, Input, Modal, message } from 'antd'
import React from 'react'
import { reqAddCategorys } from '../../api';

const { Option } = Select;
export default function AddFrom({ init, parentId, categorys, showModal, isModalVisible }) {
    const [form] = Form.useForm()
    function handleOk() {
        form.validateFields().then(async values => {
            const { parentId, categoryName } = values
            const resp = await reqAddCategorys(parentId, categoryName)
            if (resp.status === 0) {
                if (parentId === parentId) {
                    init()
                } else if (parentId === '0') {
                    // 在二级分类列表下添加一级分类, 重新获取一级分类列表, 但不需要显示一级列表
                    init('0')
                }
                message.success("添加成功！")
                showModal()
            } else {
                message.error("添加失败！")
            }
        })
    }


    return (
        <Modal title="添加分类" visible={isModalVisible === '1'}
            onOk={handleOk}
            onCancel={() => showModal()}>
            <Form
                name="basic"
                layout="vertical"
                form={form}
            >
                <Form.Item
                    label="所属分类:"
                    name="parentId"
                    rules={[{ required: true, message: 'Province is required' }]}
                    initialValue={parentId}
                >
                    <Select>
                        <Option value='0'>一级分类</Option>
                        {
                            categorys.map(c => <Option key={c._id} value={c._id}>{c.name}</Option>)
                        }
                    </Select>
                </Form.Item>
                <Form.Item
                    label="分类名称:"
                    name="categoryName"
                    rules={[{ required: true, message: '分类名称必须输入' }]}
                >
                    <Input placeholder='请输入分类名称' />
                </Form.Item>
            </Form>
        </Modal>
    )
}
