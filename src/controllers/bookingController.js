import db from "../models/index.js";
const getBookingByDate = async (req, res) => {
	const bookingDate = req.query?.date;

	try {
		const booking = await db.Booking.findAll({
			where: {
				bookingDate,
			},
		});
		return res.status(200).json({
			message: "Get booking by date success",
			result: booking,
		});
	} catch (error) {
		return res.status(500).json({error: error.message});
	}
};

const createBooking = async (req, res) => {
	try {
		const user = await db.User.findOne({
			where: {
				email: req.body.email,
			},
		});

		if (!user) {
			return res.status(404).json({
				message: "User not found",
			});
		}
		const newBooking = await db.Booking.create({
			userId: user.id,
			...req.body,
		});

		return res.status(201).json({
			message: "Create booking success",
			result: newBooking,
		});
	} catch (error) {
		return res.status(500).json({error: error.message});
	}
};

const updateBooking = async (req, res) => {
	try {
		const updatedBooking = await db.Booking.update(
			{
				...req.body,
			},
			{
				where: {
					id: req.params.id,
				},
			}
		);
		return res.status(200).json({
			message: "Update booking success",
			result: updatedBooking,
		});
	} catch (error) {
		return res.status(500).json(error);
	}
};

const getBooking = async (req, res) => {
	try {
		const booking = await db.Booking.findAll({
			include: [
				{
					model: db.User,
					as: "userData",
					attributes: ["firstName", "lastName", "email"],
				},
				{
					model: db.Specialty,
					as: "specialtyData",
					attributes: ["name"],
				},
			],
			raw: true,
			nest: true,
		});

		booking.forEach(async (item) => {
			const pets = await db.Pet.findAll({
				where: {
					userId: item.userId,
				},
			});
			item.pets = pets;
		});

		return res.status(200).json({
			message: "Get booking success",
			result: booking,
		});
	} catch (error) {
		return res.status(500).json({error: error.message});
	}
};

const getBookingById = async (req, res) => {
	try {
		const booking = await db.Booking.findOne({
			where: {
				id: req.params.id,
			},
			include: [
				{
					model: db.User,
					as: "userData",
					attributes: ["firstName", "lastName", "email"],
				},
				{
					model: db.Specialty,
					as: "specialtyData",
					attributes: ["id", "name"],
				},
			],
			raw: true,
			nest: true,
		});

		return res.status(200).json({
			message: "Get booking by id success",
			result: booking,
		});
	} catch (error) {
		return res.status(500).json({error: error.message});
	}
};

const deleteBooking = async (req, res) => {
	try {
		const deletedBooking = await db.Booking.destroy({
			where: {
				id: req.params.id,
			},
		});

		return res.status(200).json({
			message: "Delete booking success",
			result: deletedBooking,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({error: "Server error"});
	}
};

export {
	createBooking,
	updateBooking,
	getBooking,
	deleteBooking,
	getBookingById,
	getBookingByDate,
};
