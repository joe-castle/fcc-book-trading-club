import { Router } from 'express';
import bcrypt from 'bcrypt'

import Users from '../models/Users';
import passport from '../strategies/local';

const users = Router();

users.post('/signup', (req, res) => {
  if (!req.body.email || !req.body.name || !req.body.password) {
    res.status(400)
      .send('Please provide a name, email and password to signup.');
  } else {
    Users.findOne({ email: req.body.email })
      .then(user => {
        if (user) {
          res.status(409)
            .send('A user with that email already exists, please try again.');
        } else {
          Users.create({
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10)
          }).then(user => {
              req.login(user, (err) => {
                if (err) {
                  throw err;
                }
              });

              // TODO: Return user without password. .select('-password') not working

              res.status(201).send(user);
            })
        }
      })
  }
});

users.post('/login', passport.authenticate('local'), (req, res) => {

});

export default users;