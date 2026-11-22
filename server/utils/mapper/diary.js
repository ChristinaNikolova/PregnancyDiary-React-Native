const { babyViewModel } = require("./baby");
const { weekListViewModel } = require("./week");

// todo cleanup
function diaryViewModel(diary) {
  return {
    id: diary._id,
    title: diary.title,
    description: diary.description,
    dueDate: diary.dueDate,
    gender: diary.gender,
  };
}

function diaryDetailsViewModel(diary) {
  return {
    id: diary._id,
    title: diary.title,
    description: diary.description,
    dueDate: diary.dueDate,
    gender: diary.gender,
    isBabyBorn: diary.isBabyBorn,
    weeks: diary.weeks.map(weekListViewModel).sort((a, b) => a.title - b.title),
    baby: diary.baby && babyViewModel(diary.baby),
  };
}

module.exports = {
  diaryViewModel,
  diaryDetailsViewModel,
};
