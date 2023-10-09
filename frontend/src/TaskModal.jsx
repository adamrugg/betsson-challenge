import React, { useState } from "react";
import { AiOutlineClose } from 'react-icons/ai';


const TaskModal = ({ isOpen, closeModal, handleCreateTask }) => {
    const [newTaskName, setNewTaskName] = useState('');
    const [newPriority, setNewPriority] = useState('');
    const [newLabel, setNewLabel] = useState('');

    const [taskNameError, setTaskNameError] = useState(false);
    const [labelError, setLabelError] = useState(false);
    const [priorityError, setPriorityError] = useState(false);



    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newTaskName || !newPriority || !newLabel) {

            if (!newTaskName) {
                setTaskNameError(true);
            }
            if (!newPriority) {
                setPriorityError(true);
            }
            if (!newLabel) {
                setLabelError(true);
            }
            return;
        }

        handleCreateTask({ taskName: newTaskName, priority: newPriority, label: newLabel });

        setNewTaskName('');
        setNewPriority('high');
        setNewLabel('');

        closeModal();
    };

    return (
        <div>
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 ">
                    <div className="modal-card bg-white rounded-lg p-8 shadow-lg max-w-lg w-full">
                        <header className="modal-card-head flex justify-between items-center">
                            <span></span>
                            <button className="delete" onClick={closeModal}>
                                <AiOutlineClose className="text-gray-400 text-xl"/>
                            </button>
                        </header>

                        <section className="modal-card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-6 text-center">
                                    <label className="block text-gray-700 text-md text-center font-bold mb-2">Task Name</label>
                                    <input
                                        className={`input ${taskNameError ? 'border-red-500 text-center' : ''} border-b border-orange-500`}
                                        type="text"
                                        value={newTaskName}
                                        onChange={(e) => setNewTaskName(e.target.value)}
                                    />
                                    {taskNameError && <p className="text-red-500 text-center">Task name cannot be empty</p>}
                                </div>
                                <div className="mb-6 text-center">
                                    <label className="block text-gray-700 text-md text-center font-bold mb-2">Priority</label>
                                    <div className="control">
                                        <div className="select text-center">
                                            <select
                                                className={`input ${priorityError ? 'border-red-500 text-center' : ''} border-b border-orange-500`}
                                                value={newPriority}
                                                onChange={(e) => setNewPriority(e.target.value)}
                                            >
                                                <option value="" disabled defaultValue>
                                                </option>
                                                <option value="low">Low</option>
                                                <option value="medium">Medium</option>
                                                <option value="high">High</option>
                                            </select>
                                        </div>
                                        {priorityError && <p className="text-red-500 text-center">Task priority not selected</p>}
                                    </div>
                                </div>
                                <div className="mb-6 text-center">
                                    <label className="block text-gray-700 text-md text-center font-bold mb-2">Label</label>
                                    <input
                                        className={`input ${labelError ? 'border-red-500 text-center' : ''} border-b border-orange-500`}
                                        type="text"
                                        value={newLabel}
                                        onChange={(e) => setNewLabel(e.target.value)}
                                    />
                                    {labelError && <p className="text-red-500 text-center">Label cannot be empty</p>}
                                </div>
                                <div className="field is-grouped">
                                    <div className="control text-center">
                                        <button type="submit" className="text-white bg-green-500 p-2 px-10 rounded-[2px] button is-link">
                                            Create Task
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </section>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TaskModal;