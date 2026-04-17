import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// 创建异步请求的 thunk
export const fetchBillList = () => {
  return async (dispacth) => {
    try {
      const response = await axios.get("http://localhost:8888/ka");
      dispacth(setBillList(response.data));
    } catch (error) {
      return console.log(error);
      
    }
  };
};

// 创建 slice
const billSlice = createSlice({
  name: "bill",
  initialState: {
    billList: [],
  },
  reducers: {
    setBillList: (state, action) => {
      state.billList = action.payload;
    },
  },
});

// 生成 action creators 和 reducer 函数
export const { setBillList } = billSlice.actions;
export default billSlice.reducer;
