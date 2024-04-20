const  mongoose = require("mongoose")
require('dotenv').config();
const dbConnection = async ()=>{
    try {
        await mongoose.connect(process.env.MongoDbConnectionURL)
        console.log('Database connection established')
    } catch (error) {
        console.log(`Database connection not established ${error?.message}`)
        process.exit(1)	
    }
}

module.exports = {dbConnection}