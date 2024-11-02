import * as echarts from "echarts/core";

export const TokenDollarEnum = ['USD', 'ETH']
export const TokenTimeEnum = ['1h', '4h', '12h', '1d']
export const TokenTradeEnum = ['Buy', 'Sell']
export const TokenTableEnum = ['Activity', 'Top Holder']

export const TokenDetailEchartsOptions = {
  tooltip: {
    trigger: "axis", // 鼠标悬停显示数据
  },
  grid: {
    top: 30, // 图表距离容器顶部的距离
    left: 5, // 图表距离容器左侧的距离
    right: 5, // 图表距离容器右侧的距离
    bottom: 20, // 图表距离容器底部的距离
    containLabel: true, // 是否包含刻度标签
  },
  xAxis: {
    type: "category",
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    axisTick: { show: false },
    axisLine: { show: false },
    axisLabel: {
      color: "#93989A"
    },
  },
  yAxis: {
    type: "value",
    min: 0, // 最小值 0
    max: 1, // 最大值 100
    interval: 0.2, // 刻度间隔
    splitLine: {
      show: true,
      lineStyle: {
        type: 'dashed'
      }
    }
  },
  series: [
    {
      data: [0.30, 0.40, 0.90, 0.60, 0.30, 0.80, 0.50],
      type: "line",
      smooth: false, // 设置为曲线
      lineStyle: {
        width: 3,
        color: new echarts.graphic.LinearGradient(
          0, 0, 1, 0, // 设置渐变方向从左到右
          [
            { offset: 0, color: "#59ECC5" }, // 起点颜色
            { offset: 1, color: "#FFCE42" }, // 终点颜色
          ],
        ),
      },
      areaStyle: { // 设置折线图的区域填充样式
        opacity: 0,
      },
    },
  ],
}

export const TokenTableMockData =  [
  {
    id:1,
    user: '0x1d8...426e',
    type: 'Sell',
    amount: '1 minute',
    cost: '$0.70',
    eth: '0.001',
    date: '9 hours ago'
  },
  {
    id:2,
    user: '0x1d8...426e',
    type: 'Buy',
    amount: '1 minute',
    cost: '$0.70',
    eth: '0.001',
    date: '9 hours ago'
  },
  {
    id:3,
    user: '0x1d8...426e',
    type: 'Sell',
    amount: '1 minute',
    cost: '$0.70',
    eth: '0.001',
    date: '9 hours ago'
  },
  {
    id:4,
    user: '0x1d8...426e',
    type: 'Buy',
    amount: '1 minute',
    cost: '$0.70',
    eth: '0.001',
    date: '9 hours ago'
  },
  {
    id:5,
    user: '0x1d8...426e',
    type: 'Sell',
    amount: '1 minute',
    cost: '$0.70',
    eth: '0.001',
    date: '9 hours ago'
  },
  {
    id:6,
    user: '0x1d8...426e',
    type: 'Buy',
    amount: '1 minute',
    cost: '$0.70',
    eth: '0.001',
    date: '9 hours ago'
  },
  {
    id:7,
    user: '0x1d8...426e',
    type: 'Sell',
    amount: '1 minute',
    cost: '$0.70',
    eth: '0.001',
    date: '9 hours ago'
  },
  {
    id:8,
    user: '0x1d8...426e',
    type: 'Buy',
    amount: '1 minute',
    cost: '$0.70',
    eth: '0.001',
    date: '9 hours ago'
  }
]