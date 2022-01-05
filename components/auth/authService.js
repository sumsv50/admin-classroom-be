const db = require('../../models/index');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { Admins } = db;

module.exports.findById = async function (id) {
  const user = await Admins.findOne({
    where: {
      "id": id
    }
  })
  return user;
}

module.exports.isExistEmail = async (email) => {
  const user = await Admins.findOne({
    where: {
      email
    }
  })
  return !!user;
}

module.exports.createAdmin = async (userData) => {
  const hash = bcrypt.hashSync(userData.password, saltRounds);
  const admin = await Admins.create({
    email: userData.email,
    password: hash
  });
  return admin;
}

module.exports.checkCredential = async function (email, password) {
  const admin = await Admins.findOne({
    where: {
      email
    }
  })

  if (!admin || !admin.password) {
    return false;
  }
  if (!admin || !bcrypt.compareSync(password, admin.password)) {
    return false;
  }
  return admin;
}
