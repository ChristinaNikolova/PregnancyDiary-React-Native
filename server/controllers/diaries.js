const router = require("express").Router();
const { hasUser } = require("../middlewares/guards");
const {
  create,
  all,
  deleteById,
  getById,
  update,
} = require("../services/diaries");
const { mapErrors } = require("../utils/parser");

router.post("/", hasUser(), async (req, res) => {
  try {
    const userId = req.user._id;
    const diary = await create(
      req.body.title,
      req.body.description,
      req.body.positiveTestDate,
      req.body.dueDate,
      req.body.gender,
      userId
    );
    res.json(diary);
  } catch (error) {
    const message = mapErrors(error);
    res.status(400).json({ message });
  }
});

router.get("/", hasUser(), async (req, res) => {
  try {
    const userId = req.user._id;
    const diaries = await all(userId);
    res.json(diaries);
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

router.get("/:id", hasUser(), async (req, res) => {
  try {
    const id = req.params.id;
    const diary = await getById(id, true);
    res.json(diary);
  } catch (error) {
    const message = mapErrors(error);
    res.status(400).json({ message });
  }
});

router.put("/:id", hasUser(), async (req, res) => {
  try {
    const id = req.params.id;
    const diary = await update(
      id,
      req.body.title,
      req.body.description,
      req.body.positiveTestDate,
      req.body.dueDate,
      req.body.gender
    );
    res.json(diary);
  } catch (error) {
    const message = mapErrors(error);
    res.status(400).json({ message });
  }
});

module.exports = router;
