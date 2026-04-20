import { NavBar, DatePicker } from "antd-mobile";
import "./index.scss";
import classNames from "classnames";
import { useState, useMemo, useEffect } from "react";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import _ from "lodash";
import DailyBill from "./components/DailyBill";

const Month = () => {
  // 获取月份分组数据
  const billList = useSelector((state) => state.bill.billList);

  // 获取当前时间
  const monthGroup = useMemo(() => {
    if (!billList || !Array.isArray(billList)) {
      return {};
    }
    return _.groupBy(billList, (item) => dayjs(item.date).format("YYYY-MM"));
  }, [billList]);

  // 日期弹框的打开和关闭状态
  const [dateVisible, setDateVisible] = useState(false);

  // 获取日期
  const [currentDate, setCurrentDate] = useState(() => {
    return dayjs(new Date()).format("YYYY-MM");
  });

  // 获取当前月份账单
  const [currentMonthList, setCurrentMonthList] = useState([]);

  const monthResult = useMemo(() => {
    // 检查 currentMonthList 是否存在且为数组
    if (!currentMonthList || !Array.isArray(currentMonthList)) {
      return {
        pay: 0,
        income: 0,
        total: 0,
      };
    }

    const pay = currentMonthList
      ?.filter(
        (item) => item && item.type === "pay" && typeof item.money === "number",
      )
      .reduce((a, c) => a + c.money, 0);

    const income = currentMonthList
      ?.filter(
        (item) =>
          item && item.type === "income" && typeof item.money === "number",
      )
      .reduce((a, c) => a + c.money, 0);

    return {
      pay: pay || 0,
      income: income || 0,
      total: (pay || 0) + (income || 0),
    };
  }, [currentMonthList]);

  // 获取当前月份的账单
  useEffect(() => {
    const nowDate = dayjs("2022-10-05").format("YYYY-MM");
    if (monthGroup[nowDate]) {
      setCurrentMonthList(monthGroup[nowDate]);
    }
  }, [monthGroup]);

  // 日期选择确认
  const handleConfirm = (date) => {
    setDateVisible(false);
    const formatDate = dayjs(date).format("YYYY-MM");

    // 检查是否有对应月份的数据
    const monthData = monthGroup[formatDate];
    if (monthData && Array.isArray(monthData)) {
      console.log(monthData);
      setCurrentMonthList(monthData);
    } else {
      // 如果没有找到对应月份的数据，设置为空数组
      console.log([]);
      setCurrentMonthList([]);
    }
    setCurrentDate(formatDate);
  };

  // 获取单日账单
  const dayGroup = useMemo(() => {
    const group = _.groupBy(currentMonthList, (item) =>
      dayjs(item.date).format("YYYY-MM-DD"),
    );
    const key = Object.keys(group);
    return {
      key,
      group,
    };
  }, [currentMonthList]);

  return (
    <div className="monthlyBill">
      <NavBar className="nav" backArrow={false}>
        月度收支
      </NavBar>
      <div className="content">
        <div className="header">
          {/* 时间切换区域 */}
          <div className="date" onClick={() => setDateVisible(true)}>
            <span className="text">{currentDate + ""}</span>
            <span
              className={classNames("arrow", dateVisible && "expand")}
            ></span>
          </div>
          {/* 统计区域 */}
          <div className="twoLineOverview">
            <div className="item">
              <span className="money">
                {monthResult?.pay !== undefined ? monthResult.pay : 0}
              </span>
              <span className="type">支出</span>
            </div>
            <div className="item">
              <span className="money">
                {monthResult?.income !== undefined ? monthResult.income : 0}
              </span>
              <span className="type">收入</span>
            </div>
            <div className="item">
              <span className="money">
                {monthResult?.total !== undefined ? monthResult.total : 0}
              </span>
              <span className="type">结余</span>
            </div>
          </div>
          {/* 时间选择器 */}
          <DatePicker
            className="kaDate"
            title="记账日期"
            precision="month"
            visible={dateVisible}
            onCancel={() => setDateVisible(false)}
            onConfirm={handleConfirm}
            onClose={() => setDateVisible(false)}
            max={new Date()}
          />
        </div>
        {dayGroup?.key?.map((item) => (
          <DailyBill key={item} date={item} billList={dayGroup.group[item]} />
        ))}
      </div>
    </div>
  );
};

export default Month;
