import express from "express";

import asyncHandler from "../utils/asyncHandler";
import {authentication} from "../config/jwt";

import {
	createOrder,
	getOrderItemsByUser,
	notifyOrder,
	paymentOrder,
} from "../controllers/orderController";

const router = express.Router();
router.use(asyncHandler(authentication));
router.post("/create-order", createOrder);
router.get("/get-order-items", getOrderItemsByUser);
router.post("/payment", paymentOrder);
router.post("/notify", notifyOrder);

export default router;
