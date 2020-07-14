const User = require("../models/User"),
    validator = require("validator");

module.exports = async(req, res, next) => {

    const username = req.body.username,
        email = req.body.email,
        password = req.body.password,
        usernameRegExp = /[^a-zA-Z0-9\s]/g;

    let failed = [];

    if (username != null) {

        const userExists = await User.findOne({ "username": username }) != null;

        if (usernameRegExp.test(username)) {

            failed.push({
                field: "Username",
                msg: "Username '" + username + "' included incorrect characters, usernames can have letters, numbers and spaces only"
            });

        } else if (userExists) {

            failed.push({
                field: "Username",
                msg: "Username '" + username + "' already taken"
            })

        }

    };

    if (email != null) {

        const emailExists = await User.findOne({ "email": email }) != null;

        if (!validator.isEmail(email)) {

            failed.push({
                field: "Email",
                msg: "'" + email + "' is not a valid email"
            })

        } else if (emailExists) {

            failed.push({
                field: "Email",
                msg: "Email '" + email + "' already taken"
            });

        };

    };

    if (password != null && !validator.isLength(password, { min: 8, max: 25 })) {

        failed.push({
            field: "Password",
            msg: "Password has an invalid length: must be between 8 and 25 characters"
        });

    };

    if (failed.length != 0) {

        return res.status(409).json({
            validation_error: failed
        });

    } else { next(); };

};