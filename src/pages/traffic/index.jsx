import React, { Component } from 'react'
import { Select, Row, Col, DatePicker, Space, Form, Button, Card, message } from 'antd';
// import { FormInstance } from 'antd/es/form';
import { MailOutlined } from '@ant-design/icons';
import Pie from './components/pie'
import Line from './components/line'
// 以下4行引入解决日期控件英文的问题
import moment from 'moment'
import locale from 'antd/lib/date-picker/locale/zh_CN'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')


const { Option } = Select;
const { RangePicker } = DatePicker;
const borderb = {
  borderRadius: "10px",
  // backgroundImage: linear-gradient("to left", '#FFF', '#0085D0')
}
export default class traffic extends Component {

  formRef = React.createRef();
  state = {
    isData: undefined, //判断年月日
    isOpen: false,
    dates: [],
    hackValue: undefined,
    value: undefined,
    objecst: {//模拟访问量
      nb: 100,
      dl: 200,
      ggys: 400,
      zj: 300
    }
  }

  // constructor(props) {
  //   super(props)
  // }

  componentDidMount() {

  }

  //年月周选择
  handleChange = (value) => {
    this.setState({
      isData: value,
    })
    //清除之前的范围
    this.formRef.current.setFieldsValue({
      decisionTimeEnd: undefined
    })
  }

  //查询
  onFinish = (values) => {
    console.log(this.handlExport(values));
  };

  disabledDate = current => {
    if (!this.state.dates || this.state.dates.length === 0) {
      return false;
    }
    var data;
    if (this.state.isData === 'year') {
      data = 730
    } else if (this.state.isData === 'month') {
      data = 365
    } else if (this.state.isData === 'date') {
      data = 7
    }
    const tooLate = this.state.dates[0] && current.diff(this.state.dates[0], 'days') > data;
    const tooEarly = this.state.dates[1] && this.state.dates[1].diff(current, 'days') > data;
    return tooEarly || tooLate;
  };

  onOpenChange = open => {
    if (this.state.isData !== undefined) {
      if (open) {
        this.setState({
          dates: [],
          hackValue: [],
          isOpen: true,
        })
      } else {
        this.setState({
          isOpen: false,
          hackValue: undefined
        })
      }
    } else {
      message.info('请先选择查询维度！');
    }
  };


  onCalendarChange = val => {
    if (this.state.isData === 'date') {
      var time = 86400000 * 7
      const start = new Date(val[0].format('YYYY-MM-DD')).getTime() + time//截止时间
      const setStart = moment(new Date(val[0].format('YYYY-MM-DD')).getTime()).format('YYYY-MM-DD')
      const setEnd = moment(start).format('YYYY-MM-DD')
      this.formRef.current.setFieldsValue({
        decisionTimeEnd: [moment(setStart), moment(setEnd)]
      })
    }
    this.setState({ dates: val })
  }

  render() {
    return (
      <Form ref={this.formRef} name="control-ref" onFinish={this.onFinish}>
        <Row style={{ padding: '20px' }}>
          <Col span={2}>
            <Form.Item name='choose'>
              <Select placeholder="请选择" onChange={(v) => this.handleChange(v)}>
                <Option value="year">年份</Option>
                <Option value="month">月份</Option>
                <Option value="date">周</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col offset={1} span={6}>
            <Form.Item name="decisionTimeEnd">
              <RangePicker
                open={this.state.isOpen}
                value={this.state.hackValue || this.state.value}
                disabledDate={(current) => this.disabledDate(current)}
                onCalendarChange={val => this.onCalendarChange(val)}
                onChange={val => this.setState({ value: val })}
                onOpenChange={(open) => this.onOpenChange(open)}
                locale={locale}
                picker={this.state.isData}
              />
            </Form.Item>
          </Col>
          <Col span={14} offset={1} style={{ textAlign: 'right' }}>
            <Form.Item>
              <Space>
                <Button style={{ borderRadius: '5px', marginRight: '15px' }} type="primary" htmlType="submit">
                  查询
                </Button>
                <Button style={{ borderRadius: '5px' }} htmlType="button" onClick={() => {
                  this.formRef.current.resetFields()
                  this.setState({
                    isData: undefined,
                    isOpen: false,
                  })
                }}>
                  重置
                </Button>
              </Space>
            </Form.Item>
          </Col>
        </Row>
        <div style={{ padding: '0px 20px' }}>
          <Row style={{ padding: '0 5px' }}>
            <Col span={8}>
              <h1 style={{ fontWeight: 'bold', fontSize: '18px' }}>访问量</h1>
            </Col>
            <Col span={8} offset={8}>
              <Button type="link" style={{ float: 'right' }} icon={<MailOutlined />} onClick={() => this.export()}>
                导出
              </Button>
            </Col>
          </Row>
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
          <Row style={{ padding: '30px 0px' }}>
            <Col span={5}  >
              <Pie objecst={this.state.objecst} />
            </Col>
            <Col span={19} >
              <Line objecst={this.state.objecst} />
            </Col>

          </Row>
        </div>
      </Form >
    )
  }
}
