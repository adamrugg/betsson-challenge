import express from "express";
import { Task } from "../models/taskModel.js";
const router = express.Router();

// Route for creating a new task
router.post('/', async (request, response) => {
    try {
        const { taskName, priority, label } = request.body;

        if (!taskName) {
            return response.status(400).json({ message: "Task field is required" });
        }

        const newTask = new Task({
            taskName,
            priority: priority || 'medium', // If priority is not provided, use 'medium'
            label: label || '', // If label is not provided, use an empty string
        });

        const task = await Task.create(newTask);

        return response.status(201).json({ message: 'Task created successfully', data: task });

    } catch (error) {
        console.log(error.message);
        response.status(500).json({ error: error.message });
    }
});


// Route for getting all 
router.get('/', async (request, response) => {
    try {
        const tasks = await Task.find({});
        return response.status(200).json({
            count: tasks.length,
            data: tasks,
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).json({ error: error.message });
    }
});

// Route for getting a single task by id
router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const task = await Task.findById(id);
        
        return response.status(200).json(task);

    } catch (error) {
        console.log(error.message);
        response.status(500).json({ error: error.message });
    }
});

// Route for updating a task
router.put('/:id', async (request, response) => {
    try {
        const { taskName, priority, label } = request.body;

        if (!taskName) {
            return response.status(400).json({ message: "Task field is required" });
        }

        const { id } = request.params;

        const result = await Task.findByIdAndUpdate(id, request.body);

        if (!result) {
            return response.status(404).json({ message: ' Task not found ' })
        }

        return response.status(200).send({ message: 'Task has been successfully updated ' });

    } catch (error) {
        console.log(error.message);
        response.status(500).json({ error: error.message });
    }
});

// Route for deleting a task
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const result = await Task.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).json({ message: ' Task not found ' })
        }

        return response.status(200).send({ message: 'Task has been successfully deleted ' });

    } catch (error) {
        console.log(error.message);
        response.status(500).json({ error: error.message });
    }
});

export default router;