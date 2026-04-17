import React from 'react';
import { Outlet } from 'react-router-dom';
import { Button } from 'antd-mobile';
import '@/theme.css'; // 引入全局主题，使用绝对路径
// import '../index.css'; // 也可以引入全局样式

const Layout = () => {
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
      
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;