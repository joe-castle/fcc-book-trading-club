import mongoose from 'mongoose';
import express from 'express';
// import session from 'express-session';
// import connectRedis from 'connect-redis';
// import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import passport from '../strategies/local';
import render from '../server-render';

import books from '../controllers/books';
import users from '../controllers/users';

import client from '../client';

const app = express();
// const RedisStore = connectRedis(session);

app
  .use('/assets', express.static(`${__dirname}/../assets`))
  .use(bodyParser.json())
//  .use(cookieParser())
//  .use(session({
//   store: new RedisStore({ client }),
//   secret: 'NEEDS TO BE CHANGED',
//   resave: false,
//   saveUninitialized: false
// }))
  .use(passport.initialize())
  .use(passport.session())
  .use(books)
  .use(users)
  .get('*', render)

export default app;
