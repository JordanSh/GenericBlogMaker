export * from "./20232307-how-to-write-markdown";
export * from "./20232307-how-to-add-blogs";

export interface Blog {
  id: string; // has to be unique, name files with the same name, use dash to separate words  e.g. blog-1.ts
  title: string;
  description: string; // short description, used in blog cards
  date: string;
  writerName: string;
  avatar: string; // url to avatar image
  coverImageUrl: string; // url to cover image
  markdown: string; // markdown content
}
