import bcrypt from 'bcrypt';
import passport from 'passport';
import { Strategy } from 'passport-local';

import Users from '../models/Users';

passport.use(new Strategy({
  usernameField: 'email',
},
  (email, password, done) => {
    Users
      .findByEmail(email)
      .then((user) => {
        if (!user) return done(null, false);

        bcrypt
          .compare(password, user.password)
          .then((result) => {
            if (!result) return done(null, false);

            return done(null, user);
          })
          .catch(err => done(null, err));
      })
      .catch((err) => { throw err; });
  },
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  Users
    .get(id)
    .then(user => done(null, user));
});

export default passport;
