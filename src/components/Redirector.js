import React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import { replace } from "redux-little-router";
import withInitialLoad from "../hocs/withInitialLoad";

const withRedirectFunc = connect(
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
