
import React, { useState, useEffect } from 'react';
import API from '../api';

const TaskForm = ({ editingTask, clearEditingTask }) => {
    const [formData, setFormData] = useState({ title: '', description: '' });

    useEffect(() => {
        if (editingTask) {
            setFormData(editingTask);
        }
    }, [editingTask]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingTask) {
            await API.put(`/tasks/${editingTask._id}`, formData);
        } else {
            await API.post('/tasks', formData);
        }
        clearEditingTask();
    };

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
            <form 
                onSubmit={handleSubmit} 
                className="card p-4 shadow-lg border-0" 
                style={{ width: '400px', backgroundColor: '#ffffff', borderRadius: '15px' }}
            >
                <h4 className="text-center text-dark mb-4">
                    {editingTask ? 'Edit Task' : 'Add a New Task'}
                </h4>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label fw-bold">Task Title</label>
                    <input 
                        id="title"
                        name="title" 
                        className="form-control form-control-lg" 
                        value={formData.title} 
                        onChange={handleChange} 
                        required 
                        placeholder="Enter title"
                        style={{ borderRadius: '10px' }}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label fw-bold">Task Description</label>
                    <textarea 
                        id="description"
                        name="description" 
                        className="form-control form-control-lg" 
                        rows="4" 
                        value={formData.description} 
                        onChange={handleChange} 
                        required 
                        placeholder="Enter description"
                        style={{ borderRadius: '10px' }}
                    />
                </div>
                <div className="d-flex justify-content-between">
                    <button 
                        type="submit" 
                        className="btn btn-success btn-lg" 
                        style={{ borderRadius: '8px', width: '48%' }}
                    >
                        {editingTask ? 'Update' : 'Add'}
                    </button>
                    {editingTask && (
                        <button 
                            type="button" 
                            onClick={clearEditingTask} 
                            className="btn btn-outline-danger btn-lg" 
                            style={{ borderRadius: '8px', width: '48%' }}
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default TaskForm;

