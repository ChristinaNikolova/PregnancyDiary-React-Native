const User = require("../models/User");
const Picture = require("../models/Picture");
const { userViewModel } = require("../utils/mapper/user");

async function update(userId, firstName, lastName) {
  const user = await getById(userId);
  user.firstName = firstName;
  user.lastName = lastName;
  await user.save();
  await user.populate("picture");
  return userViewModel(user);
}

async function updatePicture(userId, url, publicId) {
  const user = await getById(userId);
  const picture = new Picture({
    url,
    publicId,
  });
  const result = await picture.save();
  user.picture = result._id;
  await user.save();
  await user.populate("picture");
  return userViewModel(user);
}

async function getById(id) {
  return await User.findById(id);
}

module.exports = {
  updatePicture,
  update,
};

