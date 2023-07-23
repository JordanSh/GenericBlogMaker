import { Card } from "antd";
import { useBlogs } from "../hooks/useBlogs";
import { generatePath, useNavigate } from "react-router-dom";
import { paths } from "../constants/paths";
import styled from "styled-components";

export const BlogsBox = ({ filterOut = [] }: { filterOut?: string[] }) => {
  const { blogs } = useBlogs();
  const navigate = useNavigate();

  return (
    <StyledBlogsBox>
      {blogs
        .filter((b) => !filterOut.includes(b.id))
        .map((blog) => (
          <StyledBlogCard
            key={blog.id}
            hoverable
            cover={
              <img
                src={blog.coverImageUrl}
                alt="coverImage"
                style={{ height: 190, objectFit: "cover" }}
              />
            }
            onClick={() =>
              navigate(`/${generatePath(paths.blog, { id: blog.id })}`)
            }
          >
            <Card.Meta title={blog.title} description={blog.description} />
          </StyledBlogCard>
        ))}
    </StyledBlogsBox>
  );
};

const StyledBlogsBox = styled.div`
  width: 900px;
  display: flex;
  justify-content: flex-start;
  gap: 32px;
  flex-wrap: wrap;
`;

const StyledBlogCard = styled(Card)`
  width: calc(33.3% - 22px);
`;
