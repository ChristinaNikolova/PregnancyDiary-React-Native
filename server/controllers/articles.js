const router = require("express").Router();
const { hasUser } = require("../middlewares/guards");
const {
  all,
  getById,
  like,
} = require("../services/articles");
const { mapErrors } = require("../utils/parser");

// TODO hasUser
router.get("/", hasUser(), async (req, res) => {
  try {
    const { limit } = req.query;
    const articles = await all(limit ? Number(limit) : 0);
    res.json(articles);
  } catch (error) {
    const message = mapErrors(error);
    res.status(400).json({ message });
  }
});

router.get("/:id", hasUser(), async (req, res) => {
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
