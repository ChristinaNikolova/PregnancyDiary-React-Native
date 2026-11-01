const router = require("express").Router();
const { isAdmin } = require("../../middlewares/guards");
const {
  getById,
  create,
  update,
  deleteById,
} = require("../../services/categories");
const { mapErrors } = require("../../utils/parser");

router.post("/", isAdmin(), async (req, res) => {
  try {
    const category = await create(req.body.name);
    res.json(category);
  } catch (error) {
    const message = mapErrors(error);
    res.status(400).json({ message });
  }
});

router.delete("/:id", isAdmin(), async (req, res) => {
  try {
    const id = req.params.id;
    await deleteById(id);
    res.status(204).end();
  } catch (error) {
    const message = mapErrors(error);
    res.status(400).json({ message });
  }
});

router.get("/:id", isAdmin(), async (req, res) => {
  try {
    const id = req.params.id;
    const category = await getById(id);
    res.json(category);
  } catch (error) {
    const message = mapErrors(error);
    res.status(400).json({ message });
  }
});

router.put("/:id", isAdmin(), async (req, res) => {
  try {
    const id = req.params.id;
    const category = await update(id, req.body.name);
    res.json(category);
  } catch (error) {
    const message = mapErrors(error);
    res.status(400).json({ message });
  }
});

module.exports = router;
