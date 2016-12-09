import mongoose from 'mongoose';
import express from 'express';
// import session from 'express-session';
// import connectMongo from 'connect-mongo';
// import cookieParser from 'cookie-parser';
// import bodyParser from 'body-parser';

// import passport from '../strategies/local';
import render from '../server-render';

import books from '../controllers/books';


const app = express();
// const MongoStore = connectMongo(session);

mongoose.Promise = global.Promise;
mongoose.connect('localhost:27017/booktradingclub');

app.use('/assets', express.static(`${__dirname}/../assets`));
// app.use(bodyParser.json());
// app.use(cookieParser());
// app.use(session({
//   store: new MongoStore({ mongooseConnect: mongoos.connection }),
//   secret: 'NEEDS TO BE CHANGED',
//   resave: false,
//   saveUninitialized: false
// }));
// app.use(passport.initialize());
// app.use(passport.session());
app.use(books);
app.get('*', render);

export default app;
