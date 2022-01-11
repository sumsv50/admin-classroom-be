const { Sequelize } = require('../../models/index');
const db = require('../../models/index');
const { Users, Classes, User_Class } = db;

module.exports.getAllUsers = async function() {
  const users = await Users.findAll({
    attributes: ['id', 'avatar', 'email', ['student_id', 'studentId'], 'isBanned', 'createdAt'],
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

module.exports.getUserInfoById = async function(userId) {
  const user = await Users.findOne({
    where: { id: userId },
    attributes: [
      'id',
      'name',
      'email',
      'avatar',
      ['student_id', 'studentId'],
      'createdAt',
      'isBanned'
    ]
  });
  return user;
}

module.exports.updateUser = async function(userId, newInfo) {
  const updatedResult = await Users.update(newInfo, {
    where: { id: userId }
  });
  return updatedResult;
}

module.exports.getAllClassesOfUser = async function (userId) {
  const userClasses = User_Class.findAll({
    where: {
      user_id: userId
    },
    include: {
      model: Classes,
      attributes: []
    },
    attributes: [
      ['class_id', 'classId'],
      'role',
      ['createdAt', 'joinedAt'],
      [Sequelize.literal('"Class"."name"'), 'className']
    ],
    raw: false 
  })

  return userClasses;
}