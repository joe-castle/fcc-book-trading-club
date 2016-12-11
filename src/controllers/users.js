import { Router } from 'express';

import Users from '../models/Users';
import passport from '../strategies/local';

const users = Router();

users.post('/signup', (req, res) => {
  if (!req.body.email || !req.body.name || !req.body.password) {
    res.status(400)
      .send('Please provide a name, email and password to signup.');
  } else {
    Users.findByEmail(req.body.email)
      .then((user) => {
        if (user) {
          res.status(409)
            .send('A user with that email already exists, please try again.');
        } else {
          const newUser = new Users({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
          });

          newUser.encryptPassword()
            .save()
            .then(() => {
              req.login(newUser, (err) => {
                if (err) throw err;

                res.status(201).send(newUser.exclude('password'));
              });
            });
        }
      });
  }
});

users.post('/login', passport.authenticate('local'), (req, res) => {
  res.send(req.user.exclude('password'));
});

export default users;
