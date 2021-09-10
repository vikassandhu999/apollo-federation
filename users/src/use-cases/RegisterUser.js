const userDataSource = require('../data-source/UserDataSource');

function toResponse(user) {
  return {
    id: user.id,
    email: user.email,
    fullName: user.fullName,
  };
}

async function registerUser(input) {
  const { email, fullName, password } = input;
  const emailAlreadyInUse = !!(await userDataSource.findByEmail(email));
  if (emailAlreadyInUse) {
    throw new Error('Email already in use');
  }
  const createdUser = await userDataSource.createUser({
    email,
    password,
    fullName,
  });
  return toResponse(createdUser);
}

module.exports = registerUser;
