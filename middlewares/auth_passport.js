const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../app/models/user");
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "passwordKey",
};
passport.use(
  new JwtStrategy(jwtOptions, async (jwt_payload, done) => {
    try {
      var user = await User.findById(jwt_payload.id);
      if (user) {
        return done(null, user, "authInfo if need");
      } else {
        return done(null, false);
        // or you could create a new account
      }
    } catch (err) {
      return done(err, false);
    }
  })
);
module.exports = passport.authenticate("jwt", { session: false });
