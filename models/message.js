const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    message: {
        type: String,
        required: true,
        trim: true
    },
    reply: {
        type: String,
        trim: true
    },
    from: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },

},
    {
        timestamps: true
    }

);

const Message = mongoose.model('Message', messageSchema)

module.exports = Message