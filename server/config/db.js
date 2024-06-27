const mongoose = require('mongoose');
require('dotenv').config()

const connectString = process.env.MONGO_URI;

const connectMongoDB = async () => {
    try {
        await mongoose.connect(connectString);
        console.log('Successfully connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to DB: ', error.message)
        process.exit(1)
    }
}
module.exports = connectMongoDB;
