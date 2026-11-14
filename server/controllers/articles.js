const router = require("express").Router();
const { hasUser } = require("../middlewares/guards");
const {
  all,
  getByCategory,
  getById,
  like,
  getLastThree,
} = require("../services/articles");
const { mapErrors } = require("../utils/parser");

router.get("/lastThree", async (req, res) => {
  try {
    const articles = await getLastThree();
    res.json(articles);
  } catch (error) {
    const message = mapErrors(error);
    res.status(400).json({ message });
  }
});

// TODO hasUser
router.get("/all", async (req, res) => {
  try {
    const articles = await all();
    res.json(articles);
  } catch (error) {
    const message = mapErrors(error);
    res.status(400).json({ message });
  }
});

router.get("/filter/:categoryId", async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const article = await getByCategory(categoryId);
    res.json(article);
  } catch (error) {
    const message = mapErrors(error);
    res.status(400).json({ message });
  }
});

// TODO hasUser
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const article = await getById(id);
    res.json(article);
  } catch (error) {
    const message = mapErrors(error);
    res.status(400).json({ message });
  }
});

router.post("/:id", hasUser(), async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.user._id;
    const article = await like(id, userId);
    res.json(article);
  } catch (error) {
    const message = mapErrors(error);
    res.status(400).json({ message });
  }
});

module.exports = router;
