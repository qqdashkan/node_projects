const { users } = require('../storage');

function updateUsersList(newUser) {
  users.push(newUser);
  return newUser;
}

module.exports = {
  updateUsersList,
};
