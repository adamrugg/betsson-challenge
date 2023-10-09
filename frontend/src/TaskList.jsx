import React, { useState, useEffect } from 'react';
import TaskModal from './TaskModal';
import EditTaskModal from './EditTaskModal';
import { FaRegTrashAlt, FaEdit } from 'react-icons/fa';


const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editTask, setEditTask] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedLabel, setSelectedLabel] = useState(null);
    const [selectedPriority, setSelectedPriority] = useState(null);

    const handleLabelClick = (label) => {
        setSelectedLabel(label);
        setSelectedPriority(null);
    }

    const handlePriorityClick= (label) => {
        setSelectedPriority(priority);
        setSelectedLabel(null);
    }

    const openModal = () => {
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await fetch('http://localhost:5000/tasks');
            const data = await response.json();
            setTasks(data.data);
        } catch (error) {
            console.log('Error fetching tasks:', error.message);
        }
    }

    const handleCreateTask = async (newTaskData) => {
        try {
            const response = await fetch('http://localhost:5000/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newTaskData),
            });
            if (response.ok) {
                await fetchTasks();
            } else {
                console.error('Error creating task:', response.statusText);
            }
        } catch (error) {
            console.error('Error creating task:', error.message);
        }
    };


    const handleDelete = async id => {
        try {
            const response = await fetch(`http://localhost:5000/tasks/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setTasks(tasks.filter(task => task._id !== id));
            } else {
                console.error('Error deleting task:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting task:', error.message);
        }
    };

    const handleEditClick = (task) => {
        setEditTask(task);
        setIsEditModalOpen(true);
    };

    const handleEditTask = async (editedTask) => {
        try {
            const response = await fetch(`http://localhost:5000/tasks/${editedTask._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    taskName: editedTask.taskName,
                    priority: editedTask.priority,
                    label: editedTask.label,
                }),
            });
            if (response.ok) {
                await fetchTasks();
            } else {
                console.error('Error updating task:', response.statusText);
            }
        } catch (error) {
            console.error('Error updating task:', error.message);
        }
    };


    const handleComplete = async (id) => {
        try {
            const task = tasks.find(task => task._id === id);
            const updatedTask = { ...task, isComplete: !task.isComplete };
            const response = await fetch(`http://localhost:5000/tasks/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedTask),
            });
            if (response.ok) {
                await fetchTasks();
            } else {
                console.error('Error updating task:', response.statusText);
            }
        } catch (error) {
            console.error('Error updating task:', error.message);
        }
    };

    const getPriorityColorClass = (priority) => {
        switch (priority) {
            case 'high':
                return 'border-red-500 text-red-500';
            case 'medium':
                return 'border-yellow-500 text-yellow-500';
            case 'low':
                return 'border-green-500 text-green-500';
            default:
                return '';
        }
    }


    return (
        <div className="mx-auto  p-4 bg-white">
            <h1 className="text-2xl font-bold mb-4">Task List</h1>
            <ul>
                
                {tasks.map(task => (
                    <li key={task._id} className="flex justify-between items-center border-b py-2">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                checked={task.isComplete}
                                onChange={() => handleComplete(task._id)}
                            />
                            <span className={`ml-2 ${task.isComplete ? 'line-through text-gray-400' : ''}`}>
                                {task.taskName}
                                <span className="text-orange-500 ml-1">
                                    #{task.label}
                                </span>
                            </span>
                        </div>
                        <div className="flex items-center">
                            <div className={`border-2 ${getPriorityColorClass(task.priority)} py-1 rounded-full text-center font-semibold mx-2 capitalize w-20`}>
                                {task.priority}
                            </div>
                            <button className="mx-2 text-gray-600 hover:text-black text-xl">
                                <FaEdit onClick={() => handleEditClick(task)} />
                            </button>
                            <button className="mx-2 text-gray-600 hover:text-black text-xl">
                                <FaRegTrashAlt onClick={() => handleDelete(task._id)} />
                            </button>
                        </div>

                    </li>
                ))}



            </ul>
            <button
                className="block mx-auto mt-4 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded"
                onClick={openModal}
            > Add a new Task </button>
            {isModalOpen && (
                <TaskModal
                    isOpen={isModalOpen}
                    closeModal={closeModal}
                    handleCreateTask={handleCreateTask} />
            )}
            {isEditModalOpen && (
                <EditTaskModal
                    isOpen={isEditModalOpen}
                    closeModal={() => setIsEditModalOpen(false)}
                    handleEditTask={handleEditTask}
                    editTask={editTask}
                />
            )}

        </div>
    );
};

export default TaskList;