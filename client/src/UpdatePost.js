import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import { getToken } from "./Helpers/helper";
import "react-quill/dist/quill.bubble.css";
import axios from "axios";

function UpdatePost() {
	const { slug } = useParams();

	const [state, setState] = useState({
		title: "",
		slug: "",
		user: "",
	});

	const { title, user } = state;

	//Handel Contents
	const [content, setContent] = useState("");

	const handelContent = (event) => {
		setContent(event);
	};

	useEffect(() => {
		axios
			.get(`${process.env.REACT_APP_API}/post/${slug}`)
			.then((response) => {
				let { title, content, user, slug } = response.data.post;

				setState({
					...state,
					title,
					user,
					slug,
				});
				setContent(content);
			})
			.catch((error) => {
				alert("Error Can't Load Single Post");
				console.log(error);
			});
	}, []);

	const handelSubmit = (event) => {
		axios
			.put(
				`${process.env.REACT_APP_API}/post/update/${slug}`,
				{
					title,
					content,
					user,
				},
				{
					headers: { authorization: `Bearer ${getToken()}` },
				}
			)
			.then(function (response) {
				const { title, content, user, slug } = response.data.post;
				setState({
					...state,
					title: title,
					user: user,
					slug: slug,
				});
				setContent(content);
				alert("Successfully Updated The Post");
			})
			.catch(function (error) {
				console.log(error);
				alert("Error");
			});
		event.preventDefault();
	};

	const handelChange = (event) => {
		const value = event.target.value;
		const name = event.target.name;

		setState({
			...state,
			[name]: value,
		});
	};

	return (
		<div className="container p-5">
			<h1>Update Post</h1>

			<br />
			<form onSubmit={handelSubmit}>
				<div className="form-group">
					<label className="text-muted">Title</label>
					<input
						value={title}
						onChange={handelChange}
						name="title"
						type="text"
						className="form-control"
						placeholder="Title"
						required
					/>
				</div>
				<br />
				<div className="form-group">
					<label className="text-muted">Content</label>
					<ReactQuill
						theme="bubble"
						value={content}
						onChange={handelContent}
						className="form-control"
						placeholder="Content..."
						required
					/>
				</div>
				<br />
				<div className="form-group">
					<label className="text-muted">User</label>
					<input
						value={user}
						onChange={handelChange}
						name="user"
						type="text"
						className="form-control"
						placeholder="Your Name"
						required
					/>
				</div>
				<br />
				<div>
					<button className="btn btn-primary">Update Post</button>
				</div>
			</form>
		</div>
	);
}

export default UpdatePost;
