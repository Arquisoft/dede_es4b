require('dotenv').config()

const mongoose = require('mongoose')

const connectionString = process.env.MONGO_DB_URI;

const dbConnection = () => {
    mongoose.connect(connectionString)
    .then(() => {
        console.log('DB Connected')
}).catch((error : any) =>{
        console.error(error)
    })
}


module.exports = {dbConnection}