const router = require("express").Router(),
    User = require("../models/User"),
    findUser = require("../middleware/findUser"),
    validateUser = require("../middleware/validateUser");

// @desc GET a specific users information
// @path (server origin)/user/:username
// @access (will be admin)
router.get(
    "/user/:username",
    findUser,
    (req, res) => {

        try {

            return res.status(200).json({
                status: 200,
                msg: "User found",
                user: req.user
            });

        } catch (err) {

            return res.status(500).json({
                status: 500,
                error: err
            });

        };

    });

// @desc DELETE a specific user
// @path (server origin)/user/:username
// @access (will be admin or the specific user)
router.delete(
    "/user/:username",
    findUser,
    async(req, res) => {

        try {

            const userID = req.user._id;

            await User.deleteOne({ "_id": userID });

            return res.status(200).json({
                status: 200,
                msg: "Succesful User Deletion",
                deleted_user: req.user
            });

        } catch (err) {

            return res.status(500).json({
                status: 500,
                error: err
            });

        };

    });

// @desc POST request to create a new User
// @path (server origin)/user
// @access public
router.post(
    "/user",
    validateUser,
    async(req, res) => {

        try {

            const newUser = await User.create(req.body);

            return res.status(201).json({
                status: 201,
                msg: "Created New User",
                user: newUser
            });

        } catch (err) {

            return res.status(500).json({
                status: 500,
                error: err
            });

        };

    });

// @desc PATCH/update a specific users information
// @path (server origin)/users/user/:username
// @access specific user
router.patch(
    "/user/:id",
    validateUser,
    async(req, res) => {

        try {

            const oldUser = await User.find({ "_id": req.params.id }),
                newUser = await User.findOneAndUpdate({ "_id": req.params.id }, req.body, { new: true });

            return res.status(200).json({
                status: 200,
                msg: "User Updated",
                updated_user: newUser,
                old_user: oldUser
            });

        } catch (err) {

            return res.status(500).json({
                status: 500,
                error: err
            });

        };

    });

// @desc GET all users usernames and emails
// @path (server origin)/user/all
// @access (will be admin)
router.get(
    "/all",
    async(req, res) => {

        try {

            const allUsers = await User.find({});

            return res.status(200).json({
                status: 200,
                msg: "All Users",
                users: allUsers
            });

        } catch (err) {

            return res.status(500).json({
                status: 500,
                error: err
            });

        };

    });

module.exports = router;