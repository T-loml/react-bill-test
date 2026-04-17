import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { Button } from 'antd-mobile';
import { fetchBillList } from '@/store/modules/billStore';
import '@/theme.css';

const Layout = () => {
  const dispatch = useDispatch();
  const { billList, loading } = useSelector(state => state.bill);

  useEffect(() => {
    // 调用API获取数据
    dispatch(fetchBillList());
  }, [dispatch]);

  return (
    <div>
      <h1>Layout Component</h1>
      <p>This is the layout component.</p>
      
      <div style={{ padding: '20px' }}>
        <h2>按钮测试主题颜色</h2>
        <Button color="primary">Primary Button</Button>
        <br /><br />
        <Button color="success">Success Button</Button>
        <br /><br />
        <Button color="warning">Warning Button</Button>
        <br /><br />
        <Button color="danger">Danger Button</Button>
      </div>
      
      {/* 渲染账单数据 */}
      <div style={{ padding: '20px' }}>
        <h2>账单列表</h2>
        {loading ? (
          <p>加载中...</p>
        ) : (
          <ul>
            {billList && billList.map((item, index) => (
              <li key={index}>{JSON.stringify(item)}</li>
            ))}
          </ul>
        )}
      </div>
      
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;