const { Sequelize } = require('../../models/index');
const db = require('../../models/index');
const { Admins } = db;

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

module.exports.updateAdmin = async function(adminId, newInfo) {
  const updatedResult = await Admins.update(newInfo, {
    where: { id: adminId }
  });
  return updatedResult;
}