const { check, validationResult } = require("express-validator");

//validator for sign up and sign in. done in the backend instead of the frontend to save time
const userSignUpValidation = () => {
    return [
        check("name", "Name is required").not().isEmpty(),
        check("email", "Invalid email").not().isEmpty().isEmail(),
        check("password", "Password must be greater than 6 character & less than 20!")
        .not().isEmpty().isLength({min: 4, max: 20}),
    ];
};

const validateSignUp = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        var messages = [];
        errors.array().forEach((error) => {
            messages.push(error.msg);
        });
        return res.status(409).json({error: messages});
    }
    next();
}

const userSignInValidation = () => {
    return [
        check("email", "Invalid email").not().isEmpty().isEmail(),
        check("password", "Invalid password").not().isEmpty().isLength({min: 4, max: 20})
    ];
};

const validateSignIn = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        var messages = [];
        errors.array().forEach((error) => {
            messages.push(error.msg);
        });
        return res.status(409).json({error: messages});
    }
    next();
}

module.exports = {
    userSignInValidation,
    userSignUpValidation,
    validateSignIn,
    validateSignUp
}