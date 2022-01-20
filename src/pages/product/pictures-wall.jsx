import { Upload, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import React, { useEffect, useState, useImperativeHandle } from 'react'
import { reqDeleteImg } from '../../api'
import { BASE_IMG_URL } from "../../utils/constants";
function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

function PicturesWall(props) {
    const [previewVisible, setpreviewVisible] = useState(false)
    const [previewImage, setpreviewImage] = useState('')
    const [previewTitle, setpreviewTitle] = useState('')
    const [fileList, setfileList] = useState([])


    /*
     * 获取所有已上传图片文件名的数组
     */
    const getImgs = () => {
        return fileList.map(file => file.name)
    }
    //用useImperativeHandle暴露一些外部ref能访问的属性
    useImperativeHandle(props.onRef, () => {
        return {
            getImgs: getImgs,
        };
    });
    const handleCancel = () => setpreviewVisible(false)

    const handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        setpreviewImage(file.url || file.preview)
        setpreviewVisible(true)
        setpreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1))
    };

    const handleChange = async ({ file, fileList }) => {

        // 一旦上传成功, 将当前上传的file的信息修正(name, url)
        if (file.status === 'done') {
            const result = file.response  // {status: 0, data: {name: 'xxx.jpg', url: '图片地址'}}
            if (result.status === 0) {
                message.success('上传图片成功!')
                const { name, url } = result.data
                file = fileList[fileList.length - 1]
                file.name = name
                file.url = url
            } else {
                message.error('上传图片失败')
            }
        } else if (file.status === 'removed') { // 删除图片
            const result = await reqDeleteImg(file.name)
            if (result.status === 0) {
                message.success('删除图片成功!')
            } else {
                message.error('删除图片失败!')
            }
        }

        // 在操作(上传/删除)过程中更新fileList状态
        setfileList(fileList)
    };

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    useEffect(() => {
        const { imgs } = props
        if (imgs && imgs.length > 0) {
            const fileLists = imgs.map((img, index) => ({
                uid: -index, // 每个file都有自己唯一的id
                name: img, // 图片文件名
                status: 'done', // 图片状态: done-已上传, uploading: 正在上传中, removed: 已删除
                url: BASE_IMG_URL + img
            }))
            setfileList(fileLists)
        }
    }, [])
    return (
        <>
            <Upload
                action="/manage/img/upload"
                accept='image/*'  /*只接收图片格式*/
                name='image' /*请求参数名*/
                listType="picture-card"  /*卡片样式*/
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
            >
                {fileList.length >= 8 ? null : uploadButton}
            </Upload>
            <Modal
                visible={previewVisible}
                title={previewTitle}
                footer={null}
                onCancel={handleCancel}
            >
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
        </>

    );
}

export default PicturesWall 