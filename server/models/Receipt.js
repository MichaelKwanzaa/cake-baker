const mongoose = require("mongoose");
const { Schema } = mongoose;

const receiptSchema = new Schema({
    color_cost: {
        type: Number,
        default: 0
    },
    size_cost:{
        type: Number,
        default: 0
    },
    name_cost:{
        type: Number,
        default: 0
    },
    delivery_date: {
        type: Date,
        default: () => new Date(Date.now() + 2*24*60*60*1000)
    },
    order_id:{
        type: mongoose.Types.ObjectId,
        ref: 'Orders',
        unique: true
    },
    user_id:{
        type: mongoose.Types.ObjectId, 
        ref: "Users"
    }
},
    {timestamps: true}
)

module.exports = mongoose.model("Receipts", receiptSchema)