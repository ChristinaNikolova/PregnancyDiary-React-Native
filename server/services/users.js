const Article = require("../models/Article");
const {
  Types: { ObjectId },
} = require("mongoose");
const { articleListByCategoryViewModel } = require("../utils/mapper/article");

async function allFavArticles(userId) {
  return (await Article.find({}))
    .filter((a) => a.likes.includes(new ObjectId(userId)))
    .map(articleListByCategoryViewModel);
}

module.exports = {
  allFavArticles,
};
