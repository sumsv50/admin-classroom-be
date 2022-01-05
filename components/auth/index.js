const express = require('express');
const router = express.Router();
const AuthController = require('./authController');
const { validateBody, schemas } = require('../../middlewares/inputValidation');
const passport = require('../../middlewares/passport');


//[POST] /sign-in
router.post('/sign-in',
    validateBody(schemas.signInSchema),
    passport.authenticate('local', { session: false }),
    AuthController.signIn
);



router.get('/user-infor',
    AuthController.getfromToken
)

router.post('/user-update', AuthController.updUser)

//[POST] /secret (For test)
router.post('/secret',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        console.log(req.user);
        res.json({ success: true })
    }
)

//[GET] /secret (For test)
router.get('/secret',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        console.log(req.user);
        res.json({ success: true, userId: req.user.id })
    }
)

module.exports = router;
