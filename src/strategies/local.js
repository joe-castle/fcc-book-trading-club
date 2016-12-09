import bcrypt from 'bcrypt';
import passport from 'passport';
import { Strategy } from 'passport-local';

import Users from '../models/users';

passport.use(new Strategy({
    usernameField: 'email',
  },
  (email, password, done) => {
    Users.findOne({ email })
      .then(user => {
        if (!user) { 
          return done(null, false); 
        }

        bcrypt.compare(password, user.password, (err, res) => {
          if (err) {
            throw err;
          }

          if (!res) { 
            return done(null, false); 
          }
          // TODO: remove password
          return done(null, user);
        })
      })
      .catch(err => done(err))
  }
));

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((user, done) => {
  Users.findById(user._id, { password: 0 })
    .then(user => done(null, user));
});

export default passport
