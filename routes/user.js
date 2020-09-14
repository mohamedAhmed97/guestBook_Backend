const express = require('express')
//user model
const User = require('../models/user')

const router = new express.Router()

//insert user
router.post('/users', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token });

    } catch (error) {
        res.send(error);
    }
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
        res.status(400).send()
    }
})
module.exports = router