const User = require("../models/User");

module.exports = async(req, res, next) => {

    const username = req.params.username,
        found = await User.findOne({ "username": username });

    if (found === null) {

        return res.status(404).json({
            status: 404,
            msg: "User '" + username + "' is not found"
        });

    } else {

        //* used object destructuring to get specific data from req
        // const { username, email, posts, _id } = found;
        // req.user = { username, email, posts, _id };

        req.user = found;

        next();

    };

};