import { useRef } from "react";
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


const CommunityTokenEcharts = () => {
  const echartRef = useRef<ReactEChartsCore | null>(null)
  
  const option = {
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
        smooth: false, // 设置为折线
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

  return (
    <div className="h-full w-full">
      <ReactEChartsCore
        ref={echartRef}
        style={{ height: '240px'}}
        echarts={echarts} option={option} />
    </div>
    
  )
};

export default CommunityTokenEcharts;