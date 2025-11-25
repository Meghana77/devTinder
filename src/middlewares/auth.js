const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const authUser = async (req,res,next) => {
    const {token} = req.cookies;
    if(!token){
        res.send("Please login again");
    }
    const decodeToken = await jwt.verify(token, process.env.TOKEN_SECRET);
    const user = await User.findOne({_id: decodeToken.id});
    if(!user){
        res.send("User not found");
    }
    req.user = user;
    next();
};

module.exports = { authUser };