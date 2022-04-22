const jwt = require('jsonwebtoken');
const User = require('../db/model');

function checkAuth (req,res, next) {
    try {
        const token = req.cookies.token;
        if(!token) return res.status(401).json({error: 'Unauthorized'});

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified.user;
        // console.log(req.user);
        
        

        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({error: 'Unauathorized'});
    }
}

module.exports =checkAuth;