const Diary = require("../models/Diary");
const Week = require("../models/Week");
const Baby = require("../models/Baby");
const Moment = require("../models/Moment");
const {
  Types: { ObjectId },
} = require("mongoose");
const { getTrimesterName, isDueDateValid } = require("../utils/parser");
const {
  diaryViewModel,
  diaryDetailsViewModel,
  diaryHomeViewModel,
} = require("../utils/mapper/diary");
const { weekViewModel } = require("../utils/mapper/week");
const { errors } = require("../utils/constants/global");
const { subTitle, text, babySize, averageBabyWeight, averageBabyHeight } = require("../utils/constants/week");
const { getById: getWeekById } = require("./weeks");

async function create(
  title,
  description,
  dueDate,
  gender,
  userId
) {
  const isDateValid = isDueDateValid(dueDate);
  if (!isDateValid) {
    throw new Error(errors.INVALID_DATE);
  }
  const weeks = await getWeeks();
  const diary = new Diary({
    title,
    description,
    dueDate,
    gender,
    creator: userId,
    weeks,
  });
  await diary.save();
  return diary;
}

async function all(userId) {
  return (await Diary.find({ creator: new ObjectId(userId) })).map(
    diaryViewModel
  );
}

async function getActive(userId) {
  const diary = await Diary.findOne({
    creator: new ObjectId(userId),
    isActive: true,
  }).populate("baby");
  return diary ? diaryHomeViewModel(diary) : null;
}

async function deleteById(id) {
  const diary = await getById(id);
  diary.weeks.forEach(async (weekId) => {
    const week = await getWeekById(weekId);
    week.moments.forEach(async (momentId) => {
      await Moment.findByIdAndDelete(momentId);
    });
    await Week.findByIdAndDelete(weekId);
  });
  if (diary.isBabyBorn) {
    await Baby.findByIdAndDelete(diary.baby);
  }
  return Diary.findByIdAndDelete(id);
}

async function getById(id, hasToMap = false) {
  if (hasToMap) {
    return diaryDetailsViewModel(
      await Diary.findById(id).populate("weeks").populate("baby")
    );
  }
  return await Diary.findById(id);
}

async function getWeeksById(id) {
  const diary = await Diary.findById(id).populate('weeks', "title");
  return diary.weeks.map(weekViewModel);
}

async function getWeekByDiaryId(diaryId, weekTitle) {
  const diary = await Diary.findById(diaryId).populate("weeks");
  const week = diary.weeks.find((w) => w.title === weekTitle);
  return week._id
}

async function update(
  id,
  title,
  description,
  dueDate,
  gender
) {
  const isDateValid = isDueDateValid(dueDate);
  if (!isDateValid) {
    throw new Error(errors.INVALID_DATE);
  }
  const diary = await getById(id);
  diary.title = title;
  diary.description = description;
  diary.dueDate = dueDate;
  diary.gender = gender;
  await diary.save();
  return diary;
}

async function getWeeks() {
  let weeks = [];
  for (let i = 0; i < 40; i++) {
    const weekNumber = i + 1;
    const weekTitle = weekNumber.toString();
    const week = new Week({
      title: weekNumber,
      subTitle: subTitle[weekTitle],
      text: text[weekTitle],
      babySize: babySize[weekTitle],
      babyAverageWeight: averageBabyWeight[weekTitle],
      babyAverageHeight: averageBabyHeight[weekTitle],
      trimester: getTrimesterName(weekNumber),
    });
    weeks.push(week);
    await week.save();
  }
  return weeks;
}

module.exports = {
  create,
  getActive,
  all,
  deleteById,
  getById,
  update,
  getWeeksById,
  getWeekByDiaryId
};
