const mongoose = require('mongoose')

const Message = mongoose.model('Message', {
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
    from:{
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'User'
    },
    to:{
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'User'
    },

});

module.exports = Message