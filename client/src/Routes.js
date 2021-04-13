import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import App from "./App";
import Create from "./Create";
import Nav from "./Nav";
import Footer from "./Footer";
import SinglePost from "./SinglePost";
import UpdatePost from "./UpdatePost";
import Login from "./Authentication/Login";
import PrivateRoute from "./PrivateRoute";

const Routes = () => {
	return (
		<BrowserRouter>
			{/* Navigation Bar */}
			<Nav />

			{/* Body */}
			<Switch>
				<Route path="/" exact component={App} />
				<PrivateRoute path="/create" exact component={Create} />
				<Route path="/post/:slug" exact component={SinglePost} />
				<PrivateRoute path="/post/update/:slug" exact component={UpdatePost} />
				<Route path="/login" exact component={Login} />
			</Switch>

			{/* Footer */}
			<Footer />
		</BrowserRouter>
	);
};

export default Routes;
