import { withStateHandlers } from "recompose";

const withToggle = propName => {
	console.warn(
		"Higher order component withToggle has been deprecated in favor of React hook useToggle",
	);
	return withStateHandlers(
		init => ({
			[propName]: !!init[propName + "Init"],
		}),
		{
			toggle: state => () => ({ [propName]: !state[propName] }),
			reset: () => () => ({ [propName]: false }),
		},
	);
};
export default withToggle;
