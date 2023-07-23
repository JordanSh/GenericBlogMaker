import { useParams } from "react-router-dom";
import { useBlogs } from "../hooks/useBlogs";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import { BlogsBox } from "../components/BlogsBox";
import { Divider, Avatar, Space, Typography } from "antd";
import { Blog } from "../blogs";
import "./styles.css";

const MarkdownComponent = ({ markdown = "" }) => {
  // this is copy pasted from ReactMarkdown example of syntax highlighting
  // https://github.com/remarkjs/react-markdown#use-custom-components-syntax-highlight
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      children={markdown}
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");

          // this is a fix to inline code not being highlighted
          // https://stackoverflow.com/a/75589275
          if (inline) {
            return (
              <code {...props} className="inline-code">
                {children}
              </code>
            );
          }

          return !inline && match ? (
            <SyntaxHighlighter
              {...props}
              children={String(children).replace(/\n$/, "")}
              style={dracula}
              language={match[1]}
              PreTag="div"
            />
          ) : (
            <code {...props} className={className}>
              {children}
            </code>
          );
        },
      }}
    />
  );
};

export const BlogPage = ({ collapsed }: { collapsed: boolean }) => {
  const params = useParams();
  const { blogs } = useBlogs();

  const blog = blogs.find((blog) => blog.id === params.id) || ({} as Blog);

  return (
    <div style={{ paddingTop: 350 }}>
      {/* Cover Image */}
      <img
        src={blog.coverImageUrl}
        alt="Cover"
        style={{
          width: collapsed ? "100%" : "calc(100% - 200px)",
          height: 400,
          objectFit: "cover",
          objectPosition: "center",
          position: "absolute",
          top: 60,
          left: collapsed ? 0 : 200,
          transition: "ease-out 0.25s",
        }}
      />

      {/* Avatar, Writer Name, and Date */}
      <div
        style={{
          position: "relative",
          padding: "16px",
          display: "flex",
          alignItems: "center",
          background: "white",
          borderRadius: 12,
        }}
      >
        <Avatar size={46} src={blog.avatar} />
        <div style={{ marginLeft: "16px" }}>
          <div>
            <Typography.Text strong>{blog.writerName}</Typography.Text>
          </div>
          <Typography.Text type="secondary">
            last updated at {blog.date}
          </Typography.Text>
        </div>
      </div>
      <Typography.Title level={2} style={{ marginTop: 4 }}>
        {blog.title}
      </Typography.Title>
      <Typography.Text>{blog.description}</Typography.Text>
      <Divider />

      {/* Blog Markdown Content */}
      <MarkdownComponent markdown={blog.markdown} />

      <Divider style={{ marginTop: 64 }}>Other Blogs</Divider>
      <BlogsBox filterOut={[blog.id || ""]} />
    </div>
  );
};
