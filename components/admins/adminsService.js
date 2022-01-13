const { Sequelize } = require('../../models/index');
const db = require('../../models/index');
const bcrypt = require('bcrypt');
const { Admins } = db;
const saltRounds = 10;

module.exports.getAllAdmins = async function() {
  const admins = await Admins.findAll({
    attributes: ['id', 'name', 'avatar', 'email', 'isBanned', 'createdAt'],
    order: [
      // Will escape title and validate DESC against a list of valid direction parameters
      ['email', 'ASC'],
    ]
  });
  return admins;
}

module.exports.getAdminById = async function(adminId) {
  const admin = await Admins.findOne({
    where: {
      id: adminId
    },
  })
  return admin;
}

module.exports.getAdminInfoById = async function(adminId) {
  const admin = await Admins.findOne({
    where: {
      id: adminId
    },
    attributes: ['id', 'name', 'email', 'avatar', 'isBanned', 'createdAt']
  })
  return admin;
}

module.exports.updateAdmin = async function(adminId, newInfo) {
  const updatedResult = await Admins.update(newInfo, {
    where: { id: adminId }
  });
  return updatedResult;
}

module.exports.createNewAdmin = async function(newAdmin) {
  const hash = bcrypt.hashSync(newAdmin.password, saltRounds);
  newAdmin.password = hash;

  const admin = await Admins.create(newAdmin);
  return admin;
}

module.exports.getAdminByEmail = async function(email) {
  const admin = await Admins.findOne({
    where: {
      email
    },
  })
  return admin;
}
