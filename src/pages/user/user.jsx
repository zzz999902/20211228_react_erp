import React, { useState, useEffect } from 'react'
import { Button, Card, Space, Table, Modal, message } from 'antd';
import LinkButton from '../../components/LinkButton';
import { reqUsers, reqDeleteUser } from '../../api/index'
import { formateDate } from '../../utils/dataUtils'
import UserFrom from './user-from'
import UserDele from './userdele'
import { ExclamationCircleOutlined } from '@ant-design/icons';
const { confirm } = Modal;

export default function Role() {
    const title = (
        <Space>
            <Button shape="round" type='primary' onClick={() => {
                setIsModalVisible('1')
            }} >创建角色</Button>
        </Space>
    )

    const [roles, setRoles] = useState([])//users
    const [rolest, setrolest] = useState([])//roles
    const [roleNames, setroleNames] = useState([])//名字合集
    const [isModalVisible, setIsModalVisible] = useState('0');//0不显示 1添加 2修改
    const [users, setusers] = useState({})//用户列表
    const [userFrom, setuserFrom] = useState()

    function delemoladAdd() {
        setIsModalVisible('0')
    }

    /*
     * 根据role的数组, 生成包含所有角色名的对象(属性名用角色id值)
     *///error
    const initRoleNames = (roles) => {
        const roleNames = roles.reduce((pre, role) => {
            pre[role._id] = role.name
            return pre
        }, {})
        // 保存
        setroleNames(roleNames)
    }

    //列表获取
    const initClumns = async () => {
        const reslt = await reqUsers()
        if (reslt.status === 0) {
            setRoles(reslt.data.users)
            setrolest(reslt.data.roles)
            initRoleNames(reslt.data.roles)
        }
    }


    const reqDeleteUsers = (user) => {
        confirm({
            title: `确定要${user.username}删除吗?`,
            icon: <ExclamationCircleOutlined />,
            okText: 'Yes',
            cancelText: 'No',
            onOk: async () => {
                const result = await reqDeleteUser(user._id)
                if (result.status === 0) {
                    message.success('删除用户成功!')
                    initClumns()
                }
            },
        });
    }

    const columns = [
        {
            title: '姓名',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: '邮箱',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: '电话',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: '注册时间',
            dataIndex: 'create_time',
            key: 'create_time',
            render: formateDate
        },
        {
            title: '所属角色',
            dataIndex: 'role_id',
            key: 'role_id',
            render: id => roleNames[id]
        },
        {
            title: '操作',
            render: (user) => (
                <span>
                    <LinkButton onClick={() => {
                        setIsModalVisible('2')
                        setuserFrom(user)
                    }} >修改</LinkButton>
                    <LinkButton onClick={() => {
                        reqDeleteUsers(user)
                    }}>删除</LinkButton>
                </span>
            )
        },
    ];

    useEffect(() => {
        initClumns()
    }, [])

    return (
        <Card title={title} >
            <Table
                rowKey='_id'
                dataSource={roles}
                columns={columns}
                bordered
            />
            {isModalVisible === '1' ?
                <UserFrom
                    rolest={rolest}
                    delemoladAdd={delemoladAdd}
                    isModalVisible={isModalVisible}
                    initClumns={initClumns}
                />
                :
                null
            }

            {
                isModalVisible === '2' ? <UserDele
                    delemoladAdd={delemoladAdd}
                    isModalVisible={isModalVisible}
                    initClumns={initClumns}
                    userFrom={userFrom}
                    rolest={rolest}
                /> : null
            }
        </Card>
    )
}
