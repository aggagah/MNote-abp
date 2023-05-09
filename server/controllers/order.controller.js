import User from "../models/User.js";
import Order from "../models/Order.js";

export const addOrder = async (req, res) => {
    const { userId, name, amount } = req.body;
    const userData = await User.findOne({ _id: userId });
    let price;
    let category;
    if (userData) {
        if (name.includes("nasi")) {
            (price = amount * 20000), (category = "main-course");
        } else if (name.includes("minuman")) {
            (price = amount * 10000), (category = "drinks");
        }

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
        const userData = await User.findOne({ _id: userId }).populate({
            path: "orders",
            match: {
                date: `${
                    new Date().getDate() < 10
                        ? "0" + new Date().getDate()
                        : new Date().getDate()
                }-${
                    new Date().getMonth() < 10
                        ? "0" + (new Date().getMonth() + 1)
                        : new Date().getMonth() + 1
                }-${new Date().getFullYear()}`,
            },
        });
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
    const resultData = [];

    try {
        const { userId, name } = req.body;
        const fetchedData = await User.findOne({ _id: userId }).populate({
            path: "orders",
        });
        // console.log(fetchedData);
        if (fetchedData.orders.length > 0) {
            // const result = fetchedData.orders.filter((order) => {
            //     order.name.toLowerCase().includes(name.toLowerCase());
            // });
            fetchedData.orders.forEach((element) => {
                if (element.name.toLowerCase().includes(name.toLowerCase())) {
                    resultData.push(element);
                }
            });
            res.status(200).json({
                status: "success",
                message: "Orders fetched succesfully",
                data: resultData,
            });
        } else {
            res.status(404).json({
                status: "error",
                message: "No orders found",
            });
        }
        // .then((orders) => {
        //     const result = orders.orders.filter((order) =>
        //         order.name.toLowerCase().includes(name.toLowerCase())
        //     );
        //     res.status(200).json({
        //         status: "success",
        //         message: "Orders fetched successfully",
        //         data: result,
        //     });
        // })
        // .catch(() =>
        //     res.status(404).json({
        //         status: "error",
        //         message: "No orders found",
        //     })
        // );
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            status: "failed",
            message: error.message,
        });
    }
};
