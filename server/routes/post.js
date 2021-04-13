const express = require("express");
const router = express.Router();

//Importing the controllers
const {
	create,
	allposts,
	readsinglepost,
	updatepost,
	deletepost,
} = require("../controllers/post");
const { requireSignin } = require("../controllers/auth");

router.post("/post", requireSignin, create);
router.get("/allposts", allposts);
router.get("/post/:slug", readsinglepost);
router.put("/post/update/:slug", requireSignin, updatepost);
router.delete("/post/delete/:slug", requireSignin, deletepost);

module.exports = router;
