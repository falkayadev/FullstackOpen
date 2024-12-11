const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes;
  };
  return blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  const favoriteBlog = blogs.reduce((prev, cur) => {
    if (prev.likes > cur.likes) {
      return prev;
    } else {
      return { title: cur.title, author: cur.author, likes: cur.likes };
    }
  }, {});
  return favoriteBlog;
};

const mostBlogAuthor = (blogs) => {
  const reducer = (prev, cur) => {
    const found = prev.find((item) => item.author === cur.author);
    if (found) {
      return [...prev, { ...found, blogs: found.blogs++ }];
    } else {
      return [...prev, { author: cur.author, blogs: 1 }];
    }
  };
  const authorStatistics = blogs.reduce(reducer, []);
  const mostBlogsAuthor = authorStatistics.reduce((prev, cur) => {
    if (prev.blogs > cur.blogs) {
      return prev;
    } else {
      return cur;
    }
  }, {});
  return mostBlogsAuthor;
};

export default { dummy, totalLikes, favoriteBlog, mostBlogAuthor };
