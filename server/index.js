require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookiesParser = require('cookie-parser')
const mongoose = require('mongoose')
const router = require('./routers/index.js')
const errorMiddleware = require('./middleware/errorMiddleware.js')

const PORT = process.eventNames.PORT || 5000
const app = express()

app.use(express.json())
app.use(cookiesParser())
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL 
}))
app.use('/api', router)
app.use(errorMiddleware)

 
const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        app.listen(PORT, () => console.log(`server started on PORT = ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start ()