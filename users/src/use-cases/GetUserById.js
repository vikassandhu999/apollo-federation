const userDataSource = require('../data-source/UserDataSource');

function toResponse(user) {
  return {
    id: user.id,
    email: user.email,
    fullName: user.fullName,
  };
}

async function getUserById(id) {
  const foundUser = await userDataSource.findById(id);
  if (!foundUser) {
    throw new Error('User not found');
  }
  return toResponse(foundUser);
}

module.exports = getUserById;
