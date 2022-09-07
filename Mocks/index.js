const users = require("./users.json");

const personal = require("./personal.json");

module.exports = () => ({
  users: users,
  personal: personal,
});
