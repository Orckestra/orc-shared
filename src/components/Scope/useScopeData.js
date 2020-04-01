import { useSelector } from "react-redux";
import useLoader from "../../hooks/useLoader";
import { unwrapImmutable } from "../../utils";
import {
	currentScopeSelector,
	defaultScopeSelector,
	scopeGetter,
} from "../../selectors/scope";
import { getScopes } from "../../actions/scopes";

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
	useLoader(getScopes(), () => currentScope.name);
	const defaultNodeState = buildDefaultNodeState(currentScope, getScope);
	return [currentScope, defaultNodeState, getScope];
};

export default useScopeData;
