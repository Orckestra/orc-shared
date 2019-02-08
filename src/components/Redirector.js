import React from "react";
import { compose } from "recompose";
import { replace } from "connected-react-router";
import routingConnector from "../hocs/routingConnector";
import withInitialLoad from "../hocs/withInitialLoad";

const withRedirectFunc = routingConnector(
	() => ({}),
	(dispatch, { href }) => ({
		redirect: () => setTimeout(() => dispatch(replace(href)), 0),
	}),
);

const Redirector = compose(
	withRedirectFunc,
	withInitialLoad("redirect"),
)(() => <div />);

export default Redirector;
