import jwt from "jsonwebtoken";
const generateToken = (user) => {
	return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: "10d",
	});
};
const generateRefreshToken = (user) => {
	return jwt.sign(
		{id: user.id, roleId: user.roleId},
		process.env.REFRESH_TOKEN_SECRET,
		{
			expiresIn: "17d",
		}
	);
};

const authentication = async (req, res, next) => {
	const accessToken = req.headers["authorization"]?.split(" ")[1];

	if (!accessToken) {
		throw new Error("Invalid request");
	}
	try {
		const decodedUser = jwt.verify(
			accessToken,
			process.env.ACCESS_TOKEN_SECRET
		);
		if (!decodedUser) throw new Error("Invalid token");

		req.user = decodedUser;

		return next();
	} catch (error) {
		throw error;
	}
};
export {generateToken, generateRefreshToken, authentication};
