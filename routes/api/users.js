const express = require('express');
const router = express.Router();
// express validator https://express-validator.github.io/docs/
const { check, validationResult } = require('express-validator');

// @route  post api/users
// @desc   register user
// @access Public

router.post('/',[
    // check name is not empty
    check('name', 'Name is required').not().isEmpty(),
    // check email is valid
    check('email', 'Please include a valid email').isEmail(),
    // check password is at least 6 characters
    check('password', 'Please enter a password with 6 or more characters').isLength({min: 6})
],(req,res)=>{
    // content we send in req using a middleware
    // console.log(req.body);
    // check for errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        // send 400 status and json object with errors
        return res.status(400).json({errors: errors.array()});
    }
    res.send('user router');
})

module.exports = router;
