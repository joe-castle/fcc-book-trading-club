import { Router } from 'express';

import Users from '../models/Users';
import passport from '../strategies/local';

const users = Router();

// const user = new Users({
//   id: 'rkYaTyo7l',
//   name: 'joe',
//   email: 'test@test.com',
//   password: '$2a$10$E0/u2Kded2tizBmRwPQVE.fsTn0E/XznK1P0HF5jNcpSWa.n/Tmrm',
//   city: 'london',
//   state: 'essex',
//   ownBooks: ['rkkiyxjXx'],
//   outboundTradeRequests: [],
//   inboundTradeRequests: [],
// });

users.put('/api/users', (req, res) => {
  // TODO: const { user } = req;

  Users.get(user.id)
    .then((user) => {
      user
        .update(req.body)
        .save()
        .then(() => res.send(user));
    });
});

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

          newUser
            .encryptPassword()
            .save()
            .then(() => {
              req.login(newUser, (err) => {
                if (err) throw err;

                res.status(201).send(newUser /* TODO:.exclude('password')*/);
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
