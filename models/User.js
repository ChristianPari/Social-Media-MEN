const mongoose = require("mongoose"),
    User = mongoose.Schema({

        username: {
            required: true,
            unique: true,
            type: String,
            minLength: 3,
            maxLength: 25
        },

        email: {
            required: true,
            unique: true,
            type: String
        },

        password: {
            required: true,
            type: String,
            minLength: 8,
            maxLength: 30
        },

        posts: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "posts",
            default: []
        }
    });

module.exports = mongoose.model('user', User);