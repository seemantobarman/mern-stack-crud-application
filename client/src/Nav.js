import { Link, withRouter } from "react-router-dom";
import { logout, getUser } from "./Helpers/helper";

import "./Nav.css";

const Nav = ({ history }) => {
	const logoutHandel = () => {
		const handelClick = () => {
			logout(function () {
				return history.push("/");
			});
		};

		return (
			<li
				onClick={handelClick}
				style={{
					cursor: "pointer",
					color: "white",
					marginTop: "14px",
					marginLeft: "15px",
				}}
			>
				Logout
			</li>
		);
	};

	const loginHandel = () => {
		return (
			<li>
				<Link to="/login">Login</Link>
			</li>
		);
	};

	return (
		<ul>
			<li>
				<Link to="/">Home</Link>
			</li>
			<li>
				<Link to="/create">Create Post</Link>
			</li>

			{getUser() ? logoutHandel() : loginHandel()}
		</ul>
	);
};

export default withRouter(Nav);
