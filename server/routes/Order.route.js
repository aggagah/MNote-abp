import express from "express";
import {
    addOrder,
    deleteOrder,
    getAllOrders,
    getOrdersByCategory,
    getOrdersByDate,
    getOrdersByDateCategory,
    searchOrders,
} from "../controllers/order.controller.js";

const router = express.Router();

router.post("/order/order", addOrder);
router.post("/order", getAllOrders);
router.delete("/order", deleteOrder);
router.post("/order/category", getOrdersByCategory);
router.post("/order/orderbydate", getOrdersByDate);
router.post("/order/orderbydatecategory", getOrdersByDateCategory);
router.post("/order/search", searchOrders);

export default router;
