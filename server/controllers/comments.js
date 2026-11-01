const router = require("express").Router();
const { hasUser } = require("../middlewares/guards");
const { all, create, like, deleteById } = require("../services/comments");
const { mapErrors } = require("../utils/parser");

router.get("/:id", hasUser(), async (req, res) => {
  try {
    const articleId = req.params.id;
    const comments = await all(articleId);
    res.json(comments);
  } catch (error) {
    const message = mapErrors(error);
    res.status(400).json({ message });
  }
});

router.post("/:id", hasUser(), async (req, res) => {
  try {
    const articleId = req.params.id;
    const userId = req.user._id;
    const comment = await create(articleId, userId, req.body.content);
    res.json(comment);
  } catch (error) {
    const message = mapErrors(error);
    res.status(400).json({ message });
  }
});

router.post("/:articleId/:id", hasUser(), async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.user._id;
    const comment = await like(id, userId);
    res.json(comment);
  } catch (error) {
    const message = mapErrors(error);
    res.status(400).json({ message });
  }
});

router.delete("/:id", hasUser(), async (req, res) => {
  try {
    const id = req.params.id;
    await deleteById(id);
    res.status(204).end();
  } catch (error) {
    const message = mapErrors(error);
    res.status(400).json({ message });
  }
});

module.exports = router;
