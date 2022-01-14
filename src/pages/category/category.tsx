import React, {  useEffect, useState } from 'react'
import { Card, Table, Space, Button, message } from 'antd';
import { PlusCircleOutlined, ArrowRightOutlined } from '@ant-design/icons';
import LinkButton from '../../components/LinkButton';
import { reqCategorys } from '../../api';
import AddFrom from './addFrom';
import EditFrom from './editFrom';


export default function Category() {
    const [categorys, setcategorys] = useState([])//一级分类列表显示
    const [categorysLoadin, setcategorysLoadin] = useState(true)//table loadin
    const [subCategorys, setsubCategorys] = useState([])//二级分类列表显示
    const [parentId, setParentId] = useState('0')//父分类ID
    const [parentName, setparentName] = useState('')//父分类名称
    const [isModalVisible, setIsModalVisible] = useState('0');//0不显示 1添加 2修改
    const [category, setcategory] = useState('')//修改名称
    const [categoryId, setcategoryId] = useState('')
    const title = parentId === '0' ? '一级列表分类' : (
        <span>
            <LinkButton onClick={() => {
                setParentId('0')
                setparentName('')
                setsubCategorys([])
                setcategorysLoadin(true)
            }
            }>一级列表分类 </LinkButton>
            <ArrowRightOutlined style={{ margin: "0 10px" }} />
            <span>{parentName}</span>
        </span>
    )
    const extra = (<Button onClick={() => setIsModalVisible('1')} shape="round" type="primary" icon={<PlusCircleOutlined />}>添加</Button>)



    function showModal() {
        setIsModalVisible('0');
    }

    
    const columns = [
        {
            title: '分类名称',
            dataIndex: 'name',
            key: 'name',
            width: "70%"
        },
        {
            title: '操作',
            key: 'action',
            render: (_, text) => (
                <Space size="middle">
                    <LinkButton onClick={() => {
                        setIsModalVisible('2')
                        setcategory(text.name)
                        setcategoryId(text._id)
                    }}>修改分类</LinkButton>
                    {
                        parentId !== '0' ? "" :
                            <LinkButton onClick={() => {
                                setParentId(text._id)
                                setparentName(text.name)
                                setcategorysLoadin(true)
                            }}>查看子分类</LinkButton>
                    }
                </Space>
            ),
        },
    ];


    function init(id) {
        let padgid = id || parentId
        reqCategorys(padgid).then(r => {

            if (r.status === 0) {
                if (padgid === '0') {
                    setcategorys(r.data)//一级
                } else {
                    setsubCategorys(r.data)//二级
                }
            } else {
                message.error('获取分类列表失败')
            }
            setcategorysLoadin(false)

        })
    }

    useEffect(() => {
        init(parentId)
    }, [parentId])


    return (
        <div className='category'>

            <Card title={title} extra={extra}>
                <Table
                    rowKey="_id"
                    columns={columns}
                    dataSource={parentId === '0' ? categorys : subCategorys}
                    bordered
                    pagination={{
                         defaultPageSize: 10, 
                         showQuickJumper: true }}
                    loading={categorysLoadin}
                />
            </Card>
            {
                isModalVisible === '1' ?
                    <AddFrom init={init} parentId={parentId} categorys={categorys} showModal={showModal} isModalVisible={isModalVisible} />
                    :
                    <EditFrom init={init} categoryId={categoryId} showModal={showModal} isModalVisible={isModalVisible} category={category} />
            }
        </div>
    )
}
