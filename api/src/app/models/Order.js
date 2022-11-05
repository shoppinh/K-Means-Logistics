const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OrderSchema = new Schema({
    date: {
        type: Date
    },
    senderName: {
        type: String
    },
    senderFullAddress: {
        type: String
    },
    recipientName: {
        type: String
    },
    recipientFullAddress: {
        type: String
    },
    latitudeFrom: {
        type: Number
    },
    longitudeFrom: {
        type: Number
    },
    latitudeTo: {
        type: Number
    },
    longitudeTo: {
        type: Number
    },
    
})

const Order = mongoose.model('Order', OrderSchema)
module.exports = Order
