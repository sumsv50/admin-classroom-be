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

  async updateUserInfo(req, res, next) {
    try {
      const userId = req.params.userId;
      const user = await usersService.getUserById(userId);
      if(!user) {
        return next(Error('User not found!'));
      }
      await usersService.updateUser(userId, req.body);
      
      res.json({
        isSuccess: true
      })
    } catch(err) {
      return next(err);
    }
  }

   async getUserInfo(req, res, next) {
    try {
      const userId = req.params.userId;
      const user = await usersService.getUserInfoById(userId);
      if (!user) {
        return next(Error('User not found!'));
      };
      user.status = user.isBanned ? UserStatus.BANNED : UserStatus.ACTIVE
      const classes = await usersService.getAllClassesOfUser(userId);
      
      res.json({
        isSuccess: true,
        data: {
          ...user,
          classes
        }
      })
    } catch(err) {
      return next(err);
    }
  }

}

module.exports = new usersController();