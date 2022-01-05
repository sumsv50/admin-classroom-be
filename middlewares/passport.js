const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const authService = require('../components/auth/authService');
const { JWT_SECRET } = require('../config/authentication');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken("Authorization");
opts.secretOrKey = JWT_SECRET;

passport.use(new JwtStrategy(opts, async function (jwt_payload, done) {
  try {
    const user = await authService.findById(jwt_payload.sub);
    if (user) return done(null, { id: user.id });
    done(null, false);
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
        return done(null, { id: admin.id });
      }
      return done(new Error('Incorrect email or password'), false);

    } catch (err) {
      console.log(err);
      return done(err, false);
    }
  }
));

module.exports = passport;
