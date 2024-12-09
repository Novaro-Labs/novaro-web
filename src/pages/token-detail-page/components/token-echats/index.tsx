import { useState, useEffect, useRef, useCallback } from "react";
import ReactEChartsCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import { LineChart } from "echarts/charts";
import { debounce} from "../../../../utils/utils.ts";
import { TokenDetailEchartsOptions } from "../../../../mock-data/token.ts";
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
  const [dateTime, setDateTime] = useState<string>('')
  const [presentPrice, setPresentPrice] = useState<string>('')
  const echartRef = useRef<ReactEChartsCore | null>(null)
  const option = TokenDetailEchartsOptions

  const debouncedSetPresentPrice = useCallback(
    debounce((value: string) => {
      setPresentPrice(value);
    }, 200), // 200ms 的防抖延迟
    [presentPrice])

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
  }, [])

  useEffect(() => {
    let value = option.series[0].data[0].toFixed(2).toString()
    setPresentPrice(value)
    // 监听tooltip的showTip事件
    let chartRef = echartRef.current ? echartRef.current.getEchartsInstance() : null;
    chartRef && chartRef.on('showTip', function (event: any) {
      const dataIndex = (event as { dataIndex: number }).dataIndex;
      // event.data是当前数据点的值，这里假设你的数据是数字类型
      const currentValue = (option.series[0].data[dataIndex] || option.series[0].data[0]).toFixed(2)
      // 更新presentPrice状态,增加防抖
      debouncedSetPresentPrice(currentValue.toString())
    });
    // 清理事件监听
    return () => {
      chartRef && chartRef.off('showTip')
    };
  }, [])
  return (
    <div className="statistics">
      <div className="title my-4">
        <div className="dollar">${presentPrice}</div>
        <div>{ dateTime }</div>
      </div>
      <ReactEChartsCore
        ref={echartRef}
        style={{ height: '40vh'}}
        echarts={echarts} option={option} />
    </div>
  )
};

export default TokenEcharts;