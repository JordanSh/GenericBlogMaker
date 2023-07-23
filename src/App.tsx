import React, { useState } from 'react';
import { Layout, theme } from "antd";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { paths } from "./constants/paths";
import { BlogPage } from "./pages/BlogPage";
import { GbmSider } from "./components/GbmSider";
import { HomePage } from "./pages/HomePage";
import { ContactPage } from "./pages/ContactPage";
import { TopBarHeader } from "./components/TopBarHeader";

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <BrowserRouter>
      <Layout>
        <GbmSider collapsed={collapsed} />
        <TopBarHeader collapsed={collapsed} setCollapsed={setCollapsed} />
        <Layout style={{ background: colorBgContainer }}>
          <Layout.Content
            style={{
              overflow: "initial",
              margin: "64px auto",
              padding: 24,
              paddingLeft: collapsed ? 24 : 200,
              transition: "ease-out 0.25s",
              minHeight: 280,
              maxWidth: 1200,
            }}
          >
            <Routes>
              <Route path={paths.home} element={<HomePage />} />
              <Route
                path={paths.blog}
                element={<BlogPage collapsed={collapsed} />}
              />
              <Route path={paths.contact} element={<ContactPage />} />
              <Route path="*" element={<Navigate to={paths.home} />} />
            </Routes>
          </Layout.Content>
        </Layout>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
