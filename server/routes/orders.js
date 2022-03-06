const router = require("express").Router();
const Order = require("../models/Order")
const {authenticateUser, checkIfAdmin} = require("../middleware/authentication");


//admin to get all orders
router.get("/", authenticateUser, checkIfAdmin, async (req, res) => {
    try{
        const allOrders = await Order.find().populate('user_id');
        res.status(200).json(allOrders);
    }catch(err){
        res.status(500).json({error: err})
    }
})

//user get all past orders
router.get("/user", authenticateUser, async (req, res) => {
    try{
        const allUserOrders = await Order.find({
            'user_id': {$in : req.user.user_id}
        });
        
        res.status(200).json(allUserOrders);
    }catch(err){
        res.status(500).json({error: err})
    }
})


//anyone can get their order id as long as their logged in and know the id
router.get("/:id", authenticateUser, async (req, res) => {
    try{
        const currentOrder = await Order.findById(req.params.id);
        res.status(200).json(currentOrder);
    }catch(err){
        res.status(500).json({error: err})
    }
})

//request order
router.post("/order", authenticateUser, async (req, res) => {
        const { cake_name, color, size } = req.body;
    try{

        const newOrder = new Order({
            cake_name: cake_name,
            color: color,
            size: size,
            user_id: req.user.user_id 
        })

        const cakeNamePrice = cake_name.length <= 5 ? 1000 : cake_name.length <= 20 ? 1500 : 
        cake_name.length <= 50 ? 2000 : cake_name.length <= 100 ? 3000 : 0;

        const cakeColorPrice = 4000;

        const cakeSizePrice = size === "SMALL" ? 3000 : size === "MEDIUM" ? 6000 : 
        size === "LARGE" ? 9000 : 0;

        const price = cakeNamePrice + cakeColorPrice + cakeSizePrice;

        //price sent for frontend flutterwave payment validation

        await newOrder.save().then(async result => {
          res.status(200).json({id: result._id, 
            price: price
        })
        })

    }catch(err){
        res.status(200).json({error: err})
        console.log(err);
    }
})

module.exports = router;