import React, { useState } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    const [editingTask, setEditingTask] = useState(null);

    return (
        <div className="container mt-5">
            <h1 className='text-center p-3'>Task Management</h1>
            <TaskForm editingTask={editingTask} clearEditingTask={() => setEditingTask(null)} />
            <TaskList setEditingTask={setEditingTask} />
        </div>
    );
};

export default App;
