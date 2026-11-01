const homeController = require("../controllers/home");
const authController = require("../controllers/auth");
const articlesController = require("../controllers/articles");
const categoriesController = require("../controllers/categories");
const commentsController = require("../controllers/comments");
const usersController = require("../controllers/users");
const diariesController = require("../controllers/diaries");
const weeksController = require("../controllers/weeks");
const momentsController = require("../controllers/moments");
const babiesController = require("../controllers/babies");
const adminArticlesController = require("../controllers/admin/articles");
const adminCategoriesController = require("../controllers/admin/categories");

module.exports = (app) => {
  app.use("/", homeController);
  app.use("/auth", authController);
  app.use("/articles", articlesController);
  app.use("/categories", categoriesController);
  app.use("/comments", commentsController);
  app.use("/users", usersController);
  app.use("/diaries", diariesController);
  app.use("/weeks", weeksController);
  app.use("/moments", momentsController);
  app.use("/babies", babiesController);
  app.use("/admin/articles", adminArticlesController);
  app.use("/admin/categories", adminCategoriesController);
};
