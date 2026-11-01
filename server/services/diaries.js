const Diary = require("../models/Diary");
const Week = require("../models/Week");
const Baby = require("../models/Baby");
const Moment = require("../models/Moment");
const {
  Types: { ObjectId },
} = require("mongoose");
const { compareDate, getTrimesterName } = require("../utils/parser");
const {
  diaryListViewModel,
  diaryDetailsViewModel,
} = require("../utils/mapper/diary");
const { errors } = require("../utils/constants/global");
const { subTitle, text } = require("../utils/constants/week");
const { getById: getWeekById } = require("./weeks");

async function create(
  title,
  description,
  positiveTestDate,
  dueDate,
  gender,
  userId
) {
  const validDates = compareDate(positiveTestDate, dueDate);
  if (!validDates) {
    throw new Error(errors.INVALID_DATE);
  }
  const weeks = await getWeeks();
  const diary = new Diary({
    title,
    description,
    positiveTestDate,
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
    diaryListViewModel
  );
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

async function update(
  id,
  title,
  description,
  positiveTestDate,
  dueDate,
  gender
) {
  const validDates = compareDate(positiveTestDate, dueDate);
  if (!validDates) {
    throw new Error(errors.INVALID_DATE);
  }
  const diary = await getById(id);
  diary.title = title;
  diary.description = description;
  diary.positiveTestDate = positiveTestDate;
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
      trimester: getTrimesterName(weekNumber),
    });
    weeks.push(week);
    await week.save();
  }
  return weeks;
}

module.exports = {
  create,
  all,
  deleteById,
  getById,
  update,
};
