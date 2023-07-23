import React, { useState } from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { GbmSider } from './components/GbmSider';
import { Routes, Route, Outlet, Link, BrowserRouter } from "react-router-dom";
import { paths } from './constants/paths';
import { BlogPage } from './pages/BlogPage';

const { Header, Content, Footer, Sider } = Layout;

const Page: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <BrowserRouter>
      <Layout style={{ minHeight: '100vh' }}>
        <GbmSider />
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }} />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>


            <Routes>
              <Route path="/" >
                <Route path={paths.home} element={<div>home</div>} />
                <Route path={paths.blog} element={<BlogPage />} />
                <Route path={paths.contact} element={<div>contact</div>} />
              </Route>
            </Routes>

          </Content>
          <Footer style={{}}>My Blog ©2023 Created by -EnterName-</Footer>
        </Layout>
      </Layout>
    </BrowserRouter>
  );
};

export default Page;