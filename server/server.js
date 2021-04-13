const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

//Routes
const postRoutes = require("./routes/post");
const authRoutes = require("./routes/auth");

//App
const app = express();

//Database
mongoose
	.connect(process.env.DATABASE, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	})
	.then(() => {
		console.log("DB is connected");
	})
	.catch((error) => {
		console.log("Error: ", error);
	});

//Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

//Endpoints
app.use("/api", postRoutes);
app.use("/api", authRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
	console.log(`Server is running on port: ${PORT}`);
});
