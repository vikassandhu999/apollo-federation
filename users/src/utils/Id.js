const { v4: uuid } = require('uuid');

const Id = Object.freeze({
  makeId: () => uuid(),
});

module.exports = Id;
