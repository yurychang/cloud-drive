import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import appRoute from './app/app.routing';

dotenv.config({
    path: path.resolve(__dirname, `./environments/${process.env.NODE_ENV}.env`),
});

const app = express();

app.use('/', appRoute);

app.listen(process.env.PORT, () =>
    console.log('http server is running at port 3000.')
);
