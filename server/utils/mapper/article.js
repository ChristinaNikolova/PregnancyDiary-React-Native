const { formatCreatedAt } = require("../parser");

// TODO Clenaup
function articleListViewModel(article) {
  return {
    id: article._id,
    title: article.title,
    picture: article.picture,
    categoryId: article.category._id,
    likes: article.likes,
  };
}

function articleAdminViewModel(article) {
  return {
    id: article._id,
    title: article.title,
    category: article.category.name,
    likes: article.likes.length,
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
    const currentGroupSentences = sentences.splice(0, 3);
    result.push(currentGroupSentences.join(""));
  }
  return result;
}

module.exports = {
  articleListViewModel,
  articleAdminViewModel,
  articleDetailsViewModel,
};
