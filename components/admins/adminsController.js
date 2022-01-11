const adminsService = require('./adminsService');
const UserStatus = require('../../enums/user_status');

class usersController {
  async getAllAdmins(req, res, next) {
    try {
      const admins = await adminsService.getAllAdmins();
      admins.forEach(admin => admin.status = admin.isBanned ? UserStatus.BANNED : UserStatus.ACTIVE);
      res.json({
        isSuccess: true,
        admins
      })
    } catch(err) {
      next(err);
    }
  }

  async updateAdminInfo(req, res, next) {
    try {
      const adminId = req.params.adminId;
      const admin = await adminsService.getAdminById(adminId);

      if(!admin) {
        return next(Error('Admin not found!'));
      }
      await adminsService.updateAdmin(adminId, req.body);
      
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
      const user = await adminsService.getUserInfoById(userId);
      if (!user) {
        return next(Error('User not found!'));
      };
      user.status = user.isBanned ? UserStatus.BANNED : UserStatus.ACTIVE
      const classes = await adminsService.getAllClassesOfUser(userId);
      
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