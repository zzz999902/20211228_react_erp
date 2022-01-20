import React from 'react'
import './index.less'
import { Button, Row, Col } from 'antd'
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { setHeadTitle } from '../../redux/action/setHeadTitle'

function NorFound(props) {
    let navigate = useNavigate();

    const getHome = () => {
        props.setHeadTitle('首页')
        navigate('/home')
    }

    return (
        <Row className='not-found'>
            <Col span={12} className='left'></Col>
            <Col span={12} className='right'>
                <h1>404</h1>
                <h2>抱歉，你访问的页面不存在</h2>
                <div>
                    <Button type='primary' onClick={() => getHome()}>
                        回到首页
                    </Button>
                </div>
            </Col>
        </Row>
    )
}

export default connect(null, { setHeadTitle })(NorFound)