import React, { useState, useEffect } from 'react'
import { Card, Select, Input, Button, Table, Space, message } from 'antd'
import { PlusCircleOutlined, ArrowRightOutlined } from '@ant-design/icons';
import LinkButton from '../../components/LinkButton';
import { reqProducts, reqSearchProducts, reqUpdateStatus } from '../../api/index'
import { PAGE_SIZE } from '../../utils/constants'
import { useNavigate } from 'react-router-dom';
const { Option } = Select;
export default function ProductHome() {
    let navigate = useNavigate();
    const [dataSource, setdataSource] = useState([])//数据
    const [totals, settotals] = useState(0)//数据总数
    const [categorysLoadin, setcategorysLoadin] = useState(true)//table loadi
    const [serchName, setserchName] = useState('')//搜索关键字
    const [serchType, setserchType] = useState('productName')//根据哪个字段搜索
    const [reqProd, setreqProd] = useState({
        pageNum: 1,
        pageSize: PAGE_SIZE
    })

    const Catdtitle = (
        <Space>
            <Select value={serchType} onChange={(v) => setserchType(v)}>
                <Option value="productName">按名称搜索</Option>
                <Option value="productDesc">按描述搜索</Option>
            </Select>
            <Input placeholder="关键字" value={serchName} onChange={(e) => setserchName(e.target.value)} />
            <Button shape="round" type="primary" onClick={() => getProducts()}>搜索</Button>
        </Space>
    )


    const CardButton = (
        <Button shape="round" type="primary" onClick={() => navigate('/products/product/addupdate')} icon={<PlusCircleOutlined />}>添加商品</Button>
    )

    const columns = [
        {
            title: '商品名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '商品描述',
            dataIndex: 'desc',
            key: 'desc',
        },
        {
            title: '价格',
            dataIndex: 'price',
            key: 'price',
            render: (text) => <a>￥{text}</a>
        },
        {
            title: '状态',
            key: 'status',
            width: '100px',
            align: 'center',
            render: (text) => {
                const { status, _id } = text
                const newStatus = status === 1 ? 2 : 1
                return (
                    <div style={{ textAlign: "center" }}>
                        <Button type='primary' onClick={() => updateStatus(newStatus, _id)}>{status === 1 ? '下架' : '上架'}</Button>
                        <span>{status === 1 ? '在售' : '已下架'}</span>
                    </div>
                )
            }
        },
        {
            title: '操作',
            width: '100px',
            align: 'center',
            render: (text) =>
            (<div style={{ textAlign: "center" }}>
                <LinkButton onClick={() => navigate('/products/product/detaul', { state: { test: text } })}>详情</LinkButton>
                <LinkButton onClick={() => navigate('/products/product/addupdate', { state: { test: text } })}>修改</LinkButton>
            </div >)
        },
    ];

    async function updateStatus(status, productId) {
        const result = await reqUpdateStatus(productId, status)
        console.log(result)
        const succes = status === 1 ? '下架' : '上架'
        if (result.status === 0) {
            message.success(`${succes}成功`);
            //刷新本页数据 error
        }
    }

    async function getProducts() {
        let result;
        console.log(reqProd)
        if (serchName) {
            result = await reqSearchProducts({ ...reqProd, serchName, serchType })
            // if (reqProd.pageNum !== 1) {
            //     setreqProd({
            //         pageNum: 1,
            //         pageSize: PAGE_SIZE
            //     })
            // }
        } else {
            result = await reqProducts(reqProd)
        }
        if (result.status === 0) {
            console.log(result)
            const { list, total } = result.data
            settotals(total)
            setdataSource(list)
        }
        setcategorysLoadin(false)
    }

    useEffect(() => {
        getProducts()
    }, [reqProd])

    return (
        <Card title={Catdtitle} extra={CardButton}>
            <Table
                rowKey={'_id'}
                dataSource={dataSource}
                columns={columns}
                bordered={true}
                loading={categorysLoadin}
                pagination={{
                    current: reqProd.pageNum,
                    defaultPageSize: PAGE_SIZE,
                    total: totals,
                    showQuickJumper: true,
                    onChange(pageNum, pageSize) {
                        setreqProd({
                            pageNum,
                            pageSize,
                        })
                        // getProducts()
                    }
                }}
            />
        </Card>
    )
}
