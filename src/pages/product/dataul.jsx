import React, { useEffect, useState } from 'react'
import {
    Card,
    List,
    Button,
    Typography,
    Avatar
} from 'antd'
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import LinkButton from '../../components/LinkButton';
import { BASE_IMG_URL } from '../../utils/constants'
import { reqCategory } from '../../api/index'

export default function ProductDetail() {
    const [cateIdO, setcateIdO] = useState('')//一级分类名称 
    const [cateIdT, setcateIdT] = useState('')//二级分类名称
    const navigate = useNavigate();
    const location = useLocation();
    const { pCategoryId, categoryId, name, desc, price, detail, imgs } = location.state.test;
    const titles = (
        <span>
            <Button type="link" onClick={() => { navigate('/products/product') }} icon={<ArrowLeftOutlined style={{ marginRight: 10, fontSize: 20 }} />} />
            <span>商品详情</span>
        </span>
    )
    useEffect(async () => {
        if (pCategoryId === '0') {
            const resule = await reqCategory(categoryId)
            console.log(resule)
            setcateIdO(resule.data.name)
        } else {
            const resule1 = await reqCategory(pCategoryId)
            const resule2 = await reqCategory(categoryId)
            console.log(resule1, resule2)
            setcateIdO(resule1.data.name)
            setcateIdT(resule2.data.name)
        }
       
    }, [])
    return (
        <Card title={titles} className='product-detail'>
            <List
                size="large"
                bordered
            >
                <List.Item className='noleft'>
                    <span className="left">商品名称:</span>
                    <span>{name}</span>
                </List.Item>
                <List.Item className='noleft'>
                    <span className="left">商品描述:</span>
                    <span>{desc}</span>
                </List.Item>
                <List.Item className='noleft'>
                    <span className="left">商品价格:</span>
                    <span>{price}元</span>
                </List.Item>
                <List.Item className='noleft'>
                    <span className="left">所属分类:</span>
                    <span>{cateIdO} {
                        cateIdT !== '' ? "->" + cateIdT : cateIdT
                    }</span>
                </List.Item>
                <List.Item className='noleft'>
                    <span className="left">商品图片:</span>
                    <span>
                        {
                            imgs.map(img => (
                                <img
                                    key={img}
                                    src={BASE_IMG_URL + img}
                                    className="product-img"
                                    alt="img"
                                />
                            ))
                        }
                    </span>
                </List.Item>
                <List.Item className='noleft'>
                    <span className="left">商品详情:</span>
                    <span dangerouslySetInnerHTML={{ __html: detail }}></span>
                </List.Item>
            </List>
        </Card>
    )
}
