import React from 'react';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import './index.scss';  // 引入样式文件

const Month = () => {
  const [currentTime, setCurrentTime] = useState(dayjs());

  useEffect(() => {
    // 每秒更新一次时间
    const timer = setInterval(() => {
      setCurrentTime(dayjs());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  /**
   * 功能：获取当月账单汇总信息
   * 参数：currentDate - 当前日期对象
   * 返回：包含收入、支出和结余的对象
   * 注意：该函数使用dayjs处理日期计算
   */
  const getMonthlySummary = (currentDate) => {
    // 这里是示例函数，实际实现会连接到Redux store获取数据
    console.log('Getting monthly summary for:', currentDate);
    
    return {
      income: 0,
      expenses: 0,
      balance: 0
    };
  };

  return (
    <div className="month-container">
      <h1>Month Component</h1>
      <p>This is the month component.</p>
      <div className="current-time">
        <span className="time-text">{currentTime.format('YYYY年MM月DD日 HH:mm:ss')}</span>
      </div>
    </div>
  );
};

export default Month;