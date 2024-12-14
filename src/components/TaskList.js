



import React, { useEffect, useState } from 'react';
import API from '../api';
import { FaEdit, FaTrash } from 'react-icons/fa';

const TaskList = ({ setEditingTask }) => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        API.get('/tasks').then((response) => setTasks(response.data));
    }, []);

    const deleteTask = async (id) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            await API.delete(`/tasks/${id}`);
            setTasks(tasks.filter((task) => task._id !== id));
        }
    };

    return (
        <div className="container my-5 p-4 shadow rounded bg-light" style={{ maxWidth: '600px' }}>
            <h2 className="text-center mb-4 text-primary">Task List</h2>
            {tasks.length === 0 ? (
                <p className="text-center text-muted">No tasks available. Add some tasks!</p>
            ) : (
                <ul className="list-group">
                    {tasks.map((task) => (
                        <li
                            key={task._id}
                            className="list-group-item d-flex justify-content-between align-items-center"
                            style={{ borderRadius: '10px', marginBottom: '10px' }}
                        >
                            <span className="fw-bold">{task.title}</span>
                            <div>
                                <button
                                    onClick={() => setEditingTask(task)}
                                    className="btn btn-sm btn-warning me-2"
                                    style={{ borderRadius: '5px' }}
                                    title="Edit Task"
                                >
                                    <FaEdit />
                                </button>
                                <button
                                    onClick={() => deleteTask(task._id)}
                                    className="btn btn-sm btn-danger"
                                    style={{ borderRadius: '5px' }}
                                    title="Delete Task"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TaskList;
