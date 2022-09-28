const express = require('express');
const router = express.Router();

// @route  GET api/users
// @desc   Test profile
// @acess  public

router.get('/',(req,res)=>{
    res.send('profile router');
})
module.exports = router;