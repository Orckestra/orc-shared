// @flow
import React, { Fragment } from "react";
import { withStateHandlers } from "recompose";
import Header from "./Header";
import ApplicationDialog from "./ApplicationDialog";

const ApplicationSelector = props => {
	return (
		<Fragment>
			<Header {...props} />
			<ApplicationDialog {...props} />
		</Fragment>
	);
};

const withShowToggle = withStateHandlers(
	({ init = false }) => ({ show: init }),
	{
		toggle: ({ show }) => () => ({ show: !show }),
	},
);

export default withShowToggle(ApplicationSelector);
