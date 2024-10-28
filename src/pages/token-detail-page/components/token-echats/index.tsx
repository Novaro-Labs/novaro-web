import { useState, useEffect } from "react";
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
import "./index.less"

const TokenEcharts = () => {
  const [dateTime, setDateTime] = useState<string>('');
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      // 定义时间格式选项
      const options: Intl.DateTimeFormatOptions = {
        day: '2-digit', // 日期为两位数
        month: 'short', // 月份为缩写形式
        hour: '2-digit', // 小时为两位数
        minute: '2-digit', // 分钟为两位数
        timeZoneName: 'short', // 显示简短时区名
        hour12: false // 使用24小时制
      };
      // 使用英文环境来格式化日期，以符合要求的格式
      const formattedDateTime = new Intl.DateTimeFormat('en-GB', options).format(now);
      // 分割字符串以重新排列
      const parts = formattedDateTime.split(', ');
      const datePart = parts[0];
      const timePart = parts[1].split(' ')[0];
      const timeZone = parts[1].split(' ')[1];
      const customFormattedDateTime = `${datePart} ${timePart} ${timeZone.toUpperCase()}`;
      setDateTime(customFormattedDateTime);
    };

    updateDateTime();
    const timer = setInterval(updateDateTime, 1000); // 每秒更新时间

    return () => clearInterval(timer); // 清除定时器
  }, []);
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
        data: [0.3, 0.4, 0.9, 0.6, 0.3, 0.8, 0.5],
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
  return (
    <div className="statistics">
      <div className="title my-4">
        <div className="dollar">$0.70</div>
        <div>{ dateTime }</div>
      </div>
      <ReactEChartsCore style={{ height: '360px'}} echarts={echarts} option={option} />
    </div>
  )
};

export default TokenEcharts;