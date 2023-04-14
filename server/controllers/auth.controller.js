import bcrypt from "bcryptjs";
import User from "../models/User.js";

export const Signin = async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log(password);
        if (username) {
            if (password) {
                const user = await User.findOne({
                    username: username,
                });
                if (user) {
                    if (await bcrypt.compare(password, user.password)) {
                        res.status(200).json({
                            status: "success",
                            message: "login successful",
                            data: {
                                _id: user._id,
                                fullname: user.fullname,
                                email: user.email,
                                username: user.username,
                                phoneNumber: user.phoneNumber,
                            },
                        });
                    } else {
                        res.status(403).json({
                            status: "failed",
                            message: "password incorrect",
                        });
                    }
                } else {
                    res.status(404).json({
                        status: "error",
                        message: "user not found",
                    });
                }
            }
        }
    } catch (error) {
        console.log(error.message);
    }
};

export const Signup = async (req, res) => {
    try {
        const { fullname, email, username, phoneNumber, password } = req.body;

        if (fullname && email && username && phoneNumber && password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new User({
                fullname: fullname,
                email: email,
                username: username,
                phoneNumber: phoneNumber,
                password: hashedPassword,
            });

            await user
                .save()
                .then(() => {
                    res.status(200).json({
                        status: "success",
                        message: "user created successfully",
                    });
                })
                .catch(() => {
                    res.status(403).json({
                        status: "failed",
                        message: "user already exists",
                    });
                });
        } else {
            res.status(403).json({
                status: "failed",
                message: "all fields are required",
            });
        }
    } catch (error) {
        console.log(error.message);
    }
};
