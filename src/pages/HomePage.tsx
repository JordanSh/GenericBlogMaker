import { useBlogs } from "../hooks/useBlogs";
import { Divider, Typography } from "antd";
import { BlogsBox } from "../components/BlogsBox";
import { gbmconfig } from "../gbmconfig";

const { Title, Paragraph } = Typography;

export const HomePage = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "0 24px",
      }}
    >
      <Typography style={{ textAlign: "center" }}>
        <Title>{gbmconfig.homePage.welcomeTitle}</Title>
        <Paragraph>{gbmconfig.homePage.description}</Paragraph>
      </Typography>
      <Divider>My Blogs</Divider>
      <BlogsBox />
    </div>
  );
};
