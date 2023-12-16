import express from "express";

import {
	getCart,
	removeItemFromCart,
	updateQuantity,
} from "../controllers/cartController";
import asyncHandler from "../utils/asyncHandler";
import {authentication} from "../config/jwt";
import {
	createCartItem,
	getCartItemsByUserId,
	removeCartItem,
	updateCartItem,
} from "../controllers/CartItemController";

const router = express.Router();
router.use(asyncHandler(authentication));
router.post("/add-to-cart", createCartItem);
router.get("/get-cart-user", getCart);
router.put("/update-cart-item", updateCartItem);
router.delete("/remove-cart-item/:id", removeCartItem);
router.get("/get-cart-items", getCartItemsByUserId);

export default router;
