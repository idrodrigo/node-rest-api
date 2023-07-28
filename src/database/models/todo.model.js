import { model, Schema, Types } from 'mongoose'

const todoSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    completed: {
      type: Boolean,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    },
    user: {
      type: Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
)

export default model('Todo', todoSchema)
