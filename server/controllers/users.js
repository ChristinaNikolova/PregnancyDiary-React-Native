const router = require("express").Router();
const { hasUser } = require("../middlewares/guards");
const { mapErrors } = require("../utils/parser");

router.put("/", hasUser(), async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await update(
      userId,
      req.body.firstName,
      req.body.lastName,
      req.body.picture,
    );
    res.json(user);
  } catch (error) {
    const message = mapErrors(error);
    res.status(400).json({ message });
  }
});

module.exports = router;
