const express = require('express');
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); // for hashing the password
const config = require('config');


// @route  GET api/auth
// @desc   show user data
// @access private

router.get('/',auth,async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


// @route   POST api/auth
// @desc    login user
// @access  Public

router.post('/',[ // check validaition
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please Enter a password').exists()
],
async (req,res)=>{

    // check for errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){ // send 400 status and json object with errors
        return res.status(400).json({errors: errors.array()});
    }
    
    const {email, password} = req.body; // destructure

    try {
        let user = await User.findOne({email});
        if(!user){ // return error of type as above if user exists
            return res.status(400).json({errors: [{msg: 'Invalid credentials'}]});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({errors: [{msg: 'Invalid credentials'}]});
        }

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
}
);


module.exports = router;