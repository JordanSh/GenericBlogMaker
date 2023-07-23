import * as allBlogs from "../blogs";

export const useBlogs = () => {
  const blogs = Object.values(allBlogs);

  return { blogs };
};
