const Moment = require("../models/Moment");

// todo check if week cleanup correctly
async function create(date, title, content) {
  const moment = new Moment({
    date,
    title,
    content,
  });
  return await moment.save();
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
