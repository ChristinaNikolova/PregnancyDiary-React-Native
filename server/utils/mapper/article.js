const { formatCreatedAt } = require("../parser");

function articleListViewModel(article) {
  return {
    id: article._id,
    title: article.title,
    shortContent: article.content.slice(0, 200) + "...",
    picture: article.picture,
  };
}

function articleAdminViewModel(article) {
  return {
    id: article._id,
    title: article.title,
    category: article.category.name,
    likes: article.likes.length,
    comments: article.comments.length,
  };
}

function articleListByCategoryViewModel(article) {
  return {
    id: article._id,
    title: article.title,
    picture: article.picture,
    createdAt: formatCreatedAt(article.createdAt),
  };
}

function articleLastThreeListViewModel(article) {
  return {
    id: article._id,
    title: article.title,
    picture: article.picture,
    shortContent: article.content.slice(0, 350) + "...",
  };
}

function articleDetailsViewModel(article) {
  return {
    id: article._id,
    title: article.title,
    content: splitContentIntoArray(
      article.content.slice(article.content.indexOf(".") + 1)
    ),
    picture: article.picture,
    likesCount: article.likes.length,
    likes: article.likes,
    categoryId: article.category._id,
    category: article.category.name,
    createdAt: formatCreatedAt(article.createdAt),
  };
}

function splitContentIntoArray(content) {
  let sentences = content
    .split(".")
    .map((x) => x.trim())
    .filter((x) => x !== "")
    .map((x) => x + ".");
  let result = [];
  while (sentences.length > 0) {
    const currentGroupSentences = sentences.splice(0, 5);
    result.push(currentGroupSentences.join(""));
  }
  return result;
}

module.exports = {
  articleListViewModel,
  articleAdminViewModel,
  articleListByCategoryViewModel,
  articleDetailsViewModel,
  articleLastThreeListViewModel,
};
