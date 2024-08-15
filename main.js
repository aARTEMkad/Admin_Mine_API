import express, { json } from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import { Server } from 'socket.io';
import http from 'http';
// ----
import ServerRouter from './router/ServerRouter.js';

dotenv.config()

const app = express();

const PORTAPI = process.env.PORT || 3001
const server = http.createServer(app);
const io = new Server(server);






mongoose.connect(process.env.URLMDB)
.then(() => {
    console.log("Connected MongoDB");
})
.catch((err) => {
    console.log(`Error = ${err}`);
});


app.listen(PORTAPI, () => {

    app.use(express.json())
    app.use(cors())

    app.use('/api', (req, res, next) => {
        req.io = io;
        next();
    },ServerRouter);
    console.log(`Start API on port = "${PORTAPI}"`);
})