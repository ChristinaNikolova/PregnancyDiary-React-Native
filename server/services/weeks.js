const Week = require("../models/Week");
const { weekDetailsViewModel } = require("../utils/mapper/week");

async function getById(id, hasToMap = false) {
  if (hasToMap) {
    return weekDetailsViewModel(await Week.findById(id).populate("moments"));
  }
  return await Week.findById(id);
}

async function update(id, mood, myWeight, myBellySize, babyWeight, babyHeight) {
  const week = await getById(id);
  week.mood = mood;
  week.myWeight = myWeight;
  week.myBellySize = myBellySize;
  week.babyWeight = babyWeight;
  week.babyHeight = babyHeight;
  await week.save();
  return week;
}

module.exports = {
  getById,
  update,
};
