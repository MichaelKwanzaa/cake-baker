const mongoose = require("mongoose");

//connection to mongodb
const connectDB = async () => {
    try{
        mongoose.connect(process.env.MONGO_DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .catch((error) => console.log(error));
        console.log("MONGODB Connected!");
    }catch(error) {
        console.log(error);
        return error;
    }
}

module.exports = connectDB;
