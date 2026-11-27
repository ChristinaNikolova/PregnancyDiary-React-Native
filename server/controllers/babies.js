const router = require("express").Router();
const { hasUser } = require("../middlewares/guards");
const upload = require("../middlewares/upload");
const { validatePicture } = require("../middlewares/validatePicture");
const { create, getById, update, updatePicture } = require("../services/babies");
const { uploadImage } = require("../utils/helpers/cloudinary");
const { mapErrors } = require("../utils/parser");

router.post("/", hasUser(), async (req, res) => {
  try {
    const baby = await create(
      req.body.diaryId,
      req.body.name,
      req.body.gender,
      req.body.birthDate,
      req.body.birthTime,
      req.body.height,
      req.body.weight,
    );
    res.json(baby);
  } catch (error) {
    const message = mapErrors(error);
    res.status(400).json({ message });
  }
});

router.put(
  "/:id/picture",
  hasUser(),
  upload.single("picture"),
  validatePicture,
  async (req, res) => {
    try {
      const result = await uploadImage(
        req.file.buffer,
        "pregnancy-diary/baby-pictures"
      );
      const baby = await updatePicture(
        req.params.id,
        result.secure_url,
        result.public_id
      );
      res.json(baby);
    } catch (error) {
      const message = mapErrors(error);
      res.status(400).json({ message });
    }
  });

router.get("/:id", hasUser(), async (req, res) => {
  try {
    const id = req.params.id;
    const baby = await getById(id);
    res.json(baby);
  } catch (error) {
    const message = mapErrors(error);
    res.status(400).json({ message });
  }
});

router.put("/:id", hasUser(), async (req, res) => {
  try {
    const id = req.params.id;
    const baby = await update(
      id,
      req.body.name,
      req.body.gender,
      req.body.birthDate,
      req.body.birthTime,
      req.body.height,
      req.body.weight,
      req.body.picture
    );
    res.json(baby);
  } catch (error) {
    const message = mapErrors(error);
    res.status(400).json({ message });
  }
});

module.exports = router;
