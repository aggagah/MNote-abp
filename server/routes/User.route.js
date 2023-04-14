import express from "express";
import {
    getOneUser,
    getUsers,
    updateProfile,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", getUsers);
router.post("/user", getOneUser);
router.put("/user", updateProfile);

export default router;
