const router = require("express").Router();
const User = require("../models/User");
const {authenticateUser} = require("../middleware/authentication");

//gets current authenticated user 
router.get("/", authenticateUser, async (req, res) => {
    try{
        const currentUser = await User.findById(req.user.user_id);
        const { password, updatedAt, createdAt, ...others } = currentUser._doc
        res.status(200).json(others)
    }catch(err){
        console.log(err)
        res.status(500).json({error: err})
    }
})

module.exports = router;