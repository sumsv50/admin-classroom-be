const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const authService = require('../components/auth/authService');
const { JWT_SECRET } = require('../config/authentication');
const AppError = require('../util/AppError');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken("Authorization");
opts.secretOrKey = JWT_SECRET;

passport.use(new JwtStrategy(opts, async function (jwt_payload, done) {
  try {
    const admin = await authService.findById(jwt_payload.sub);
    if (admin) {
      if (admin.isBanned) {
        return done(AppError('Your account is banned!', 401), false);
      }
      return done(null, { id: admin.id });
    }
    done(AppError('UnAuthentication!', 401), false);
  } catch (err) {
    done(err, false);
  }
}));

passport.use(new LocalStrategy(
  {
    usernameField: 'email',
  },
  async function (email, password, done) {
    try {
      const admin = await authService.checkCredential(email, password);
      if (admin) {
        if (admin.isBanned) {
          return done(new Error('Your account is banned!'), false);
        }
        return done(null, { id: admin.id, email: admin.email, name: admin.name, avatar: admin.avatar });
      }
      return done(new Error('Incorrect email or password!'), false);

    } catch (err) {
      console.log(err);
      return done(err, false);
    }
  }
));

module.exports = passport;
