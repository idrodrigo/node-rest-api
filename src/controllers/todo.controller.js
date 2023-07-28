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
    res.json(newTodo)
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
    if (!todo) return res.status(404).json({ message: 'Todo not found' })
    return res.json(todo)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
