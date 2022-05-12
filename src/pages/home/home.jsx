import React, { useRef, useState } from 'react'
import './home.less'
import { Card, Statistic, Timeline, DatePicker } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined, SettingOutlined, UndoOutlined, ClockCircleOutlined } from '@ant-design/icons';
import Line from './line'
import Bar from './bar'
import moment from 'moment';
import { formateDate } from '../../utils/dataUtils';


const { RangePicker } = DatePicker;
export default function Home() {
    const dateFormat = 'YYYY/MM/DD'
    const [currentTime, setcurrentTime] = useState(formateDate((Date.now())))//时间
    const [isVisited, setisVisited] = useState(true)

    const handleChange = (s) => {
        setisVisited(s)
    }


    return (
        <div className='home'>
            <Card
                size="small"
                className="home-card"
                title="商品总量"
                extra={<SettingOutlined key="setting" />} style={{ width: 300 }}
                style={{ width: 250 }}
                headStyle={{ color: 'rgba(0,0,0,.45)' }}
            >
                <Statistic
                    value={1128163}
                    suffix="个"
                    style={{ fontWeight: 'bolder' }}
                />
                <Statistic
                    title="周同比"
                    value={11.28}
                    precision={2}
                    valueStyle={{ color: '#3f8600' }}
                    prefix={<ArrowUpOutlined />}
                    suffix="%"
                />
                <Statistic
                    title="日同比"
                    value={9.3}
                    precision={2}
                    valueStyle={{ color: '#cf1322' }}
                    prefix={<ArrowDownOutlined />}
                    suffix="%"
                />
            </Card>

            <Line />

            <Card
                className="home-content"
                title={
                    <div className="home-menu">
                        <span className={isVisited ? "home-menu-active home-menu-visited" : 'home-menu-visited'}
                            onClick={() => handleChange(true)}>访问量</span>

                        <span className={isVisited ? "" : 'home-menu-active'} onClick={() => handleChange(false)}>销售量</span>
                    </div>
                }
                extra={<RangePicker defaultValue={[moment(currentTime, dateFormat), moment(currentTime, dateFormat)]} />}
            >
                <Card
                    title={isVisited ? '访问趋势' : '销售趋势'}
                    extra={<UndoOutlined />}
                    bodyStyle={{ padding: 0, height: 275 }}
                    className="home-table-left"
                >
                    <Bar></Bar>
                </Card>

                <Card title="任务" extra={<UndoOutlined />} className="home-table-right">
                    <Timeline>
                        <Timeline.Item>新版本迭代会</Timeline.Item>
                        <Timeline.Item>完成网站设计初版</Timeline.Item>
                        <Timeline.Item dot={<ClockCircleOutlined className="timeline-clock-icon" />} color="red">
                            <p>联调接口</p>
                            <p>功能验收</p>
                        </Timeline.Item>
                        <Timeline.Item>
                            <p>登录功能设计</p>
                            <p>权限验证</p>
                            <p>页面排版</p>
                        </Timeline.Item>
                    </Timeline>
                </Card>
            </Card>
        </div>
    )
}
