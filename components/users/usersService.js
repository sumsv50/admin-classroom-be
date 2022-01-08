const db = require('../../models/index');
const { Users } = db;

module.exports.getAllUsers = async function() {
  const users = await Users.findAll({
    attributes: ['id', 'avatar', 'email', ['student_id', 'studentId'], 'isBanned'],
    order: [
      // Will escape title and validate DESC against a list of valid direction parameters
      ['email', 'ASC'],
    ]
  });
  return users;
}

module.exports.getUserById = async function(userId) {
  const user = await Users.findOne({
    where: { id: userId }
  });
  return user;
}

module.exports.updateUser = async function(userId, newInfo) {
  const updatedResult = await Users.update(newInfo, {
    where: { id: userId }
  });
  return updatedResult;
}
