const bcrypt = require('bcrypt');

const SALTS = 10;

const Password = Object.freeze({
  hash: (text) => bcrypt.hashSync(text, SALTS),
  compare: (text, hash) => bcrypt.compareSync(text, hash),
});

module.exports = Password;
