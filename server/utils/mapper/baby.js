function babyViewModel(baby) {
  return {
    id: baby._id,
    name: baby.name,
    gender: baby.gender,
    birthDate: baby.birthDate,
    birthTime: baby.birthTime,
    height: baby.height,
    weight: baby.weight,
    picture: baby.picture
      ? {
        url: baby.picture.url,
      }
      : null,
  };
}

module.exports = {
  babyViewModel,
};
