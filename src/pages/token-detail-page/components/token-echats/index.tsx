import ReactEChartsCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import { LineChart } from "echarts/charts";
import {
  GridComponent,
  TooltipComponent,
} from "echarts/components";
import {
  CanvasRenderer,
} from "echarts/renderers";

// @ts-ignore
echarts.use([
  LineChart,
  GridComponent,
  TooltipComponent,
  CanvasRenderer,
]);

const TokenEcharts = () => {
  const option = {
    tooltip: {
      trigger: "axis", // 鼠标悬停显示数据
    },
    grid: {
      top: 30, // 图表距离容器顶部的距离
      left: 36, // 图表距离容器左侧的距离
      right: 33, // 图表距离容器右侧的距离
      bottom: 20, // 图表距离容器底部的距离
      containLabel: true, // 是否包含刻度标签
    },
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
      min: 0, // 最小值 0
      max: 100, // 最大值 100
      interval: 50, // 刻度间隔
    },
    series: [
      {
        data: [30, 40, 90, 10, 30, 80, 50],
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
  };
  const records = [{
    id: 1,
    activity: "Collected daily ME",
    point: 550,
    data: "2024-08-18",
  },
    {
      id: 2,
      activity: "No check-ins for 7 consecutive days",
      point: -550,
      data: "2024-08-18",
    },
    {
      id: 3,
      activity: "Collected daily ME",
      point: -350,
      data: "2024-08-18",
    },
    {
      id: 4,
      activity: "Energy collected by",
      point: 450,
      data: "2024-08-18",
    },
    {
      id: 5,
      activity: "Collected daily ME",
      point: 120,
      data: "2024-08-18",
    },
    {
      id: 6,
      activity: "Energy collected by 0x1c...0e83",
      point: 3000,
      data: "2024-08-18",
    },
  ];
  const userInfo = [
    { text: 'post', count: '332' },
    { text: 'follower', count: '1,200' },
    { text: 'following', count: '240' }
  ]
  return (
    <div className="container">
      <ReactEChartsCore echarts={echarts} option={option} />
    </div>
  )
};

export default TokenEcharts;