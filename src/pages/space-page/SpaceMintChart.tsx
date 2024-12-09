import AppAnimatedNumber from "@/components/AnimatedNumber";
import ReactEChartsCore from "echarts-for-react/lib/core";
import { LineChart } from "echarts/charts";
import { GridComponent, TooltipComponent } from "echarts/components";
import * as echarts from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";

echarts.use([LineChart, GridComponent, TooltipComponent, CanvasRenderer]);

export default function SpaceMintChart({ score }: { score: number }) {
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
            0,
            0,
            1,
            0, // 设置渐变方向从左到右
            [
              { offset: 0, color: "#59ECC5" }, // 起点颜色
              { offset: 1, color: "#FFCE42" }, // 终点颜色
            ]
          ),
        },
        areaStyle: {
          // 设置折线图的区域填充样式
          opacity: 0,
        },
      },
    ],
  };

  return (
    <div className="data">
      <div className="mint-value space-y-12">
        <div className="mint-text">Daily Social Mint</div>
        <AppAnimatedNumber
          value={score}
          hasComma={true}
          size={54}
          duration={1000}
          className="text-[#FFCE42] font-bold"
        />
      </div>
      <div className="statistics">
        <div className="statistic-header">
          <div className="header-text">Social Mint Statistics</div>
          <div className="header-text">Date</div>
        </div>
        <ReactEChartsCore echarts={echarts} option={option} />
      </div>
    </div>
  );
}
