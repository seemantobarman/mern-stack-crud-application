import { useState } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import { getUser, getToken } from "./Helpers/helper";

require("dotenv").config();

function Create() {
	const [state, setState] = useState({
		title: "",
		user: getUser(),
	});

	const [content, setContent] = useState("");
	//Handel Contents
	const handelContent = (event) => {
		setContent(event);
	};

	function handelChange(event) {
		const value = event.target.value;
		const name = event.target.name;

		setState({
			...state,
			[name]: value,
		});
	}

	//Destructing the state
	const { title, user } = state;

	const handelSubmit = (event) => {
		axios
			.post(
				`${process.env.REACT_APP_API}/post`,
				{ title, content, user },
				{
					headers: { authorization: `Bearer ${getToken()}` },
				}
			)
			.then(function (response) {
				console.log(response);
				alert("Success");
				setState({
					title: "",
					user: "",
				});
				setContent("");
			})
			.catch(function (error) {
				console.log(error);
				alert("Error");
			});

		event.preventDefault();
	};

	return (
		<div className="container pb-5">
			<h1>Create Post</h1>

			<br />
			<form onSubmit={handelSubmit}>
				<div className="form-group">
					<label className="text-muted">Title</label>
					<input
						value={state.title}
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
						name="content"
						className="form-control"
						placeholder="Content..."
						required
					/>
				</div>
				<br />
				<div className="form-group">
					<label className="text-muted">User</label>
					<input
						value={state.user}
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
					<button className="btn btn-primary">Create Post</button>
				</div>
			</form>
		</div>
	);
}

export default Create;
