import express from "express"
import cors from 'cors'
import { PORT } from "./config/env.js"
import cookieParser from "cookie-parser"
import connectToDatabase from "./database/mongodb.js"
import errorMiddleware from "./milddleware/error.middleware.js"
import getMovie from "./routes/movie.router.js"
import userRouter from "./routes/user.routes.js"
import authRouter from './routes/auth.routes.js'
import subscriptionRouter from "./routes/subscription.routes.js"
const app = express()
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
  })
)


// parse JSON & form data
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
// app.use(arcjetMiddleware)

// route
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/subscription', subscriptionRouter)
app.use('/api/v1/movies',getMovie)
app.get('/', (req, res) => {
    res.send('welcome to the subscription tracker')
})


app.use(errorMiddleware)

app.listen(PORT, async () => {
    console.log(`subscription app is running on http://localhost:${PORT}`)
    await connectToDatabase()
})

export default app
