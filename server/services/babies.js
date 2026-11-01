const Baby = require("../models/Baby");
const Diary = require("../models/Diary");

async function create(
  diaryId,
  name,
  gender,
  birthDate,
  birthTime,
  height,
  weight,
  picture
) {
  const baby = new Baby({
    name,
    gender,
    birthDate,
    birthTime,
    height,
    weight,
    picture,
  });

  const result = await baby.save();
  const diary = await Diary.findById(diaryId);
  diary.baby = result._id;
  diary.isBabyBorn = true;
  await diary.save();
  return result;
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
};
