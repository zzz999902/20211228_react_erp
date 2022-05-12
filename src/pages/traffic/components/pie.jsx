import { Card } from 'antd'
import React, { Component } from 'react'

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import highcharts3d from 'highcharts/highcharts-3d'
highcharts3d(Highcharts)

export default class pie extends Component {
    state: {

    }
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        // console.log(this.props.objecst)
    }



    render() {
        var options = {
            chart: {
                // plotBackgroundColor: null,
                // plotBorderWidth: null,
                // plotShadow: false,
                type: 'pie',

            },
            title: {
                text: ''
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: true
                }
            },
            legend: {
                layout: 'vertical',
                symbolPadding:10,
                itemMarginBottom:10
            },
            series: [
                {
                    name: '访问量占比情况',
                    colorByPoint: true,
                    innerSize: '70%',
                    data: [{
                        name: `内部用户 ${10 / 10}%`,
                        y: 10,
                    }, {
                        name: `代理用户 ${20 / 10}%`,
                        y: 20
                    }, {
                        name: `供应商 ${40 / 10}%`,
                        y: 40
                    }, {
                        name: `专家 ${30 / 10}%`,
                        y: 30
                    }]
                }
            ],
            credits: {
                enabled: false // 禁用版权信息
            }
        };
        return (
            <div>
                <h1 style={{ fontWeight: 'bold', fontSize: '18px' }}>访问占比情况</h1>
                <Card bordered={false} style={{ borderRight: '1px solid #ccc' }}>
                    <HighchartsReact highcharts={Highcharts} options={options} />
                </Card>
            </div>
        )
    }
}
