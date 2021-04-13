import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getUser } from "./Helpers/helper";

const PrivateRoute = ({ component: Component, ...rest }) => {
	return (
		<Route
			{...rest}
			render={(props) =>
				getUser() ? (
					<Component {...props} />
				) : (
					<Redirect
						to={{ pathname: "/login", state: { from: props.location } }}
					/>
				)
			}
		/>
	);
};
//...rest are path, exact and other props...

export default PrivateRoute;
