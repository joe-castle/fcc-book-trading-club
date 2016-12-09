import express from 'express';
import mongoose from 'mongoose';

import render from '../server-render';

const app = express();

app.use('/assets', express.static(`${__dirname}/../assets`));
app.get('*', render);

mongoose.connect('localhost:27017/booktradingclub');

export default app;
