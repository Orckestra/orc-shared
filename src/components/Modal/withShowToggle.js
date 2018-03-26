import { withStateHandlers } from "recompose";

const withShowToggle = withStateHandlers(
	({ init = false }) => ({ show: init }),
	{
		toggle: ({ show }) => () => ({ show: !show }),
	},
);

export default withShowToggle;
