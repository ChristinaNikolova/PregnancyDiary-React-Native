const User = require("../models/User");

async function update(userId, firstName, lastName, picture) {
  const user = await getById(userId);
  user.firstName = firstName;
  user.lastName = lastName;
  if (picture !== undefined) {
    user.picture = picture;
  }
  await user.save();
  return user;
}

async function getById(id) {
  return await User.findById(id);
}

module.exports = {
  update,
};
