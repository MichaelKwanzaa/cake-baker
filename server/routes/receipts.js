const router = require("express").Router();
const User = require("../models/User");
const Receipt = require("../models/Receipt")
const Order = require("../models/Order")
const {authenticateUser, checkIfAdmin} = require("../middleware/authentication");
const Flutterwave = require("flutterwave-node-v3")

router.post("/", authenticateUser, async (req, res) => {

        const { status, order_id } = req.body;

    try{
        //finds current order which was used for flutterwave tax_id
        const currentOrder = await Order.findById(order_id);
        //gets status from flutterwave payment callback function
        if(status === "successful"){
            //gets seperate price so user can see indivdual prices
            const cakeColorPrice = 4000;
            const cakeSizePrice = currentOrder.size === "SMALL" ? 3000 : currentOrder.size === "MEDIUM" ? 
            6000 : currentOrder.size === "LARGE" ? 9000 : 0;
            const cakeNamePrice = currentOrder.cake_name.length <= 5 ? 1000 : currentOrder.cake_name.length <= 20 ? 1500 : 
            currentOrder.cake_name.length <= 50 ? 2000 : currentOrder.cake_name.length <= 100 ? 3000 : 0;

            const newReceipt = new Receipt({
                name_cost: cakeNamePrice,
                color_cost: cakeColorPrice,
                size_cost: cakeSizePrice,
                order_id: order_id,
                user_id: req.user.user_id 
            })

            //saves new receipt and updates order to be shown as paid and delivered 
            await newReceipt.save().then(result => {
                currentOrder.receipt = result._id;
                currentOrder.paid = "PAID";
                currentOrder.status = "DELIVERED"
                currentOrder.save();
                res.status(200).json({message: "Successfully Paid!"});
            })

        } else {
            res.status(200).json({message: "Payment failed"})
        }


    }catch(err){
        console.log(err);
        res.status(500).json({error: err})
    }
})

//shows all receipts for admins
router.get("/", authenticateUser, checkIfAdmin, async (req, res) => {
    try{
        const allReceipts = await Receipt.find().populate('user_id');
        res.status(200).json(allReceipts);
    }catch(err){
        res.status(500).json({error: err})
    }
})

//shows users receipts
router.get("/user", authenticateUser, async (req, res) => {
    try{
        const allUserReceipts = await Receipt.find({
            'user_id': {$in : req.user.user_id}
        });

        res.status(200).json(allUserReceipts)

    }catch(err){
        res.status(500).json({error: err})
    }
})

module.exports = router;