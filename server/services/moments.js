const Moment = require("../models/Moment");
const Week = require("../models/Week");

async function create(weekId, date, title, content) {
  const moment = new Moment({
    date,
    title,
    content,
  });
  const result = await moment.save();
  const week = await Week.findById(weekId);
  week.moments.push(result._id);
  await week.save();
  return result;
}

async function deleteById(id) {
  return Moment.findByIdAndDelete(id);
}

async function getById(id) {
  return await Moment.findById(id);
}

async function update(id, date, title, content) {
  const moment = await getById(id);
  moment.date = date;
  moment.title = title;
  moment.content = content;
  await moment.save();
  return moment;
}

module.exports = {
  create,
  deleteById,
  getById,
  update,
};
