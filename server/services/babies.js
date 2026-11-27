const Baby = require("../models/Baby");
const Picture = require("../models/Picture");
const Diary = require("../models/Diary");
const { babyViewModel } = require("../utils/mapper/baby");
const { errors } = require("../utils/constants/global");

async function create(
  diaryId,
  name,
  gender,
  birthDate,
  birthTime,
  height,
  weight,
) {
  const baby = new Baby({
    name,
    gender,
    birthDate,
    birthTime,
    height,
    weight,
  });

  const result = await baby.save();
  const diary = await Diary.findById(diaryId);
  diary.baby = result._id;
  diary.isBabyBorn = true;
  await diary.save();
  return result;
}

async function updatePicture(id, url, publicId) {
  const baby = await getById(id);
  await baby.populate("picture");
  const oldPicture = baby.picture;
  const picture = new Picture({
    url,
    publicId,
  });
  const result = await picture.save();
  baby.picture = result._id;
  await baby.save();
  await baby.populate("picture");
  if (oldPicture) {
    try {
      await deleteImage(oldPicture.publicId);
      await Picture.findByIdAndDelete(oldPicture._id);
    } catch (error) {
      console.error(errors.NO_PICTURE, error);
    }
  }
  return babyViewModel(baby);
}

async function getById(id) {
  return await Baby.findById(id);
}

async function update(
  id,
  name,
  gender,
  birthDate,
  birthTime,
  height,
  weight,
  picture
) {
  const baby = await getById(id);
  baby.name = name;
  baby.gender = gender;
  baby.birthDate = birthDate;
  baby.birthTime = birthTime;
  baby.height = height;
  baby.weight = weight;
  baby.picture = picture;
  await baby.save();
  return baby;
}

module.exports = {
  create,
  getById,
  update,
  updatePicture,
};
