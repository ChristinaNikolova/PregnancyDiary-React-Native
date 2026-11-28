const { parseDate } = require("../parser");

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
    babySize: week.babySize,
    myWeight: week.myWeight,
    myBellySize: week.myBellySize,
    babyAverageWeight: week.babyAverageWeight,
    babyAverageHeight: week.babyAverageHeight,
  };
}

module.exports = {
  weekViewModel,
  weekListViewModel,
  weekDetailsViewModel,
};
