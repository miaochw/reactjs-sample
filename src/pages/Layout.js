import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import imgLogo from '@/assets/img/logo.svg';
// import './index.less';
import styled from 'styled-components';

const { Header, Footer, Sider } = Layout;

const Content = styled.div`
  flex: 1;
  margin: 24px 16px 0;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 6px;
    background-color: #eef1f5;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: #eef1f5 linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%);
  }
  &::-webkit-scrollbar-track {
    background-color: #eef1f5;
    border-radius: 10px;
  }
`;

const MyLayout = ({ children }) => {
  console.log('layout');
  return (
    <Layout style={{ height: '100%' }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div
          className="logo"
          style={{ height: '50px', background: `url(${imgLogo}) repeat-x` }}
        />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">
            <Link to="/home" className="nav-text">
              <Icon type="home" />
              <span className="nav-text">Home</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/content" className="nav-text">
              <Icon type="video-camera" />
              <span className="nav-text">content</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Icon type="upload" />
            <span className="nav-text">nav 3</span>
          </Menu.Item>
          <Menu.Item key="4">
            <Icon type="user" />
            <span className="nav-text">nav 4</span>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }} />
        <Content className="content">
          <div
            style={{
              padding: 24,
              background: '#fff',
              minHeight: 360,
              height: 'inherit',
            }}
          >
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Anti ©2018 Created by Anti
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MyLayout;
