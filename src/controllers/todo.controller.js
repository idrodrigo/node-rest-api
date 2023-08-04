import Todo from '../database/models/todo.model.js'

export const getUserTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user.id }).populate('user')
    res.status(200).json(todos)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
export const createTodo = async (req, res) => {
  try {
    const { title, completed, date } = req.body
    const newTodo = new Todo({
      title,
      completed,
      date,
      user: req.user.id
    })
    await newTodo.save()
    res.status(201).json(newTodo)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
export const deleteTodo = async (req, res) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id)
    if (!deletedTodo) { return res.status(404).json({ message: 'Todo not found' }) }
    return res.sendStatus(204)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
export const updateTodo = async (req, res) => {
  try {
    const { title, completed } = req.body
    const todoUpdated = await Todo.findOneAndUpdate(
      { _id: req.params.id },
      { title, completed },
      { new: true }
    )
    return res.json(todoUpdated)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
export const getTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id)
    if (todo) return res.json(todo)
    res.status(404).json({ message: 'Todo not found' })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
export const getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find().populate('user')
    const todoTitles = todos
      .map(todo => ({
        title: todo.title,
        createdAt: todo.createdAt,
        id: todo._id,
        user: todo.user.email.split('@')[0] + '@****'
      }))
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice(0, 10)
    res.status(200).json(todoTitles)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
export const deleteUserTodos = async (req, res) => {
  try {
    const deletedTodos = await Todo.deleteMany({ user: req.user.id })
    if (deletedTodos) return res.sendStatus(204)
    res.status(404).json({ message: 'Todos not found' })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
