const express = require('express');
//user model
const User = require('../models/user')
//Message model
const Message = require('../models/message');
//Auth
const Auth = require('../middleware/auth')
const router = new express.Router()

router.post('/messages/:id', Auth, async (req, res) => {
    const message = new Message({
        ...req.body,
        to: req.params.id,
        from: req.params.id
    });
    try {
        await message.save();
        res.send(message)
    } catch (error) {
        res.send(error)
    }
})
//edit message
router.patch('/messages/:id', Auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['title', 'message']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const message = await Message.findOne({ _id: req.params.id, from: req.user._id })

        if (!message) {
            return res.status(404).send()
        }

        updates.forEach((update) => message[update] = req.body[update])
        await message.save()
        res.send(message)
    } catch (e) {
        res.status(400).send(e)
    }
})

//delete message
router.delete('/messages/:id', Auth, async (req, res) => {
    try {
        await Message.findByIdAndDelete({ _id: req.params.id })
        res.send("Removed")
    } catch (error) {
        res.send(error)
    }
})

//show message
router.get('/messages/:id', Auth, async (req, res) => {
    try {
        const message = await Message.findById({ _id: req.params.id });
        if (!message) res.status(404).send("No Message");
        await message.populate('to').execPopulate();
        res.send(message)
    } catch (error) {
        res.send(error);
    }
})
module.exports = router;