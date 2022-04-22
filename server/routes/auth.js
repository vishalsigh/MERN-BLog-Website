const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../db/model');

router.post('/signup', async(req, res) => {
    const{email, name, password} = req.body;
    if(!name || !email || !password) {
        return res.status(422).json({error: 'Empty Filled'})
    }
    try {
        let userExist = await User.findOne({email: email});
        if(userExist){
            return res.status(422).json({error: 'Email exists'})
        }

        const hashedPassword = await bcrypt.hash(password,12);

        const user = new User ({name, email, password:hashedPassword});
        await user.save();

        const token = jwt.sign({user: user._id}, process.env.JWT_SECRET,
        {expiresIn:360000}
        );
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
        })
        .send();


    } catch (error) {
        console.log(error);
        res.status(500).send();
    }

})

router.post('/login', async (req, res) => {
    const{email, password} = req.body;
    if(!email || !password){
        return res.status(400).json({error:'Fill all the space'})
    }
    const userLogin = await User.findOne({email:email});
    if(!userLogin){
        return res.status(422).json({error:'Invalid Credentials'})
    }

    let isMatch = await bcrypt.compare(password, userLogin.password);
    if(!isMatch) {
        return res.status(422).json({error:'Invalid Credentials'})
    }

    const token = jwt.sign({user: userLogin._id}, process.env.JWT_SECRET,
    {expiresIn:360000});

    res.cookie('token', token, {
        httpOnly:true,
        secure: true,
        sameSite: 'none',
    })
    .send();
})

router.get('/logout', (req, res) => {
    res.cookie('token', '',{
        httpOnly: true,
        expires: new Date(0),
        secure: true,
        sameSite: 'none',
    })
    .send();
})

router.get('/loggedIn', (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) return res.json(false);

        jwt.verify(token, process.env.JWT_SECRET);

        res.send(true);
    } catch (error) {
        res.json(false);
    }
})


module.exports = router;
