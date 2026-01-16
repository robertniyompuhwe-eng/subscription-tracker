import express from "express"
import { PORT } from "./config/env.js"
import cookieParser from "cookie-parser"
import connectToDatabase from "./database/mongodb.js"
import errorMiddleware from "./milddleware/error.middleware.js"

import userRouter from "./routes/user.routes.js"
import authRouter from './routes/auth.routes.js'
import subscriptionRouter from "./routes/subscription.routes.js"

const app = express()

// parse JSON & form data
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

// routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/subscription', subscriptionRouter)
app.get('/', (req, res) => {
    res.send('welcome to the subscription tracker')
})

// error middleware comes last
app.use(errorMiddleware)

app.listen(PORT, async () => {
    console.log(`subscription app is running on http://localhost:${PORT}`)
    await connectToDatabase()
})

export default app
