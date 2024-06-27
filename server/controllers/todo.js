const todo = require('../models/todo')

exports.getAllTodos = async (req, res) => {
    try {
        const allTodos = await todo.find()
        return res.status(200).send(allTodos)
    } catch (error) {
        console.log('Error:', error.message)
        return res.status(400).send({ message: 'Failed to fetch all todos' })
    }
}

exports.createTodo = async (req, res) => {
    try {
        const newTodo = await todo.create(req.body);
        return res.status(201).send({ newTodo })
    } catch (error) {
        console.log('Error:', error.message)
        return res.status(400).send({ message: 'Failed to create new todo' })
    }
}

exports.updateTodo = async (req, res) => {
    try {
        const updatedTodo = await todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.status(200).send(updatedTodo)
    } catch (error) {
        console.log('Error:', error.message)
        return res.status(400).send({ message: 'Failed to update todo' })
    }
}

exports.deleteTodo = async (req, res) => {
    try {
        const deletedTodo = await todo.findByIdAndDelete(req.params.id);
        return res.status(200).send(deletedTodo)
    } catch (error) {
        console.log('Error:', error.message)
        return res.status(400).send({ message: 'Failed to delete todo' })
    }
}
