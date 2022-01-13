const adminsService = require('./adminsService');
const formidable = require('formidable');
const UserStatus = require('../../enums/user_status');
const cloudinary = require('../../config/cloudinary');

class usersController {
  async getAllAdmins(req, res, next) {
    try {
      const admins = await adminsService.getAllAdmins();
      admins.forEach(admin => admin.status = admin.isBanned ? UserStatus.BANNED : UserStatus.ACTIVE);
      res.json({
        isSuccess: true,
        admins
      })
    } catch (err) {
      next(err);
    }
  }

  async updateAdminInfo(req, res, next) {
    try {
      const adminId = req.params.adminId;
      const admin = await adminsService.getAdminById(adminId);

      if (!admin) {
        return next(Error('Admin not found!'));
      }
      await adminsService.updateAdmin(adminId, req.body);

      res.json({
        isSuccess: true
      })
    } catch (err) {
      return next(err);
    }
  }

  async getAdminInfo(req, res, next) {
    try {
      const adminId = req.params.adminId;
      const admin = await adminsService.getAdminInfoById(adminId);
      if (!admin) {
        return next(Error('User not found!'));
      };
      admin.status = admin.isBanned ? UserStatus.BANNED : UserStatus.ACTIVE
      res.json({
        isSuccess: true,
        data: {
          ...admin,
        }
      })
    } catch (err) {
      return next(err);
    }
  }

  async createAdmin(req, res, next) {
    try {
      const form = formidable({ multiples: false });
      form.parse(req, async (err, fields, file) => {
        try {
          if (err) {
            next(err);
            return;
          }

          const avatar = file?.avatar;
          const newAdmin = { ...fields };

          const admin = await adminsService.getAdminByEmail(newAdmin.email);

          if(admin) {
            return next(new Error('Email is have been taken!'));
          }

          if (avatar) {
            const result = await cloudinary.uploadToCloudinary(avatar.filepath, 'avatar');
            newAdmin.avatar = result.secure_url;
          }

          const createdResult = await adminsService.createNewAdmin(newAdmin);
          console.log(createdResult);
          res.json({
            isSuccess: true,
            data: {
              id: createdResult.id,
              createdAt: createdResult.createdAt
            }
          })
          
        } catch (err) { next(err) };
      });
    } catch (err) { next(err) };
  }

}

module.exports = new usersController();