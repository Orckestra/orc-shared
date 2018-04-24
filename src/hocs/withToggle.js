import { withStateHandlers } from "recompose";

const withToggle = propName =>
	withStateHandlers(
		init => ({
			[propName]: !!init[propName + "Init"],
		}),
		{
			toggle: state => () => ({ [propName]: !state[propName] }),
			reset: () => () => ({ [propName]: false }),
		},
	);

export default withToggle;
