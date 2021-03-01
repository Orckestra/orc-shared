import { withProps } from "recompose";
import useToggle from "../hooks/useToggle";

const withToggle = propName => {
	console.warn("Higher order component withToggle has been deprecated in favor of React hook useToggle");
	return withProps(props => {
		const initProp = props[propName + "Init"];
		const [prop, toggle, reset] = useToggle(initProp);
		return {
			[propName]: prop,
			toggle,
			reset,
		};
	});
};

export default withToggle;
