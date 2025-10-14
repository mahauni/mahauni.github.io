export type BlogPost = {
  id: number 
  filename: string
  title: string
  date: string
  author: string
  tags: string
  content: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  blog?: any
}
