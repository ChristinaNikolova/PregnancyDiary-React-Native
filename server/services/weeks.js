const Week = require("../models/Week");
const { weekDetailsViewModel } = require("../utils/mapper/week");

async function getById(id, hasToMap = false) {
  if (hasToMap) {
    return weekDetailsViewModel(await Week.findById(id).populate("moments"));
  }
  return await Week.findById(id);
}

async function update(id, mood, myWeight, myBellySize) {
  const week = await getById(id);
  week.mood = mood;
  week.myWeight = myWeight;
  week.myBellySize = myBellySize;
  await week.save();
  return week;
}

module.exports = {
  getById,
  update,
};
