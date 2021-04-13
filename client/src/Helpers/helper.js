//save username and token to the session stroage
export const authenticate = (response, callback) => {
	if (window !== "undefined") {
		console.log(response);
		sessionStorage.setItem("token", JSON.stringify(response.data.token));
		sessionStorage.setItem("user", JSON.stringify(response.data.name));
	}

	callback();
};

//access token from the local stroage
export const getToken = () => {
	if (window !== "undefined") {
		if (sessionStorage.getItem("token")) {
			return JSON.parse(sessionStorage.getItem("token"));
		} else {
			return false;
		}
	}
};

//access token from the session stroage
export const getUser = () => {
	if (window !== "undefined") {
		if (sessionStorage.getItem("user")) {
			return JSON.parse(sessionStorage.getItem("user"));
		} else {
			return false;
		}
	}
};

//remove token from session stroge
export const logout = (callback) => {
	if (window !== "undefined") {
		sessionStorage.removeItem("token");
		sessionStorage.removeItem("user");
	}
	callback();
};
