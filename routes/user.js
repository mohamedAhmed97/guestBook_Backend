const express = require('express')
const User = require('../models/user')
const router = new express.Router()

//insert user
router.post('/users', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        res.status(201).send(user);

    } catch (error) {
        res.send(error);
    }
})

module.exports = router