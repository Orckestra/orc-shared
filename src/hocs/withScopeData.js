import { withProps } from "recompose";
import useScopeData from "../components/Scope/useScopeData";

const withScopeData = withProps(() => {
	console.warn("Higher order component withScopeData has been deprecated");
	const [currentScope, defaultNodeState, getScope] = useScopeData();
	return {
		currentScope,
		defaultNodeState,
		getScope,
	};
});

export default withScopeData;
