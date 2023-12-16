const express = require("express");
const router = express.Router();

const bookingController = require("../controllers/bookingController");
router.get("/date", bookingController.getBookingByDate);
router.post("/new", bookingController.createBooking);
router.put("/:id", bookingController.updateBooking);

router.get("/", bookingController.getBooking);
router.get("/:id", bookingController.getBookingById);
router.delete("/:id", bookingController.deleteBooking);

module.exports = router;
