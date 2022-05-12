import React, { useEffect, useState } from 'react'
import { Card } from 'antd'

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import highcharts3d from 'highcharts/highcharts-3d'
highcharts3d(Highcharts)

export default function Line(props) {
    const [count, setCount] = useState([]);
    const [first, setfirst] = useState({
        title: {
            text: 'No data in line chart - with custom options'
        },
        series: [{
            type: 'line',
            name: 'Random data',
            data: []
        }],
        lang: {
            noData: "Nichts zu anzeigen"
        },
        noData: {
            style: {
                fontWeight: 'bold',
                fontSize: '15px',
                color: '#303030'
            }
        }
    })
    useEffect(() => {
        // console.log(props.objecst)
    }, [])

    var options = {
        xAxis: {
            categories: ['2021-01', '2021-02', '2021-03', '2021-04', '2021-05', '2021-06', '2021-07', '2021-08', '2021-09', '2021-10', '2021-11', '2021-12']
        },
        legend: {//图例位置
            verticalAlign: 'top',
            align:'right',
        },
        tooltip: {
            // crosshairs: true,
            crosshairs: [{            // 设置准星线样式
                width: 3,
            }, {
                width: 1,
                color: "#006cee",
                dashStyle: 'longdashdot',
                zIndex: 100 
            }],
            shared: true
        },
        series: [
            {
                name: '内部用户',
                data: [111, 222, 333, 444, 555, 666, 777, 888, 999, 1010, 1111, 1212],

            }, {
                name: '代理用户',
                data: [15, 27, 93, 24, 58, 62, 67, 78, 96, 103, 114, 152],

            }, {
                name: '供应商',
                data: [151, 612, 173, 184, 125, 136, 157, 128, 129, 220, 221, 222],

            }, {
                name: '专家',
                data: [333, 444, 555, 444, 555, 666, 777, 888, 999, 101, 111, null],

            }
        ],
        plotOptions: {//折线图形状
            series: {
                marker: {
                    fillColor: '#FFFFFF',
                    lineWidth: 2,
                    lineColor: null,
                    radius: 7,
                    symbol: 'circle'
                }
            }
        },
        credits: {
            enabled: false // 禁用版权信息
        },
        yAxis: {
            title: {
                text: null,
            }
        },
        title: {
            text: null
        },

    };

    return (
        <div>
            <h1 style={{ marginLeft: '20px', fontWeight: 'bold', fontSize: '18px' }}>趋势图</h1>
            <Card bordered={false} >
                <div style={{ marginLeft: '5px' }}>单位：个</div>
                <HighchartsReact highcharts={Highcharts} options={options} />
            </Card>
        </div >
    )
}

