import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({
            status: "success",
            message: "users fetched successfully",
            data: users,
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            status: "failed",
            message: "server error",
        });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const { userId, fullname, email, phone, password } = req.body;
        if (userId && fullname && email && phone && password) {
            if (password.length < 30) {
                await User.findOneAndUpdate(
                    { _id: userId },
                    {
                        fullname,
                        email,
                        phone,
                        password: bcrypt.hashSync(password, 10),
                    },
                    {
                        returnOriginal: false,
                    }
                )
                    .then(() => {
                        res.status(200).json({
                            status: "success",
                            message: "Profile updated successfully",
                        });
                    })
                    .catch((err) => {
                        res.status(500).json({
                            status: "failed",
                            message: err.message,
                        });
                    });
            } else {
                await User.findOneAndUpdate(
                    {
                        _id: userId,
                    },
                    {
                        fullname,
                        email,
                        phone,
                    },
                    {
                        returnOriginal: false,
                    }
                )
                    .then(() => {
                        res.status(200).json({
                            status: "success",
                            message: "Profile updated successfully",
                        });
                    })
                    .catch((err) => {
                        res.status(500).json({
                            status: "failed",
                            message: err.message,
                        });
                    });
            }
        } else {
            res.status(400).json({
                status: "failed",
                message: "Please fill all fields",
            });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            status: "failed",
            message: error.message,
        });
    }
};

export const getOneUser = async (req, res) => {
    try {
        const { userId } = req.body;
        await User.findOne({ _id: userId })
            .then((result) => {
                res.status(200).json({
                    status: "success",
                    message: "User found",
                    data: result,
                });
            })
            .catch((error) => {
                res.status(500).json({
                    status: "failed",
                    message: error.message,
                });
            });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            status: "failed",
            message: error.message,
        });
    }
};
