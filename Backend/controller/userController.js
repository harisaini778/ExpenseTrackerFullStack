const express = require('express');
const UserModel = require("../models/userModel");
const router = express.Router();

router.use(express.json());

UserModel.initialize();

router.post("/", async (req, res) => {
    try {
        const {
            username, email, password, premiumUser
        } = req.body;

        const existingUser = await UserModel.getUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({
                error: "User with this email already exists."
            });
        }

        const newUser = await UserModel.createUser({
            username,
            email,
            password,
            premiumUser
        });

        res.status(201).json(newUser);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: "Internal Server Error"
        });
    }
});

module.exports = router;
