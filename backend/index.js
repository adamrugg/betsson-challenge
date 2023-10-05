import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Task } from "./models/taskModel.js";
import taskRoutes from './routes/taskRoutes.js';

const app = express();

app.use(express.json());


app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send("To-Do List");
});

app.use('/tasks', taskRoutes);

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('Connected to database');
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });
