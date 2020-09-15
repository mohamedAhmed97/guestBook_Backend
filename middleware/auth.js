var jwt = require('jsonwebtoken');
const User = require('../models/user');

const Auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decode = jwt.verify(token, "userToken");

        const user = await User.findOne({ _id: decode._id, 'tokens.token': token });
        if (!user) {
            throw new Error();
        }
        req.token = token
        req.user = user;
        next();
    }
    catch (e) {
        res.status(401).send({ error: 'Please authenticate.' })
    }
};


module.exports = Auth