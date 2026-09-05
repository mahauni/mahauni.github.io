# My portifolio, if what is this is.

## Creating a new blog post

```
npm run new-post -- "Post Title" ["tag1, tag2"] [author]
```

The `--` is required so npm forwards the arguments to the script. This creates `blogs/YYYY-MM-DD-post-title.md` with the frontmatter (title, date, author, tags) already filled in, plus a placeholder body for you to edit. The blog list picks up any `.md` file in `blogs/` automatically on the next build/push, no other file needs to be touched.

What I need to do (TODO List lol):

- Maybe do seomething about listing the files, and the cat about it.... Maybe I like, make the file, name and everything with base in the blogs folder, and create with the content the id in the list of the blogs, so when we do a cat, I get in the terminal the contents in the blogs by searching in the list, and printing in the blogs... So maybe, I can check the folder we are in, if are in the blog, we do a cat diferent searching in the list. And maybe after doing this, if I can maybe check if is someting to do the normal CAT or the CAT for the contents in the folder.

