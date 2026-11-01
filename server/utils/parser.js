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

function compareDate(date1, date2) {
  const positiveTestDate = parseDate(date1);
  const dueDate = parseDate(date2);
  return dueDate > positiveTestDate;
}

function parseDate(date) {
  const parts = date.split(".").map((p) => p.trim());
  const year = parts[2];
  const month = Number(parts[1]) - 1;
  const day = Number(parts[0]) + 1;
  return new Date(year, month, day);
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
  compareDate,
  getTrimesterName,
  parseDate,
};
