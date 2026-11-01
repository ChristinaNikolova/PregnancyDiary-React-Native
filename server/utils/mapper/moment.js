function momentViewModel(moment) {
  return {
    id: moment._id,
    date: moment.date,
    title: moment.title,
    content: moment.content,
  };
}

module.exports = {
  momentViewModel,
};
