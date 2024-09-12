const mongoose = require('mongoose')
const colors = require('colors')

const connectDB = async () => {
    try {
        if (!process.env.MONGO_URL) {
            throw new Error('MONGO_URL environment variable is not set')
        }

        await mongoose.connect(process.env.MONGO_URL)

        mongoose.connection.on('error', (error) => {
            console.log(`MongoDB connection error: ${error}`.bgRed)
        })

        console.log('Connected to MongoDB successfully'.bgCyan.white)
    } catch (error) {
        console.log(`Error connecting to MongoDB: ${error.message}`.bgRed)
    }
}

module.exports = connectDB