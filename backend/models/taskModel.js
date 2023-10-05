import mongoose from "mongoose";

const taskSchema = mongoose.Schema(
    {
        taskName: {
            type: String,
            required: true,
        },
        priority: {
            type: String,
            enum: ['high', 'medium', 'low'],
            default: 'medium',
        },
        label: {
            type: String,
        },
        isComplete: {
            type: Boolean,
            default: false,
        }
    }
);

export const Task = mongoose.model('Task', taskSchema);
