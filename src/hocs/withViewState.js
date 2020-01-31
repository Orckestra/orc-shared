import { withProps } from "recompose";
import useViewState from "../hooks/useViewState";

const withViewState = withProps(({ name }) => {
	console.warn(
		"Higher order component withViewState has been deprecated in favor of React hook useViewState",
	);
	const [viewState, updateViewState] = useViewState(name);
	return { viewState, updateViewState };
});

export default withViewState;
