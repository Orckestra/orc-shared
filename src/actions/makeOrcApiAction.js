import { makeApiAction } from "./makeApiAction";

const makeOrcApiAction = (name, endpoint, method = "GET", configuration = {}) => {
	const options = {
		...(configuration.options || {}),
		// Ensure any needed redirects work
		redirect: "follow",
	};
	const headers = {
		...(configuration.headers || {}),
		// Responses from API will be this type
		Accept: "application/json; charset=utf-8",
		"Content-Type": "application/json",
	};
	return makeApiAction(name, endpoint, method, {
		// Bail out if an instance of this request is already running (or if passed bailout returns true)
		bailout: state => state.getIn(["requests", "actives", name]) === true,
		...configuration,
		// Include authentication cookies
		credentials: "include",
		headers,
		options,
	});
};

export default makeOrcApiAction;
