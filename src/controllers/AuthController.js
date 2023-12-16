import argon2 from "argon2";
import db from "../models/index.js";
import {generateToken} from "../config/jwt.js";

const registerUser = async (req, res) => {
	const {password, email} = req.body;
	try {
		let user = await db.User.findOne({
			where: {
				email: email,
			},
		});

		if (user) {
			return res
				.status(400)
				.json({success: false, message: "Email already taken"});
		}

		// hash password
		const hashedPassword = await argon2.hash(password || "");

		const newUser = await db.User.create({
			...req.body,
			password: hashedPassword,
		});

		// Return token
		return res.status(200).json({
			message: "Register success",
			result: newUser,
		});
	} catch (error) {
		return res.status(500).json(error);
	}
};

const loginUser = async (req, res) => {
	try {
		const user = await db.User.findOne({
			where: {
				email: req.body.email,
			},
		});

		if (!user) {
			return res.status(401).json({success: false, message: "User not found"});
		}
		// Check for correct password
		const hashedPassword = await argon2.verify(
			user.password,
			req.body.password
		);

		if (!hashedPassword) {
			return res
				.status(401)
				.json({success: false, message: "Email or password is incorrect"});
		}

		const {password, ...info} = user;

		const accessToken = generateToken(user);

		return res.status(200).json({
			message: "Login success",
			result: {...info, accessToken},
		});
	} catch (error) {
		return res.status(500).json(error);
	}
};
const logoutAccount = async (req, res) => {
	try {
		res.status(200).json({message: "Logout success"});
	} catch (error) {
		res.status(500).json({error: "Server error"});
	}
};
export {registerUser, loginUser, logoutAccount};
