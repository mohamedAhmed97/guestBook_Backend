const express = require('express')
//user model
const User = require('../models/user')
//Auth 
const Auth = require('../middleware/auth')
const Message = require('../models/message')
const router = new express.Router()


//get all users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch (error) {
        res.send(error)
    }
})
//insert user
router.post('/users', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token });

    } catch (error) {
        res.status(202).send(error);
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
router.post('/users/logout', Auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/users/logoutAll', Auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/users/incomingMessages', Auth, async (req, res) => {
    try {
        const messages = await req.user.populate('messages').execPopulate();
        res.send(messages.messages);
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/users/sentMessages', Auth, async (req, res) => {
    try {
        const messages=await req.user.populate('sentMessages').execPopulate()
        res.send(messages.sentMessages);
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router