const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DriverSchema = new Schema({
    name: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    gender: {
        type: String
    },
    age: {
        type: Number
    },
    
})

const Driver = mongoose.model('Driver', DriverSchema)
module.exports = Driver