const mongoose = require('mongoose')

const FoodSchema = new mongoose.Schema({
    //required: name, typeOf, price
    name: {
        type: String,
        required: [true, 'Please provide food name'],
        maxlength: 50,
        trim: true,
        unique: true
    },
    // image:{
    //     type: String,

    // },
    typeOf: {
        type: String,
        required: [true, 'Please provide type of food'],
        enum: ['món nước', 'cơm', 'đồ uống', 'tráng miệng', 'ăn vặt'],
    },
    price: {
        type: Number,
        required: [true, 'Please provide price of food'],
        match: [(/^\d+(\.\d{2})?$/), 'Please provide valid price'],
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide user']
    }
}, { timestamps: true }) // timestamps -> key createdAt, updatedAt

module.exports = mongoose.model('Food', FoodSchema);