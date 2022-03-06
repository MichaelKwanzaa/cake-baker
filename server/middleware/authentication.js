const jwt = require("jsonwebtoken");
//jwt token middleware validate current user
authenticateUser = (req, res, next) => {
    let token = req.headers['x-access-token'];
    if(!token){
        //returns auth false if token is not provided
        return res.status(403).send({auth: false, message: 'No token provided'});
    }


    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if(err){
            //returns auth false if token is invalid
            return res.status(500)
            .send({auth: false, message: "Failed to authenticate user"});
        }
        req.user = decoded;
        next();
    })
}

checkNotCustomer = (req, res, next) => {
    if(req.user.role === "CUSTOMER"){
        return res.status(405).json({auth: false, message: "Customers are not allowed to make this change!"})
    }

    next();
}

checkIfAdmin = (req, res, next) => {
    if(req.user.role !== "ADMIN"){
        return res.status(405).json({auth: false, message: "Customers are not allowed to make this change!"})
    } else {
        next();
    }
}

module.exports = {authenticateUser, checkIfAdmin};
