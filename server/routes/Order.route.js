import express from "express";
import {
    addOrder,
    deleteOrder,
    getAllOrders,
    getOrdersByCategory,
    getOrdersByDateCategory,
    searchOrders,
} from "../controllers/order.controller.js";

const router = express.Router();

router.post("/order", addOrder);
router.get("/order", getAllOrders);
router.delete("/order", deleteOrder);
router.get("/order/category", getOrdersByCategory);
router.get("/order/orderbydate", getOrdersByCategory);
router.get("/order/orderbydatecategory", getOrdersByDateCategory);
router.post("/order/search", searchOrders);

export default router;
