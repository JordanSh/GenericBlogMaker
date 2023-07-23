import { AutoComplete, Button, Card, Input, Layout, Typography } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { useBlogs } from "../hooks/useBlogs";
import { useState } from "react";
import { Blog } from "../blogs";
import { generatePath, useNavigate } from "react-router-dom";
import { paths } from "../constants/paths";

const SeachBlogCard = ({ blog }: { blog: Blog }) => {
  return (
    <div
      style={{
        height: 80,
        padding: "16px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <img
        src={blog.coverImageUrl}
        style={{
          height: 100,
          borderRadius: 8,
          width: 150,
          objectFit: "cover",
        }}
      />
      <div style={{ marginLeft: "16px" }}>
        <div>
          <Typography.Text strong style={{ fontSize: 18 }}>
            {blog.title}
          </Typography.Text>
        </div>
        <Typography.Text type="secondary" style={{ fontSize: 14 }}>
          {blog.description}
        </Typography.Text>
      </div>
    </div>
  );
};

export const TopBarHeader = ({
  collapsed,
  setCollapsed,
}: {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
}) => {
  const [matchingBlogsIds, setMatchingBlogsIds] = useState<string[]>([]);
  const navigate = useNavigate();

  const { blogs } = useBlogs();

  const onChange = (searchText: string) => {
    setMatchingBlogsIds(
      !searchText
        ? blogs.slice(0, 6).map((blog) => blog.id)
        : blogs
            .filter((blog) =>
              blog.title.toUpperCase().includes(searchText.toUpperCase())
            )
            .map((blog) => blog.id)
    );
  };

  const options = matchingBlogsIds.map((blogId) => {
    const blogData = blogs.find((blog) => blog.id === blogId) || ({} as Blog);

    return {
      value: blogData.title,
      label: <SeachBlogCard blog={blogData} />,
    };
  });

  return (
    <Layout.Header
      style={{
        transition: "ease-out 0.25s",
        padding: 0,
        background: "#ecf0f3",
        position: "fixed",
        top: 0,
        zIndex: 1,
        left: collapsed ? 0 : 200,
        width: "100%",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        style={{
          fontSize: "16px",
          width: 64,
          height: 64,
        }}
      />
      <AutoComplete
        onFocus={() =>
          !options.length &&
          setMatchingBlogsIds(blogs.slice(0, 6).map((blog) => blog.id))
        }
        placeholder="Search Blogs"
        allowClear={true}
        style={{ width: 800 }}
        onChange={onChange}
        onSelect={(value) => {
          console.log(value);

          navigate(
            generatePath(paths.blog, {
              id: blogs.find((blog) => blog.title === value)?.id,
            })
          );
        }}
        options={options}
      />
    </Layout.Header>
  );
};
