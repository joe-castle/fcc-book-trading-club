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

app.use('/assets', express.static(`${__dirname}/../assets`));
app.use(bodyParser.json());
// app.use(cookieParser());
// app.use(session({
//   store: new RedisStore({ client }),
//   secret: 'NEEDS TO BE CHANGED',
//   resave: false,
//   saveUninitialized: false
// }));
app.use(passport.initialize());
app.use(passport.session());
app.use(books);
// app.use(users);
app.get('*', render);

export default app;
