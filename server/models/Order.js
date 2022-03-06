const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
    cake_name: {
        type: String,
        default: "",
        min: 2, 
        max: 100
    },
    color: {
        type: String,
        default: "white",
    },
    size: {
        type: String,
        enum: ["SMALL", "MEDIUM", "LARGE"],
        default: "SMALL"
    },
    receipt: {
        type: mongoose.Types.ObjectId,
        ref: 'Receipts'
    },
    status: {
        type: String,
        enum: ["PENDING", "DELIVERED", "FAILED"],
        default: "PENDING"
    },
    paid:{
        type: String,
        enum: ["PENDING", "FAILED", "PAID"],
        default: "PENDING"
    },
    user_id: {
        type: mongoose.Types.ObjectId,
        require: true,
        ref: 'Users'
    }
},
    {timestamps: true}
)

module.exports = mongoose.model("Orders", orderSchema)