const router = require('express').Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const {registerValidation, loginValidation}= require('../validation.js');
const { findUserByEmailId, findUserByToken, addUser, updateUserToken } = require('./db');

router.post('/register', async(req, res)=> {

    const {error} = registerValidation(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);
    }
    const emailExists = findUserByEmailId({email: req.body.email});
    console.log(emailExists);
    if(emailExists) return res.status(400).send("Email already exists!");

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    let user = {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        roles: req.body.roles
    }  
    try {
        const savedUser = addUser(user);
        res.send({user: savedUser.id});
    } catch (err) {
        res.status(400).send(err);
    }
})

router.post('/login', async(req, res)=> {

    const {error} = loginValidation(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);
    }
    const user = await findUserByEmailId({email: req.body.email});
    if(!user) return res.status(400).send("Email or password is wrong!");

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send("Invalid credentials!");

    const token = jwt.sign({id: user.id, exp: new Date().getMilliseconds() + 1 * 60* 60*1000, roles: [user.roles]}, process.env.TOKEN_SECRET);
    res.header('auth-token', token);
    try {
        const updatedUser = await updateUserToken({id:user.id, token});
        console.log(updatedUser);
    } catch (err) {
        res.status(400).send(err);
    }
    res.send(token);
})

router.get('/logout', async(req, res) => {
    const token = req.header('auth-token');
    try {
        const user = await findUserByToken({token});
        if(!user || !user.token) return res.status(400).send("Not Logged In!");
        const updatedUser = await updateUserToken({id:user.id, token: ''});
        res.send(updatedUser.id);
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
})

module.exports = router;