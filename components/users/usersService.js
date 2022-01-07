const db = require('../../models/index');
const { Users } = db;

module.exports.getAllUsers = async function () {
  const users = await Users.findAll({
    attributes: ['id', 'avatar', 'email', ['student_id', 'studentId'], 'isBanned'],
  });
  return users;
}