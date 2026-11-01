function categoryListViewModel(category) {
  return {
    id: category._id,
    name: category.name,
  };
}

module.exports = {
  categoryListViewModel,
};
