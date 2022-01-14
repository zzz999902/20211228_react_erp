import React, { useEffect, useState } from 'react'
import {
    Card,
    Button,
    Form,
    Input,
    Cascader,
    message
} from 'antd'
import { reqCategorys, reqAddOrUpdateProduct } from '../../api'
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { formatCountdown } from 'antd/lib/statistic/utils';
import PicturesWall from './pictures-wall'
import RichTextEditor from './rich-text-editor'

const { TextArea } = Input;
export default function ProductAddUpdate() {
    const navigate = useNavigate();
    let ChildRef = React.createRef();
    let childRefD = React.createRef();
    const [form] = Form.useForm();
    const location = useLocation();
    const [isUpadte, setisUpadte] = useState(false)//页面名称
    const [options, setOptions] = useState([]);//二级菜单
    const [imagesO, setimagesO] = useState(location.state === null ? [] : location.state.test.imgs)
    const [detail, setdetail] = useState(location.state === null ? [] : location.state.test.detail)

    const titles = (
        <span>
            <Button type="link" onClick={() => { navigate('/products/product') }} icon={<ArrowLeftOutlined style={{ marginRight: 10, fontSize: 20 }} />} />
            <span>{isUpadte ? '修改商品' : '添加商品'}</span>
        </span>
    )

    //商品分类二级列表
    async function loadData(selectedOptions) {
        const targetOption = selectedOptions[selectedOptions.length - 1];
        targetOption.loading = true;

        const result = await getCategorys(targetOption.value)

        if (result && result.length > 0) {
            const cOprions = result.map(c => ({
                value: c._id,
                label: c.name,
                isLeaf: true,
            }))
            //关联到当前optiosn上
            targetOption.loading = false;
            targetOption.children = cOprions
        } else {
            //当前没有二级分类
            targetOption.isLeaf = true
        }
        setOptions([...options])
    };

    //from提交
    const onFinish = async (values: any) => {
        const { name, desc, price, categoryIds } = values
        let pCategoryId, categoryId
        if (categoryIds.length === 1) {
            pCategoryId = '0'
            categoryId = categoryIds[0]
        } else {
            pCategoryId = categoryIds[0]
            categoryId = categoryIds[1]
        }
        const detail = childRefD.current.getDetail()
        const imgs = ChildRef.current.getImgs()
        const product = { name, desc, price, detail, imgs, pCategoryId, categoryId }
        if (isUpadte) {
            product._id = location.state.test._id
        }
        const result = await reqAddOrUpdateProduct(product)
        if (result.status === 0) {
            message.success(`${isUpadte ? '更新' : '添加'}商品成功!`)
            navigate('/products/product')
        } else {
            message.error(`${isUpadte ? '更新' : '添加'}商品失败!`)
        }
    };

    //自定义 产生数组
    async function initOprions(data) {
        const options = data.map(c => ({
            value: c._id,
            label: c.name,
            isLeaf: false,
        }))
        if (isUpadte && location.state.test.pCategoryId !== '0') {
            // 获取对应的二级分类列表
            const subCategorys = await getCategorys(location.state.test.pCategoryId)
            // 生成二级下拉列表的options
            const childOptions = subCategorys.map(c => ({
                value: c._id,
                label: c.name,
                isLeaf: true
            }))

            // 找到当前商品对应的一级option对象
            const targetOption = options.find(option => option.value === location.state.test.pCategoryId)

            // 关联对应的一级option上
            targetOption.children = childOptions
        }
        setOptions([...options])
    }

    //请求商品分类列表
    async function getCategorys(Id) {
        const result = await reqCategorys(Id)
        if (result.status === 0) {
            if (Id === '0') {//如果是一级分类列表
                initOprions(result.data)
            } else {
                return result.data//返回二级列表
            }
        }
    }

    useEffect(() => {
        getCategorys('0')
        // 用来接收级联分类ID的数组
        console.log(location.state)
        // console.log(childRefD.current.getDetail(),ChildRef.current.getImgs())

        const categoryIds = []
        if (location.state) {
            setisUpadte(true)
            if (location.state.test.pCategoryId === '0') {
                categoryIds.push(location.state.test.categoryId)
            } else {
                categoryIds.push(location.state.test.pCategoryId)
                categoryIds.push(location.state.test.categoryId)
            }
            form.setFieldsValue({
                name: location.state.test.name,
                desc: location.state.test.desc,
                price: location.state.test.price,
                categoryIds: categoryIds,
            })
        }

    }, [])

    return (
        <Card title={titles} className='product-detail'>
            <Form
                onFinish={onFinish}
                form={form}
                wrapperCol={{ span: 14 }}
                labelCol={{ span: 4 }}
                initialValues={{ remember: true }}
            >
                <Form.Item
                    label="商品名称"
                    name="name"
                    rules={[{ required: true, message: '请输入商品名称!' }]}
                >
                    <Input allowClear={true} placeholder='请输入商品名称' />
                </Form.Item>

                <Form.Item
                    label="商品描述"
                    name="desc"
                    rules={[{ required: true, message: '请输入商品描述!' }]}
                >
                    <TextArea allowClear={true} placeholder='请输入商品描述' />
                </Form.Item>

                <Form.Item
                    label="商品价格"
                    name="price"
                    rules={[
                        { required: true, message: '请输入商品价格!' },
                        (_) => ({
                            validator(_, value) {
                                if (value * 1 > 0) {
                                    return Promise.resolve();// 验证通过
                                } else { // 验证没通过
                                    return Promise.reject(new Error('价格必须大于0'));
                                }
                            },
                        }),
                    ]}
                >
                    <Input placeholder='请输入价格' type='number' addonAfter="元"></Input>
                </Form.Item>

                <Form.Item
                    label="商品分类"
                    name="categoryIds"
                    rules={[{ required: true, message: '请选择商品分类!' }]}
                >
                    <Cascader
                        placeholder='请指定商品分类'
                        options={options} loadData={loadData} changeOnSelect
                    />
                </Form.Item>

                <Form.Item
                    label="商品图片"
                    name="imgs"
                >
                    <PicturesWall onRef={ChildRef} imgs={imagesO} />
                </Form.Item>

                <Form.Item
                    label="商品分类"
                    name="detail"
                    wrapperCol={{ span: 14 }}
                >
                    <RichTextEditor onRef={childRefD} details={detail} />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        提交
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    )
}
