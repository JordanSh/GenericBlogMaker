# Generic Blog Maker

## How to personalize
  
1. go to `gbmconfig.ts` file
2. config the general messages and contact details to your likings

## How to add blogs

1. create a new file in the blogs folder, use unique names and use dashes to separate words. a best practice would be to write the date in this format:
    `YYYYMMDD` before the actual name. for example: `20231607-how-to-write-blogs.ts`
2. Fill up the rest of fields according to type in the `blogs/index.ts` file:

```typescript
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
```

3. write markdown using this editor, ENABLE Use remark-gfm (to enable Github flavored markdown) 
    [https://remarkjs.github.io/react-markdown/](https://remarkjs.github.io/react-markdown/)

    (optional step, just for convenience)

4. ask chatgpt to escape markdown code, you can do it on your own, but why?
    just copy paste your markdown into chatgpt and add "escape markdown", use the output in the blog file `markdown` field.

5. after your file looks something like this:

```typescript
// Process guide:
// 1. create a new file in the blogs folder, name it blog-x.ts
// 2. id has to be a unique value
// 3. write markdown using this editor, ENABLE Use remark-gfm (to enable Github flavored markdown) 
//    [https://remarkjs.github.io/react-markdown/](https://remarkjs.github.io/react-markdown/)
// 4. ask chatgpt to escape markdown code

import { Blog } from ".";

export const howToAddBlogs: Blog = {
    id: 'how-to-add-blogs',
    title: "How to add blogs",
    description: "Step by step guide to adding new blogs",
    date: 'July 23th, 2023',
    writerName: 'Writer Name',
    avatar: 'https://xsgames.co/randomusers/avatar.php?g=pixel&key=1',
    coverImageUrl: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
    markdown: `some escaped markdown content`
}
```

Add the file to `index.ts` barrel

```typescript
export * from "./20232307-how-to-write-markdown";
export * from "./20232307-how-to-add-blogs";
export * from "./20232307-new-blog"; <- new blog file
```