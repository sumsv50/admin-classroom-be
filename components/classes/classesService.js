const { raw } = require('express');
const db = require('../../models/index');
const { Classes, User_Class, Users } = db;

module.exports.classesCategory = async function (userId) {
  const classes = await User_Class.findAll({
    where: {
      user_id: userId
    },
    include: Classes
  });
  return classes;
}

module.exports.classList = async function () {
  const classes = await Classes.findAll();
  return classes;
}

module.exports.findClassById = async function (id) {
  const room = await Classes.findOne({
    where: { 'id': id }
  });
  return room;
}

module.exports.createData = async function (data) {
  await Classes.create(data);
}

module.exports.createUserClass = async function (data) {
  await User_Class.create(data);
}

module.exports.getUserClassByRole = async function(classId, role) {
  const userClasses = await User_Class.findAll({
    where: {
      class_id: classId,
      role
    },
    attributes: [],
    include: {
      model: Users,
      attributes: ['id', 'email', 'avatar', 'createdAt']
    },
    raw: false
  })
  
  const users = userClasses.map(userClass => userClass.User);
  return users;
}