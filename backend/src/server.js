const express = require('express')
const env = require('dotenv')
const cors = require('cors')
const connectDB = require('./dbConfig/dbConfig')
const studentRoutes = require('./routes/studentRoutes')
const userRoutes = require('./routes/userRoutes')
const { notFound, errorHandler } = require('./middleWare/errorMiddle')

env.config()

connectDB()

const app = express()

app.use(express.json())

app.use(cors())

app.use('/api/student', studentRoutes)
app.use('/api/user', userRoutes)

app.use(notFound)
app.use(errorHandler)

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server started on port ${port}`))
