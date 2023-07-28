import { z } from 'zod'

const createTaskSchema = z.object({
  title: z.string({
    required_error: 'Title is required'
  }),
  completed: z.boolean()
})

export default createTaskSchema
