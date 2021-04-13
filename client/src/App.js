import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getUser, getToken } from "./Helpers/helper";
import renderHTML from "react-render-html";
import Loading from "./LoadingComponent";

function App() {
	const [posts, setPosts] = useState([]);

	const [loading, setLoading] = useState(true);

	const fetchPosts = () => {
		axios
			.get(`${process.env.REACT_APP_API}/allposts`)
			.then((response) => {
				setPosts(response.data.posts);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const confirmDelete = (slug) => {
		const answer = window.confirm("Confirm Delete?");
		if (answer) {
			deletePost(slug);
		}
	};

	const deletePost = (slug) => {
		axios
			.delete(`${process.env.REACT_APP_API}/post/delete/${slug}`, {
				headers: { authorization: `Bearer ${getToken()}` },
			})
			.then((response) => {
				alert("Post Deleted");
				fetchPosts();
			})
			.catch((error) => {
				console.log(error);
				alert("Error Happened");
			});
	};

	useEffect(() => {
		fetchPosts();
		setTimeout(() => {
			setLoading(false);
		}, 500);
	}, []);

	const main = () => {
		return (
			<div className="container pb-5">
				{posts.map((post, index) => {
					return (
						<div
							key={post._id}
							className="row"
							style={{ borderBottom: "solid silver 1px" }}
						>
							<div className="col pt-3 pb-2">
								<div className="row">
									<div className="col-md-10">
										<Link style={{ color: "brown" }} to={`/post/${post.slug}`}>
											<h2>{post.title}</h2>
										</Link>
										<div className="lead pt-3">
											{renderHTML(post.content.substring(0, 100) + "...")}
										</div>
										<p>
											Author:{" "}
											<span style={{ fontWeight: "bold" }}>{post.user}</span>{" "}
											Created At:{" "}
											<span style={{ fontWeight: "bold" }}>
												{new Date(post.createdAt).toLocaleString()}
											</span>
										</p>
									</div>
									<div
										style={{ textAlign: "center", marginTop: "40px" }}
										className="col-md-2"
									>
										<Link
											className="btn btn-sm btn-outline-warning"
											to={`/post/update/${post.slug}`}
										>
											Update
										</Link>
										{getUser() && (
											<button
												style={{ marginLeft: "10px" }}
												className="btn btn-sm btn-outline-warning"
												onClick={() => {
													confirmDelete(post.slug);
												}}
											>
												Delete
											</button>
										)}
									</div>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		);
	};

	return loading ? <Loading /> : main();
}

export default App;
