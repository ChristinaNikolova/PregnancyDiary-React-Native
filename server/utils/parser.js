const { errors } = require("./constants/global");
const { trimester } = require("./constants/week");

function mapErrors(err) {
  if (Array.isArray(err)) {
    return err;
  } else if (err.name == "ValidationError") {
    return Object.values(err.errors).map((e) => ({ msg: e.message }));
  } else if (typeof err.message == "string") {
    return [{ msg: err.message }];
  } else {
    return [{ msg: errors.REQUEST }];
  }
}

function formatCreatedAt(createdAt) {
  return (
    monthNames[createdAt.getMonth() + 1] +
    " " +
    createdAt.getDate() +
    ", " +
    createdAt.getFullYear()
  );
}

function isDueDateValid(date) {
  const dueDate = parseDate(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return dueDate >= today;
}

function parseDate(date) {
  const [year, month, day] = date.split("-").map(Number);
  return new Date(year, month - 1, day);
}

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function getTrimesterName(week) {
  if (week <= 13) {
    return trimester.FIRST;
  } else if (week <= 27) {
    return trimester.SECOND;
  }
  return trimester.THIRD;
}

module.exports = {
  mapErrors,
  formatCreatedAt,
  getTrimesterName,
  parseDate,
  isDueDateValid,
};
