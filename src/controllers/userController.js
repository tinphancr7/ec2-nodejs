import db from "../models/index.js";
import {getBookingTime} from "../utils/common.js";
import {sendSimpleEmail} from "../utils/emailService.js";

const getProfile = async (req, res) => {
	try {
		const user = await db.User.findByPk(req.user.id, {
			attributes: {exclude: ["password"]},
		});
		if (!user) {
			return res.status(404).json({error: "User not found"});
		}

		res.json({
			message: "Get profile success",
			result: user,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({error: "Server error"});
	}
};

const updateProfile = async (req, res) => {
	try {
		const updatedUser = await db.User.update(
			{
				...req.body,
			},
			{
				where: {
					id: req.user.id,
				},
			}
		);

		res.json({
			message: "Update profile success",
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({error: "Server error"});
	}
};
const buildUrlEmail = (token) => {
	let url = `${process.env.URL_FE}/verify-book-appointment?token=${token}`;
	return url;
};
const postBookingAppointment = async (req, res) => {
	try {
		const {
			bookingDate,
			firstName,
			bookingTime,
			email,
			lastName,
			address,
			reason,
			phone,
			specialty,
			userId,
		} = req.body;

		if (
			!bookingDate ||
			!bookingTime ||
			!email ||
			!firstName ||
			!lastName ||
			!address
		) {
			return res.status(500).json({message: "Missing params"});
		}
		let token = Math.floor(Math.random() * 1000000);

		const userExist = await db.Booking.findOne({
			where: {
				userId,
				bookingDate,
			},
		});

		if (userExist) {
			return res.status(500).json({message: "lịch đã được đặt hôm nay"});
		}
		//generate code

		await sendSimpleEmail({
			receivedEmail: email,
			fullName: lastName + " " + firstName,
			specialty: specialty,
			bookingTime: bookingTime,
			bookingDate: bookingDate,
			redirectLink: buildUrlEmail(token),
		});

		const [booking, created] = await db.Booking.findOrCreate({
			where: {
				userId,
			},
			defaults: {
				userId,
				bookingDate: bookingDate,
				bookingTime: bookingTime,
				status: "pending",
				token: token,
				reason: reason,
				specialty,
			},
		});
		if (booking) {
			return res.status(200).json(booking);
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};

const verifyBookingAppointment = async (req, res) => {
	try {
		const {token} = req.body;
		if (!token) {
			return res.status(500).json({message: "Missing params"});
		}

		let verify = await db.Booking.findOne({
			where: {
				token: token,
				status: "pending",
			},
			raw: false,
		});

		if (verify) {
			await verify.update({
				status: "authenticated",
			});
			return res.status(200).json({
				error: false,
				message: "Appointment has been booked",
			});
		} else {
			return res.status(200).json({
				error: true,
				message: "Appointment has been booked or does not exist",
			});
		}
	} catch (err) {
		return res.status(500).json(err);
	}
};
export {
	getProfile,
	updateProfile,
	postBookingAppointment,
	verifyBookingAppointment,
};
