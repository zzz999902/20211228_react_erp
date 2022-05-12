import React from 'react';
import ReactDOM from 'react-dom';
import { PieChart } from 'bizcharts';

// 数据源
const data = [
  {
    type: "1月",
    value: 38
  },
  {
    type: "2月",
    value: 52
  },
  {
    type: "3月",
    value: 61
  },
  {
    type: "4月",
    value: 145
  },
  {
    type: "5月",
    value: 48
  },
  {
    type: "6月",
    value: 38
  },
  {
    type: "7月",
    value: 28
  },
  {
    type: "8月",
    value: 38
  },
  {
    type: "59月",
    value: 68
  },
  {
    type: "10月",
    value: 38
  },
  {
    type: "11月",
    value: 58
  },
  {
    type: "12月",
    value: 38
  }
];

function Demo() {
  return (
    <PieChart
      data={data}
      title={{
        visible: true,
        text: '饼图-外部图形标签(outer label)',
      }}
      description={{
        visible: true,
        text: '当把饼图label的类型设置为outer时，标签在切片外部拉线显示。设置offset控制标签的偏移值。',
      }}
      radius={0.5}
      angleField='value'
      colorField='type'
      label={{
        visible: true,
        type: 'offset',
        labelHeight: 28,
        content: v => `${v.type}\n${v.value}`
      }}
    />
  );
}

export default Demo 
