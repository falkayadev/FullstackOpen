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

export default { dummy, totalLikes, favoriteBlog };
