import React, { Component } from 'react'
import { Select, Row, Col, DatePicker, Space, Form, Button, Card } from 'antd';
import { FormInstance } from 'antd/es/form';
// 以下4行引入解决日期控件英文的问题
import moment from 'moment'
import locale from 'antd/lib/date-picker/locale/zh_CN'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

const { Option } = Select;
const { RangePicker } = DatePicker;
const borderb = {
  borderRadius: "10px"
}
export default class traffic extends Component {

  formRef = React.createRef();
  state = {
    isData: undefined, //判断年月日
    objecst: {//模拟访问量
      nb: 100,
      dl: 200,
      ggys: 400,
      zj: 300
    }
  }

  constructor(props) {
    super(props)
  }

  componentDidMount(){
    
  }

  //年月周选择
  handleChange = (value) => {
    this.setState({
      isData: value
    })
  }

  //查询
  onFinish = (values) => {
    console.log(this.handlExport(values));
  };

  //时间转换
  handlExport = (values) => {
    values.decisionTimeStart = values.decisionTimeEnd[0].format('YYYY-MM-DD')
    values.decisionTimeEnd = values.decisionTimeEnd[1].format('YYYY-MM-DD')
    return values
  }

  render() {
    return (
      <Form ref={this.formRef} name="control-ref" onFinish={this.onFinish}>
        <Row style={{ padding: '20px' }}>
          <Col span={2}>
            <Form.Item name='choose'>
              <Select placeholder="请选择" onChange={(v) => this.handleChange(v)}>
                <Option value="year">年</Option>
                <Option value="month">月</Option>
                <Option value="week">周</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col offset={1} span={6}>
            <Form.Item name="decisionTimeEnd">
              <RangePicker locale={locale} separator='至' picker={this.state.isData} />
            </Form.Item>
          </Col>
          <Col span={14} style={{ textAlign: 'right' }}>
            <Form.Item>
              <Space>
                <Button shape="round" type="primary" htmlType="submit">
                  查询
                </Button>
                <Button shape="round" htmlType="button" onClick={() => this.formRef.current.resetFields()}>
                  重置
                </Button>
              </Space>
            </Form.Item>
          </Col>
        </Row>
        <div style={{ padding: '0px 20px' }}>
          <h1 style={{ fontWeight: 'bold', fontSize: '18px' }}>访问量</h1>
          <Row gutter={16} >
            <Col flex={1}>
              <Card style={{ ...borderb }}>
                <span>内部用户</span>
                <div>
                  <span style={{ fontSize: '26px' }}>{this.state.objecst.nb}</span>
                  <span>个</span>
                </div>
              </Card>
            </Col>
            <Col flex={1}>
              <Card style={{ ...borderb }}>
                <span>代理用户</span>
                <div>
                  <span style={{ fontSize: '26px' }}>{this.state.objecst.dl}</span>
                  <span>个</span>
                </div>
              </Card>
            </Col>
            <Col flex={1}>
              <Card style={{ ...borderb }}>
                <span>供应商</span>
                <div>
                  <span style={{ fontSize: '26px' }}>{this.state.objecst.ggys}</span>
                  <span>个</span>
                </div>
              </Card>
            </Col>
            <Col flex={1}>
              <Card style={{ ...borderb }}>
                <span>专家</span>
                <div>
                  <span style={{ fontSize: '26px' }}>{this.state.objecst.zj}</span>
                  <span>个</span>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </Form >
    )
  }
}
