const classesService = require('./classesService');
const ClassRole = require('../../enums/class_role.enum');

function makeid(length) {
  var result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result = result + characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

class classesController {
  async getAllClasses(req, res, next) {
    try {
      const classes = await classesService.classList();
      res.json({
        isSuccess: true,
        classes
      })
    } catch (err) {
      next(err);
    }
  }

  async getClassDetail(req, res, next) {
    try {
      const { id: classId } = req.params;
      //GetClass;
      const room = await classesService.findClassById(classId);

      if (!room) {
        return next(Error("Class not found!"));
      }

      const teachers = await classesService.getUserClassByRole(classId, ClassRole.TEACHER);
      const students = await classesService.getUserClassByRole(classId, ClassRole.STUDENT);

      res.json({
        isSuccess: true,
        data: {
          className: room.name,
          description: room.description,
          teachers,
          students
        }
      });

    } catch (err) {
      return next(err);
    }
  }

  async createNewClass(req, res) {
    try {
      let data = {
        name: req.body.name,
        description: req.body.description,
        cover: req.body.cover,
        student_link: makeid(50),
        teacher_link: makeid(50)
      };
      await classesService.createData(data);

      const categories = await classesService.classList();
      const classItem = categories[categories.length - 1];
      const classId = classItem.id;
      let userClass = {
        class_id: classId,
        user_id: req.user.id,
        role: 'teacher',
      };
      await classesService.createUserClass(userClass);

      res.json(
        {
          isSuccess: true,
          message: "Create class successfully!"
        }
      )

    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = new classesController();