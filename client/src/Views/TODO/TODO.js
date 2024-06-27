import { useEffect, useState } from 'react';
import Styles from './TODO.module.css';
import { dummy } from './dummy';
import axios from 'axios';

export function TODO(props) {
    const [newTodo, setNewTodo] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [todoData, setTodoData] = useState(dummy);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(null);
    const [updatedTitle, setUpdatedTitle] = useState('');
    const [updatedDescription, setUpdatedDescription] = useState('');

    useEffect(() => {
        const fetchTodo = async () => {
            const apiData = await getTodo();
            setTodoData(apiData);
            setLoading(false);
        };
        fetchTodo();
    }, []);

    const getTodo = async () => {
        const options = {
            method: 'GET',
            url: 'http://localhost:8000/api/todo',
            headers: {
                accept: 'application/json',
            },
        };
        try {
            const response = await axios.request(options);
            return response.data;
        } catch (err) {
            console.error(err);
            return []; // return an empty array in case of error
        }
    };

    const addTodo = async () => {
        const options = {
            method: 'POST',
            url: 'http://localhost:8000/api/todo',
            headers: {
                accept: 'application/json',
            },
            data: {
                title: newTodo,
                description: newDescription,
            },
        };
        try {
            const response = await axios.request(options);
            setTodoData((prevData) => [...prevData, response.data.newTodo]);
            setNewTodo('');
            setNewDescription('');
        } catch (err) {
            console.error(err);
        }
    };

    const deleteTodo = async (id) => {
        const options = {
            method: 'DELETE',
            url: `http://localhost:8000/api/todo/${id}`,
            headers: {
                accept: 'application/json',
            },
        };
        try {
            const response = await axios.request(options);
            setTodoData((prevData) => prevData.filter((todo) => todo._id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    const updateTodo = async (id) => {
        const todoToUpdate = todoData.find((todo) => todo._id === id);
        const options = {
            method: 'PATCH',
            url: `http://localhost:8000/api/todo/${id}`,
            headers: {
                accept: 'application/json',
            },
            data: {
                title: updatedTitle || todoToUpdate.title,
                description: updatedDescription || todoToUpdate.description,
                done: todoToUpdate.done,
            },
        };
        try {
            const response = await axios.request(options);
            setTodoData((prevData) => prevData.map((todo) => (todo._id === id ? response.data : todo)));
            setEditing(null);
            setUpdatedTitle('');
            setUpdatedDescription('');
        } catch (err) {
            console.error(err);
        }
    };

    const startEditing = (id, currentTitle, currentDescription) => {
        setEditing(id);
        setUpdatedTitle(currentTitle);
        setUpdatedDescription(currentDescription);
    };

    return (
        <div className={Styles.ancestorContainer}>
            <div className={Styles.headerContainer}>
                <h1>Tasks</h1>
                <span>
                    <input
                        className={Styles.todoInput}
                        type='text'
                        name='New Todo'
                        placeholder='Title'
                        value={newTodo}
                        onChange={(event) => setNewTodo(event.target.value)}
                    />
                    <input
                        className={Styles.todoInput}
                        type='text'
                        name='New Description'
                        placeholder='Description'
                        value={newDescription}
                        onChange={(event) => setNewDescription(event.target.value)}
                    />
                    <button
                        id='addButton'
                        name='add'
                        className={Styles.addButton}
                        onClick={addTodo}
                    >
                        + New Todo
                    </button>
                </span>
            </div>
            <div id='todoContainer' className={Styles.todoContainer}>
                {loading ? (
                    <p style={{ color: 'white' }}>Loading...</p>
                ) : todoData.length > 0 ? (
                    todoData.map((entry) => (
                        <div key={entry._id} className={Styles.todo}>
                            <span className={Styles.infoContainer}>
                                <input
                                    type='checkbox'
                                    checked={entry.done}
                                    onChange={() => updateTodo(entry._id)}
                                />
                                {editing === entry._id ? (
                                    <input
                                        type='text'
                                        value={updatedTitle}
                                        onChange={(event) => setUpdatedTitle(event.target.value)}
                                    />
                                ) : (
                                    <span>{entry.title}</span>
                                )}
                            </span>
                            {editing === entry._id ? (
                                <input
                                    type='text'
                                    value={updatedDescription}
                                    onChange={(event) => setUpdatedDescription(event.target.value)}
                                />
                            ) : (
                                <p>{entry.description}</p>
                            )}
                            <span style={{ cursor: 'pointer' }} onClick={() => deleteTodo(entry._id)}>
                                Delete
                            </span>
                            {editing === entry._id ? (
                                <button onClick={() => updateTodo(entry._id)}>Save</button>
                            ) : (
                                <button onClick={() => startEditing(entry._id, entry.title, entry.description)}>Edit</button>
                            )}
                        </div>
                    ))
                ) : (
                    <p className={Styles.noTodoMessage}>No tasks available. Please add a new task.</p>
                )}
            </div>
        </div>
    );
}
