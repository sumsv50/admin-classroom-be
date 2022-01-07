const usersService = require('./usersService');
const UserStatus = require('../../enums/user_status');

class usersController {
  async getAllUsers(req, res, next) {
    try {
      const users = await usersService.getAllUsers();
      users.forEach(user => user.status = user.isBanned ? UserStatus.BANNED : UserStatus.ACTIVE);
      res.json({
        isSuccess: true,
        users
      })
    } catch(err) {
      next(err);
    }
  }
}

module.exports = new usersController();