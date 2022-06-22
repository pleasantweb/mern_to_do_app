require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser');
const cors = require('cors')
const connectDB = require('./config/dbConn')
const {corsOptions} = require('./config/corsOptions')
const authRoutes = require('./routes/auth-routes')
const taskRoutes = require('./routes/task-routes')

const app = express()
const PORT = process.env.PORT || 3500
connectDB()

//middlewares 
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cookieParser())
app.use(cors(corsOptions))


app.use('/auth',authRoutes)
app.use('/task',taskRoutes)

app.get('/',(req,res)=>{
    res.send('Hello world')
})

mongoose.connection.once('open',()=>{
    console.log('Connected to mongodb');
    app.listen(PORT,()=>{
        console.log(`App is listening at port ${PORT}`);
    })
})
