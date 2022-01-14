import React, { useState, useEffect } from 'react'
import { Button, Card, Space, Table } from 'antd';
import { PAGE_SIZE } from '../../utils/constants';
import { reqRoles } from '../../api/index'
import AddFrom from './add-form';
import AudhForm from './auth-form'
import { formateDate } from '../../utils/dataUtils'

export default function Role() {
    const [roles, setRoles] = useState([]) // 所有角色的列表
    const [role, setRole] = useState({})// 选中的role
    const [isModalAdd, setisModalAdd] = useState(false)//显示创建角色
    const [isModalAuth, setisModalAuth] = useState(false)//显示设置角色权限

    const title = (
        <Space>
            <Button shape="round" type='primary' onClick={() => setisModalAdd(true)} >创建角色</Button>
            <Button shape="round" disabled={!role._id} onClick={() => setisModalAuth(true)} type='primary' >设置角色权限</Button>
        </Space>
    )


    const columns = [
        {
            title: '角色名称',
            dataIndex: 'name'
        },
        {
            title: '创建时间',
            dataIndex: 'create_time',
            render: (create_time) => formateDate(create_time)
        },
        {
            title: '授权时间',
            dataIndex: 'auth_time',
            render: formateDate
        },
        {
            title: '授权人',
            dataIndex: 'auth_name'
        },
    ];

    const onRow = (role) => {
        setRole(role)
    }

    async function getRoles() {
        const reslt = await reqRoles()
        if (reslt.status === 0) {
            setRoles(reslt.data)
        }

    }

    function delemoladAdd() {
        setisModalAdd(false)
    }

    function delemoalAuth() {
        setisModalAuth(false)
    }

    useEffect(() => {
        getRoles()
    }, [])

    return (
        <Card title={title} >
            <Table
                rowKey='_id'
                dataSource={roles}
                columns={columns}
                // pagination={{ defaultPageSize: 10 }}
                bordered
                rowSelection={{
                    type: 'radio',
                    selectedRowKeys: [role._id],
                    onSelect: (role) => {
                        setRole(role)
                    }
                }}
                onRow={record => {
                    return {
                        onClick: event => onRow(record), // 点击行
                    };
                }}
            />;
            <AddFrom getRoles={getRoles} delemoladAdd={delemoladAdd} isModalAdd={isModalAdd} ></AddFrom>
            <AudhForm getRoles={getRoles} role={role} isModalAuth={isModalAuth} delemoalAuth={delemoalAuth}></AudhForm>
        </Card>
    )
}
