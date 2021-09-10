const jwt = require('jsonwebtoken');
const userDataSource = require('../data-source/UserDataSource');
const Password = require('../utils/Password');

async function createAccessToken(user) {
  const secret = process.env.ACCESS_TOKEN_SECRET;
  const expiresIn = process.env.TOKEN_EXPIRATION_TIME;

  const payload = {
    id: user.id,
    email: user.email,
  };

  return jwt.sign(payload, secret, {
    expiresIn,
    algorithm: 'HS256',
  });
}

async function loginUser(input) {
  const { email, password } = input;
  const foundUser = await userDataSource.findByEmail(email);
  if (!foundUser) {
    throw new Error("Email or Password doesn't match");
  }
  const hashedPassword = foundUser.password;
  const doesPasswordMatch = Password.compare(password, hashedPassword);
  if (!doesPasswordMatch) {
    throw new Error("Email or Password doesn't match");
  }
  const accessToken = await createAccessToken(foundUser);
  return {
    accessToken,
  };
}

module.exports = loginUser;
