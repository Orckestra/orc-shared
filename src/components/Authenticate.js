import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { safeGet } from "../utils";
import { useSelector } from "react-redux";
import { unwrapImmutable } from "../utils";
import { GET_AUTHENTICATION_PROFILE } from "../actions/authentication";
import { ERROR, LOGOUT } from "../reducers/request";
import ApplicationModuleLoader from "./ApplicationModuleLoader";
import Placeholder from "./MaterialUI/DataDisplay/PredefinedElements/Placeholder";

const useStyles = makeStyles({
	wrapper: {
		display: "flex",
		width: "60%",
		height: "100%",
		padding: "0 20vw",
		flexDirection: "column",
		justifyContent: "center",
	},
});

export const useAuthenticationData = () => ({
	loading: useSelector(state => state.getIn(["requests", "actives", GET_AUTHENTICATION_PROFILE])),
	authedUser: useSelector(state => state.getIn(["authentication", "name"])),
	requestError: unwrapImmutable(useSelector(state => state.getIn(["requests", ERROR]) || null)),
	needLogin: useSelector(state => state.getIn(["requests", LOGOUT])),
});

export const Loader = () => {
	const classes = useStyles();

	return (
		<div className={classes.wrapper}>
			<Placeholder icon="orckestra-loader" animateIcon />
		</div>
	);
};

export const Error = ({ requestError, needLogin }) => {
	const classes = useStyles();

	if (needLogin) {
		return (
			<div className={classes.wrapper}>
				<h1>Not logged in</h1>
			</div>
		);
	}
	return (
		<div className={classes.wrapper}>
			<h1>{safeGet(requestError, "payload", "message") || "An error occurred"}</h1>
			Last failing action: <pre>{JSON.stringify(requestError, null, 2)}</pre>
		</div>
	);
};

const Authenticate = ({ children }) => {
	const { loading, authedUser, requestError, needLogin } = useAuthenticationData();

	if (loading) {
		return <Loader />;
	}
	if (!authedUser) {
		return <Error {...{ requestError, needLogin }} />;
	} else {
		return <ApplicationModuleLoader children={children} />;
	}
};

export default Authenticate;
