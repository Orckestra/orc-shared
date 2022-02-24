import { useSelector } from "react-redux";
import { unwrapImmutable } from "../../utils";
import { currentScopeSelector, scopeGetter } from "../../selectors/scope";

const buildDefaultNodeState = (current, getScope) => {
	let node = current;
	let nodeState = {};
	while ((node = getScope(node.parentScopeId))) {
		nodeState[node.id] = true;
	}
	return nodeState;
};

const useScopeData = () => {
	const currentScope = unwrapImmutable(useSelector(currentScopeSelector));
	const getScope = useSelector(scopeGetter);
	const defaultNodeState = buildDefaultNodeState(currentScope, getScope);
	return [currentScope, defaultNodeState, getScope];
};

export default useScopeData;
