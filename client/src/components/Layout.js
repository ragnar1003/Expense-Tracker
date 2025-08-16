import React from 'react';
import { Layout, Menu } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Header, Content, Footer } = Layout;

const AppLayout = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <Layout className="layout" style={{ minHeight: '100vh' }}>
      <Header>
        <div className="logo" style={{ float: 'left', color: 'white', fontSize: '24px' }}>
          Expense Tracker
        </div>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} style={{ float: 'right' }}>
          <Menu.Item key="1" onClick={handleLogout}>
            Logout
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <div className="site-layout-content" style={{ background: '#fff', padding: 24, minHeight: 280, marginTop: 24 }}>
          {children}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Expense Tracker ©2024 Created by Jules</Footer>
    </Layout>
  );
};

export default AppLayout;
