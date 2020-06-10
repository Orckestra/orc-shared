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
		...configuration,
		// Include authentication cookies
		credentials: "include",
		// Bail out if an instance of this request is already running (or if passed bailout returns true)
		bailout: state =>
			(typeof configuration.bailout === "function"
				? !!configuration.bailout(state)
				: !!configuration.bailout) || !!state.getIn(["requests", name]),
		headers,
		options,
	});
};

export default makeOrcApiAction;
