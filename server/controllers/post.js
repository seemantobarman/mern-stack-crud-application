const slugify = require("slugify");

const Post = require("../models/post");

exports.create = (req, res) => {
	const { title, content, user } = req.body;
	const slug = slugify(title);

	//validation
	switch (true) {
		case !title:
			return res.status(400).json({ error: "Title is mandatory" });
		case !content:
			return res.status(400).json({ error: "Content is mandatory" });
	}

	let newPost = new Post({ title, content, user, slug });
	newPost.save((error, post) => {
		if (error) {
			console.log(error);
			return res.status(400).json({
				error,
			});
		}
		res.json({
			post,
		});
	});
};

exports.allposts = (req, res) => {
	//Leaving empty object means it will return all the posts
	Post.find({})
		.sort({ createdAt: -1 })
		.exec((error, posts) => {
			if (error) {
				console.log(error);
				return res.json({
					error,
				});
			}

			res.json({
				posts,
			});
		});
};

exports.readsinglepost = (req, res) => {
	console.log(req.params);
	const { slug } = req.params;

	Post.findOne({ slug: slug }).exec((error, post) => {
		if (error) {
			return res.json({
				error,
			});
		}
		res.json({
			post,
		});
	});
};

exports.updatepost = (req, res) => {
	const { slug } = req.params;
	const { title, content, user } = req.body;

	//First argument is the one to search for which post to update and the second argument is the one for what to update
	Post.findOneAndUpdate(
		{ slug: slug },
		{ title, content, user },
		{ new: true }
	).exec((error, post) => {
		if (error) {
			console.log(error);
			return res.json({
				error,
			});
		}

		res.json({
			post,
		});
	});
};

exports.deletepost = (req, res) => {
	const { slug } = req.params;

	Post.findOneAndDelete({ slug: slug }).exec((error, post) => {
		if (error) {
			console.log(error);
			return res.json({
				error,
			});
		}

		res.json({
			message: "Post Successfully Deleted",
		});
	});
};
