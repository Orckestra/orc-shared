import React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import { replace } from "redux-little-router";
import withInitialLoad from "../hocs/withInitialLoad";

const withRedirectFunc = connect(
	() => ({}),
	(dispatch, { href }) => ({
		redirect: () => dispatch(replace(href)),
	}),
);

const Redirector = compose(
	withRedirectFunc,
	withInitialLoad("redirect"),
)(() => <div />);

export default Redirector;
