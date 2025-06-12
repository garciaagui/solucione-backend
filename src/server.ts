import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import errorMiddleware from './middlewares/error-middleware'
import routes from './routes'

const app = express()

// Middlewares
app.use(cors())
app.use(helmet())
app.use(morgan('dev'))
app.use(express.json())

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'API is running' })
})
app.use('/api', routes)

// Error handling middleware should be last
app.use(errorMiddleware)

const PORT = process.env.API_PORT || 3000

app.listen(PORT, () => {
  console.log(`🟢 Server is running on port ${PORT}`)
})
