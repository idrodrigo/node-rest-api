import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import todoRoutes from './routes/todo.routes.js'
import authRoutes from './routes/auth.routes.js'

if (process.env.NODE_ENV !== 'production') {
  const dotenv = await import('dotenv')
  dotenv.config()
}

const server = express()
server.use(cors({
  origin: process.env.DEPLOY_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}))
server.use(express.json())
server.use(morgan('dev'))

// routes --------------------------------------------------->
server.use('/api', todoRoutes)
server.use('/api/auth', authRoutes)
// ---------------------------------------------------------->
if (process.env.NODE_ENV === 'production') {
  const path = await import('path')
  server.use(express.static('client/dist'))

  server.get('*', (_, res) => {
    console.log(path.resolve('client', 'dist', 'index.html'))
    res.sendFile(path.resolve('client', 'dist', 'index.html'))
  })
} else {
  server.get('/', (_, res) => {
    res.send('server is up and running')
  })
}

export default server
