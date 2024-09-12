const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const dotenv = require('dotenv')
const colors = require('colors')
const path = require('path')
const connectDB = require('./config/connectDB')

//config env file
dotenv.config()

//database call
try {
    connectDB();
} catch (error) {
    console.log(`Error connecting to database: ${error.message}`.bgRed)
    process.exit(1)
}

//rest obj
const app = express()

//middleware
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

//routes
//user route
app.use('/api/v1/users', require('./routes/userRoute'))
//transaction route
app.use('/api/v1/transactions',require('./routes/transactionRoute'))
//error handling middleware
app.use((req, res, next) => {
    const error = new Error('Not found')
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    console.log(`Server error: ${error.message}`.bgRed)
    res.status(error.status || 500).send('Server error')
})

// static files 
app.use(express.static(path.join(__dirname,'./client/build')))

app.get('*',function (req,res) {
    res.sendFile(path.join(__dirname,'./client/build/index.html'));
})



//port 
const PORT = process.env.PORT || 8080

//listen 
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});