import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import renderHTML from "react-render-html";

function SinglePost() {
	console.log("Top");
	//Accessing the url parameter
	const { slug } = useParams();

	const [post, setPost] = useState({
		title: "",
		content: "",
		user: "",
		createdAt: "",
	});

	console.log("Before fetchSinglePost");
	const fetchSinglePost = () => {
		console.log("fetchSinglePost");
		axios
			.get(`${process.env.REACT_APP_API}/post/${slug}`)
			.then((response) => {
				setPost(response.data.post);
			})
			.catch((error) => {
				alert("Error Can't Load Single Post");
				console.log(error);
			});
	};

	useEffect(() => {
		console.log("useEffect");
		fetchSinglePost();
	}, []);

	const showSinglePost = () => {
		return (
			<div>
				{console.log("inside showSinglePost")}
				<h1>{post.title}</h1>
				<div>{renderHTML(post.content)}</div>
				<p>
					Author: <span style={{ fontWeight: "bold" }}>{post.user}</span>{" "}
					Created At:{" "}
					<span style={{ fontWeight: "bold" }}>
						{new Date(post.createdAt).toLocaleString()}
					</span>
				</p>
			</div>
		);
	};

	return (
		<div
			style={{ textAlign: "center", marginTop: "20px" }}
			className="container"
		>
			{console.log("Inside main render")}
			{post && showSinglePost()}
		</div>
	);
}

export default SinglePost;
