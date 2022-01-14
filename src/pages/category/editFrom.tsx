import {  Form, Input, message, Modal } from 'antd'
import React, {  useEffect } from 'react'
import { reqEditCategorys } from '../../api';
function EditFrom({ init, categoryId, showModal, isModalVisible, category }) {
    const [form] = Form.useForm()

    function handleEditOk() {
        form.validateFields().then(async values => {
            const { categoryName } = values
            const resp = await reqEditCategorys({ categoryId, categoryName })
            console.log(resp.status)
            if (resp.status === 0) {
                message.success("修改成功！")
                showModal()
                init()
            } else {
                message.error("修改失败！")
            }
        }).catch(err => {
            console.log('err', err)
        })
    }

    useEffect(() => {
        if (category) {
            form.setFieldsValue({ categoryName: category });
        }
    }, [category])
    return (
        <Modal title="修改分类" visible={isModalVisible === '2'} onOk={handleEditOk} onCancel={() => showModal()}>
            <Form
                name="basic"
                form={form}

                autoComplete="off"
            >
                <Form.Item
                    name="categoryName"
                    initialValue={category}
                    rules={[
                        {
                            required: true,
                            message: '分类名称必须输入!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    )
}
export default EditFrom