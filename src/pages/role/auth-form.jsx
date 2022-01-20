import { Form, Input, Modal, message, Tree } from 'antd'
import FormItemLabel from 'antd/lib/form/FormItemLabel';
import React, { useState, useEffect } from 'react'
import { reqAddRole, reqUpdateRole } from '../../api/index'
import menuList from '../../config/menuConfig'
// import memoryUtils from '../../utils/memoryUtils'
import { useNavigate } from 'react-router-dom';
// import storageUtils from '../../utils/storageUtils';

import { logout } from '../../redux/action/loginUserAction';
import { connect } from 'react-redux';

const { TreeNode } = Tree;

function AddFrom({ user, logout, getRoles, role, delemoalAuth, isModalAuth }) {
    const [checkedKeys, setCheckedKeys] = useState(role.menus)
    const navigate = useNavigate();
    const [form] = Form.useForm()
    async function handleOk() {
        role.menus = checkedKeys
        role.auth_name = user.username
        const resp = await reqUpdateRole(role)
        if (resp.status === 0) {
            if (role._id === user.role_id) {
                // memoryUtils.user = {}
                // storageUtils.removeUser()
                logout()
                // navigate('/login')
                message.warning("当前用户角色得权限修改了,请重新登录！")
            } else {
                message.success("设置权限成功！")
                getRoles()
                delemoalAuth()
            }
        } else {
            message.error("设置权限失败！")
        }
    }


    const onCheck = (checkedKeysValue) => {
        setCheckedKeys(checkedKeysValue);
    };

    useEffect(() => {
        form.setFieldsValue({
            roleName: role.name
        })
        setCheckedKeys(role.menus)
    }, [role])

    return (
        <Modal
            title="设置角色权限"
            visible={isModalAuth}
            onOk={handleOk}
            onCancel={() => {
                delemoalAuth()
                setCheckedKeys(role.menus)
            }}
        >
            <Form
                name="basic"
                form={form}
            >
                <Form.Item
                    label="角色名称:"
                    name="roleName"
                    wrapperCol={{ span: 18 }}
                >
                    <Input disabled />
                </Form.Item>
                <Form.Item>
                    <Tree
                        checkable
                        defaultExpandAll
                        checkedKeys={checkedKeys}
                        onCheck={onCheck}
                        treeData={[
                            {
                                title: '平台权限',
                                key: 'all',
                                children: menuList
                            }
                        ]}
                    >
                    </Tree>
                </Form.Item>
            </Form>

        </Modal >
    )
}


const mapStateToProps = state => ({
    user: state.users
})

const creators = {
    logout
};

export default connect(mapStateToProps, creators)(AddFrom)