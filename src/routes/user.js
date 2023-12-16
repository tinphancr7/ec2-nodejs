import express from "express";
import {
	getProfile,
	postBookingAppointment,
	updateProfile,
	verifyBookingAppointment,
} from "../controllers/userController.js";
import {authentication} from "../config/jwt.js";
import asyncHandler from "../utils/asyncHandler.js";
const router = express.Router();

// Route GET /users/:userId/profile
// router.use(asyncHandler(authentication));
router.get("/me", asyncHandler(getProfile));
router.put("/update-profile", asyncHandler(updateProfile));
router.post("/book-appointment", asyncHandler(postBookingAppointment));
router.post("/verify-book-appointment", verifyBookingAppointment);
export default router;

// import CartItemController from "../controllers/CartItemController";

// const router = express.Router();

// router.get("/:uid/cart", CartItemController.getCartItemsByUserId);
// router.post("/:uid/cart", CartItemController.createCartItem);
// router.put("/:uid/cart/:pid", CartItemController.editCartItem);
// router.delete("/:uid/cart/:pid", CartItemController.deleteCartItem);

// export default router;
