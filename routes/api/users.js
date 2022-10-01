const express = require('express');
const router = express.Router();
// express validator https://express-validator.github.io/docs/
const { check, validationResult } = require('express-validator');
// geting the table/collection from the database
const User = require('../../models/User');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

// @route  post api/users
// @desc   register user
// @access Public

router.post('/',[ // check validaition
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({min: 6})
],
async (req,res)=>{
    // content we send in req using a middleware console.log(req.body);
    // check for errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){ // send 400 status and json object with errors
        return res.status(400).json({errors: errors.array()});
    }
    const {name, email, password} = req.body; // destructure

    try {
        let user = await User.findOne({email});
        if(user){ // return error of type as above if user exists
            return res.status(400).json({errors: [{msg: 'User already exists'}]});
        }

        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        });

        user = new User({ // create new user instance
            name,
            email,
            avatar,
            password
        });

        const salt = await bcrypt.genSalt(10); // generate salt
        user.password = await bcrypt.hash(password, salt); // hash password

        await user.save(); // save user to database

        const payload = {
            user: {
                id: user.id
            }
        }
        jwt.sign(payload, config.get('jwtSecret'), {expiresIn: 360000}, (err, token)=>{
            if(err) throw err;
            res.json({token});
        });
    } catch(err){
        console.error(err.message);
        res.status(500).send('Server error');
    }   
})

module.exports = router;
