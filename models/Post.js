const mongoose = require("mongoose"),
    Post = mongoose.Schema({
        uploader: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true
        }
        // title
        // body
        // media?
        // likes?
        // comments?
        // shares?
    });

module.exports = mongoose.model('post', Post);