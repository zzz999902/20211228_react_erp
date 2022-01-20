import React, { useState } from 'react'
import { Card, Button } from 'antd'
import ReactEcharts from 'echarts-for-react'

export default function Bar() {
    const [sales, setsales] = useState([5, 20, 36, 10, 10, 20])
    const [stores, setstores] = useState([6, 10, 25, 20, 15, 10])

    /*
   返回柱状图的配置对象
    */
    const getOption = (sales, stores) => {
        return {
            title: {
                text: 'ECharts 入门示例'
            },
            tooltip: {},
            legend: {
                data: ['销量', '库存']
            },
            xAxis: {
                data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'line',
                data: sales
            }, {
                name: '库存',
                type: 'line',
                data: stores
            }]
        }
    }

    const update = () => {
        setsales(sales.map(item => item - 1))
        setstores(sales.map(item => item + 1))
    }

    return (
        <div>
            <Card>
                <Button type='primary' onClick={update}>更新</Button>
            </Card>

            <Card title='折线图一'>
                <ReactEcharts option={getOption(sales, stores)} />
            </Card>

        </div>
    )
}
