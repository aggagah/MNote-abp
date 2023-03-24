import User from "../models/User.js";
import Order from "../models/Order.js";

export const addOrder = async (req, res) => {
    const { userId, name, price, amount, category } = req.body;
    const userData = await User.findOne({ _id: userId });
    if (userData) {
        const newOrder = new Order({
            name,
            price,
            amount,
            date: `${
                new Date().getDate() < 10
                    ? "0" + new Date().getDate()
                    : new Date().getDate()
            }-${
                new Date().getMonth() < 10
                    ? "0" + (new Date().getMonth() + 1)
                    : new Date().getMonth() + 1
            }-${new Date().getFullYear()}`,
            category,
            user: userId,
        });
        await newOrder.save();

        // add new order to user data
        await User.findByIdAndUpdate(userId, {
            $push: {
                orders: newOrder._id,
            },
        }).then(() => {
            res.status(201).json({
                status: "success",
                message: "Order added successfully",
                data: newOrder,
            });
        });
    } else {
        res.status(404).json({
            status: "error",
            message: "User not found",
        });
    }
};

export const getAllOrders = async (req, res) => {
    try {
        const { userId } = req.body;
        const userData = await User.findOne({ _id: userId }).populate("orders");
        if (userData.orders.length > 0) {
            res.status(200).json({
                status: "success",
                message: "Orders fetched successfully",
                data: userData.orders,
            });
        } else {
            res.status(404).json({
                status: "error",
                message: "No orders found",
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

export const deleteOrder = async (req, res) => {
    try {
        const { userId, orderId } = req.body;
        const orderData = await Order.findOneAndDelete({ _id: orderId });
        if (orderData) {
            await User.findByIdAndUpdate(userId, {
                $pull: {
                    orders: orderId,
                },
            }).then(() => {
                res.status(200).json({
                    status: "success",
                    message: "Order deleted successfully",
                });
            });
        } else {
            res.status(404).json({
                status: "error",
                message: "Order not found",
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

export const getOrdersByCategory = (req, res) => {
    try {
        const { userId, category } = req.body;
        const userData = User.findOne({ _id: userId }).populate({
            path: "orders",
            match: { category: category },
        });
        if (userData) {
            res.status(200).json({
                status: "success",
                message: "Orders fetched successfully",
                data: userData,
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

export const getOrdersByDate = async (req, res) => {
    try {
        const { userId, date } = req.body;
        const userData = await User.findOne({ _id: userId }).populate({
            path: "orders",
            match: { date: date },
        });
        if (userData) {
            res.status(200).json({
                status: "success",
                message: "Orders fetched successfully",
                data: userData,
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

export const getOrdersByDateCategory = async (req, res) => {
    try {
        const { userId, date, category } = req.body;
        await User.findOne({ _id: userId })
            .populate({
                path: "orders",
                match: { date: date, category: category },
            })
            .then((result) => {
                res.status(200).json({
                    status: "success",
                    message: "Orders fetched successfully",
                    data: result.orders,
                });
            })
            .catch(() => {
                res.status(404).json({
                    status: "failed",
                    message: "Order not found",
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

export const searchOrders = async (req, res) => {
    try {
        const { userId, name } = req.body;
        await User.findOne({ _id: userId })
            .populate({
                path: "orders",
                match: { name: name },
            })
            .then((orders) =>
                res.status(200).json({
                    status: "success",
                    message: "Orders fetched successfully",
                    data: orders.orders,
                })
            )
            .catch(() =>
                res.status(404).json({
                    status: "error",
                    message: "No orders found",
                })
            );
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            status: "failed",
            message: error.message,
        });
    }
};
