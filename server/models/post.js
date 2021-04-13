const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const { Schema } = mongoose;

const postSchema = new Schema(
	{
		title: {
			type: String,
			trim: true,
			min: 3,
			max: 100,
			required: true,
		},
		slug: {
			type: String,
			trim: true,
			unique: true,
			index: true,
			lowercase: true,
		},
		content: {
			type: {},
			required: true,
			min: 20,
			max: 1000,
		},
		user: {
			type: String,
			default: "Admin",
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Post", postSchema, "posts");
