const Password = require('../utils/Password');
const Id = require('../utils/Id');
const User = require('../models/User.model');

async function findById(id) {
  const foundUser = await User.findOne({ id });
  if (!foundUser) return null;
  return foundUser;
}

async function findByEmail(email) {
  const foundUser = await User.findOne({ email });
  if (!foundUser) return null;
  return foundUser;
}

async function createUser(user) {
  const { email, password, fullName } = user;
  const hashedPassword = Password.hash(password);
  const newUser = new User({
    id: Id.makeId(),
    email,
    fullName,
    password: hashedPassword,
  });
  await newUser.save();
  return newUser;
}

const userDataSource = Object.freeze({
  findById,
  findByEmail,
  createUser,
});

module.exports = userDataSource;
