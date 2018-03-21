import React from "react";
import { withStateHandlers } from "recompose";
import Header from "./Header";
import ApplicationDialog from "./ApplicationDialog";

const ApplicationSelector = props => {
	return (
		<React.Fragment>
			<Header {...props} />
			<ApplicationDialog {...props} />
		</React.Fragment>
	);
};

const withShowToggle = withStateHandlers(
	({ init = false }) => ({ show: init }),
	{
		toggle: ({ show }) => () => ({ show: !show }),
	},
);

export default withShowToggle(ApplicationSelector);
