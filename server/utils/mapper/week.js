const { parseDate } = require("../parser");
const { momentViewModel } = require("./moment");

// todo cleanyp + better naming
function weekViewModel(week) {
  return {
    id: week._id,
    title: week.title,
  };
}


function weekListViewModel(week) {
  return {
    id: week._id,
    title: week.title,
    subTitle: week.subTitle,
    trimester: week.trimester,
  };
}

function weekDetailsViewModel(week) {
  return {
    id: week._id,
    title: week.title,
    subTitle: week.subTitle,
    trimester: week.trimester,
    text: week.text,
    myWeight: week.myWeight,
    myBellySize: week.myBellySize,
    babyAverageWeight: week.babyAverageWeight,
    babyAverageHeight: week.babyAverageHeight,
    mood: week.mood,
    moments: week.moments
      .map(momentViewModel)
      .sort((a, b) => parseDate(b.date) - parseDate(a.date)),
  };
}

module.exports = {
  weekViewModel,
  weekListViewModel,
  weekDetailsViewModel,
};
