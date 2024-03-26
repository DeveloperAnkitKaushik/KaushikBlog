export interface Post {
  title: string;
  slug: { current: string };
  imageUrl: string;
  publishedAt: string;
  excerpt: string;
  body: any;
  tags: Array<Tag>;
  _id: string;
  headings?: Array<HTMLHeadElement | string>;
}

export interface Tag {
  name: string;
  slug: { current: string };
  _id: string;
  postCount?: number;
}
