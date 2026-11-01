const router = require("express").Router();
const { body, validationResult } = require("express-validator");
const { isAdmin } = require("../../middlewares/guards");
const {
  allAdmin,
  getByIdAdmin,
  create,
  update,
  deleteById,
} = require("../../services/articles");
const { mapErrors } = require("../../utils/parser");
const { errors: globalError } = require("../../utils/constants/global");

router.post(
  "/",
  isAdmin(),
  body("picture").isURL().withMessage(globalError.INVALID_URL),
  async (req, res) => {
    try {
      const { errors } = validationResult(req);
      if (errors.length > 0) {
        throw mapErrors(errors);
      }
      const article = await create(
        req.body.title,
        req.body.content,
        req.body.picture,
        req.body.category
      );
      res.json(article);
    } catch (error) {
      const message = mapErrors(error);
      res.status(400).json({ message });
    }
  }
);

router.get("/", isAdmin(), async (req, res) => {
  try {
    const articles = await allAdmin();
    res.json(articles);
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
    const article = await getByIdAdmin(id, false);
    res.json(article);
  } catch (error) {
    const message = mapErrors(error);
    res.status(400).json({ message });
  }
});

router.put(
  "/:id",
  isAdmin(),
  body("picture").isURL().withMessage(globalError.INVALID_URL),
  async (req, res) => {
    try {
      const { errors } = validationResult(req);
      if (errors.length > 0) {
        throw mapErrors(errors);
      }
      const id = req.params.id;
      const article = await update(
        id,
        req.body.title,
        req.body.content,
        req.body.picture,
        req.body.category
      );
      res.json(article);
    } catch (error) {
      const message = mapErrors(error);
      res.status(400).json({ message });
    }
  }
);

module.exports = router;
