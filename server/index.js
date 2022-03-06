require("dotenv").config();
const express = require('express');
const connectDB = require("./config/db");
const cors = require("cors")
const helmet = require("helmet")
const morgan = require("morgan")

//router links for api endpoints
const authRoute = require("./routes/auth")
const userRoute = require("./routes/users")
const orderRoute = require("./routes/orders");
const receiptRoute = require("./routes/receipts");

const app = express();
connectDB();

//middleware
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("combined"));
app.use(function(req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});


//__END OF MIDDLEWARE__//


//app routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/orders", orderRoute);
app.use("/api/receipts", receiptRoute);
//end of app routes


//connect to server
var port = process.env.PORT || 8080;
app.set("port", port);
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

