import express from "express";
import { PORT } from "./config.js";
import mongoose from "mongoose";
import { Task } from "./models/taskModel.js";
import taskRoutes from './routes/taskRoutes.js';
import cors from 'cors';
import 'dotenv/config';
const app = express();

app.use(express.json());

app.use(cors());

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send("To-Do List");
});

app.use('/tasks', taskRoutes);

mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
        console.log('Connected to database');
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });
