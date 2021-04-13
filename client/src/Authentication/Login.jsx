import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { authenticate } from "../Helpers/helper";

const Login = () => {
	let history = useHistory();

	const [state, setState] = useState({
		name: "",
		password: "",
	});

	const handelSubmit = (event) => {
		axios
			.post(`${process.env.REACT_APP_API}/login`, state)
			.then((response) => {
				console.log(response);

				//second argument is for redirecting the user to the homepage
				authenticate(response, () => {
					history.push("/");
				});
			})
			.catch((error) => {
				console.log(error.response);
				alert(error.response.data.error);
			});
		event.preventDefault();
	};

	const handelChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;

		setState({
			...state,
			[name]: value,
		});
	};

	//Form
	return (
		<div className="container p-5">
			<h1>Login</h1>

			<br />
			<form onSubmit={handelSubmit}>
				<div className="form-group">
					<label className="text-muted">Name</label>
					<input
						value={state.name}
						onChange={handelChange}
						name="name"
						type="text"
						className="form-control"
						placeholder="Name"
						required
					/>
				</div>
				<br />
				<div className="form-group">
					<label className="text-muted">Password</label>
					<input
						value={state.password}
						onChange={handelChange}
						name="password"
						type="password"
						className="form-control"
						placeholder="Password"
						required
					/>
				</div>
				<br />
				<div>
					<button className="btn btn-primary">Login</button>
				</div>
			</form>
		</div>
	);
};

export default Login;
