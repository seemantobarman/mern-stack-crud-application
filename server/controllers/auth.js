const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

exports.login = (req, res) => {
	const { name, password } = req.body;

	if (password === process.env.ADMIN_PASSWORD) {
		//Generate a token and send the token to the client
		const token = jwt.sign({ name }, process.env.JWT_SECRET, {
			expiresIn: "1h",
		});
		return res.json({
			token,
			name,
		});
	} else {
		return res.status(400).json({
			error: "Incorrect Password",
		});
	}
};

exports.requireSignin = expressJwt({
	secret: process.env.JWT_SECRET,
	algorithms: ["HS256"],
});
