import { useEffect, useState } from "react";
import { Button, Layout, Menu } from "antd";
import type { MenuProps } from "antd";
import { BoldOutlined, HomeOutlined, SmileOutlined } from "@ant-design/icons";
import { useNavigate, generatePath } from "react-router-dom";
import { paths } from "../constants/paths";
import { useBlogs } from "../hooks/useBlogs";
import { useLocation } from "react-router-dom";
import { gbmconfig } from "../gbmconfig";
import styled from "styled-components";

type MenuItem = Required<MenuProps>["items"][number];

export const GbmSider = ({ collapsed }: { collapsed: boolean }) => {
  const { blogs } = useBlogs();
  const navigate = useNavigate();
  const [selectedKey, setSelectedKey] = useState("");
  let location = useLocation();

  useEffect(() => {
    if (location.pathname === `/${paths.home}`) {
      setSelectedKey("home");
    }
    if (location.pathname === `/${paths.contact}`) {
      setSelectedKey("contact");
    }
    if (location.pathname.includes(`/blog`)) {
      const blogId = location.pathname.split("/")[2];

      setSelectedKey(blogId);
    }
  }, [location]);

  const onItemClick = ({ path }: { path: string }) => {
    navigate(path);
  };

  const blogItems = blogs.map((blog) => ({
    key: blog.id,
    label: blog.title,
    onClick: () =>
      onItemClick({ path: generatePath(paths.blog, { id: blog.id }) }),
  }));

  const items: MenuItem[] = [
    {
      key: "home",
      label: "Home",
      icon: <HomeOutlined />,
      onClick: () => onItemClick({ path: paths.home }),
    },
    {
      key: "contact",
      label: "Contact",
      icon: <SmileOutlined />,
      onClick: () => onItemClick({ path: paths.contact }),
    },
    {
      key: "blogs",
      label: "Blogs",
      icon: <BoldOutlined />,
      children: blogItems,
    },
  ];

  return (
    <Layout.Sider
      style={{
        position: "fixed",
        overflow: "auto",
        height: "100vh",
        left: 0,
        top: 0,
        bottom: 0,
        paddingTop: 16,
      }}
      collapsed={collapsed}
      collapsedWidth={0}
    >
      <StyledLogoButton
        onClick={() => onItemClick({ path: paths.home })}
        type="text"
      >
        {gbmconfig.sidebar.logo}
      </StyledLogoButton>
      <Menu
        theme="dark"
        mode="inline"
        items={items}
        selectedKeys={[selectedKey]}
      />
    </Layout.Sider>
  );
};

const StyledLogoButton = styled(Button)`
  transition: ease-out 0.25s;
  position: relative;
  height: 36px;
  padding-left: 16px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  font-size: 18px;
  gap: 5px;
  white-space: nowrap;
  font-weight: 500;
  color: white;

  :hover {
    color: #d5def2;
  }
`;
