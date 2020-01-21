import { withProps } from "recompose";
import useViewState from "../hooks/useViewState";

const withViewState = withProps(({ name }) => {
	const [viewState, updateViewState] = useViewState(name);
	return { viewState, updateViewState };
});

export default withViewState;
