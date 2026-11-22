const router = require("express").Router();
const { hasUser } = require("../middlewares/guards");
const { update, updatePicture } = require("../services/users");
const upload = require("../middlewares/upload");
const { validatePicture } = require("../middlewares/validatePicture");
const { uploadImage } = require("../utils/helpers/cloudinary");
const { mapErrors } = require("../utils/parser");

router.put("/", hasUser(), async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await update(
      userId,
      req.body.firstName,
      req.body.lastName,
    );
    res.json(user);
  } catch (error) {
    const message = mapErrors(error);
    res.status(400).json({ message });
  }
});

router.put(
  "/picture",
  hasUser(),
  upload.single("picture"),
  validatePicture,
  async (req, res) => {
    try {
      const result = await uploadImage(
        req.file.buffer,
        "pregnancy-diary/profile-pictures"
      );
      const user = await updatePicture(
        req.user._id,
        result.secure_url,
        result.public_id
      );
      res.json(user);
    } catch (error) {
      const message = mapErrors(error);
      res.status(400).json({ message });
    }
  });

module.exports = router;