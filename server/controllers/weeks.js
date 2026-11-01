const router = require("express").Router();
const { hasUser } = require("../middlewares/guards");
const { getById, update } = require("../services/weeks");
const { mapErrors } = require("../utils/parser");

router.get("/:id", hasUser(), async (req, res) => {
  try {
    const id = req.params.id;
    const week = await getById(id, true);
    res.json(week);
  } catch (error) {
    const message = mapErrors(error);
    res.status(400).json({ message });
  }
});

router.put("/:id", hasUser(), async (req, res) => {
  try {
    const id = req.params.id;
    const week = await update(
      id,
      req.body.mood,
      req.body.myWeight,
      req.body.myBellySize,
      req.body.babyWeight,
      req.body.babyHeight
    );
    res.json(week);
  } catch (error) {
    const message = mapErrors(error);
    res.status(400).json({ message });
  }
});

module.exports = router;
