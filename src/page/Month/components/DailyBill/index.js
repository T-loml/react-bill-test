import classNames from "classnames";
import "./index.scss";
import { useMemo } from "react";
import { billTypeToName } from "@/contants";
import { useState } from "react";
import Icon from "@/components/Icon";
const DailyBill = ({ date, billList }) => {
  const dayResult = useMemo(() => {
    // 检查 billList 是否存在且为数组
    if (!billList || !Array.isArray(billList)) {
      return {
        pay: 0,
        income: 0,
        total: 0,
      };
    }

    const pay = billList
      ?.filter(
        (item) => item && item.type === "pay" && typeof item.money === "number",
      )
      .reduce((a, c) => a + c.money, 0);

    const income = billList
      ?.filter(
        (item) =>
          item && item.type === "income" && typeof item.money === "number",
      )
      .reduce((a, c) => a + c.money, 0);
    console.log(pay, income);

    return {
      pay: pay || 0,
      income: income || 0,
      total: (pay || 0) + (income || 0),
    };
  }, [billList]);

  const [visible, setVisible] = useState(false);
  return (
    <div className={classNames("dailyBill")}>
      <div className="header">
        <div className="dateIcon">
          <span className="date">{date}</span>
          <span
            className={classNames("arrow", visible && "expand")}
            onClick={() => setVisible(!visible)}
          ></span>
        </div>
        <div className="oneLineOverview">
          <div className="pay">
            <span className="type">支出</span>
            <span className="money">{dayResult.pay}</span>
          </div>
          <div className="income">
            <span className="type">收入</span>
            <span className="money">{dayResult.income}</span>
          </div>
          <div className="balance">
            <span className="money">{dayResult.total}</span>
            <span className="type">结余</span>
          </div>
        </div>
      </div>
      <div className="billList" style={{ display: visible ? "block" : "none" }}>
        {billList.map((item) => {
          return (
            <div className="bill" key={item.id}>
              <Icon type={item.useFor} />
              <div className="detail">
                <div className="billType">{billTypeToName[item.useFor]}</div>
              </div>
              <div className={classNames("money", item.type)}>
                {item.money?.toFixed(2)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default DailyBill;
