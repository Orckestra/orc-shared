import { compose } from "recompose";
import routingConnector from "./routingConnector";
import { unwrapImmutable } from "../utils";
import withInitialLoad from "./withInitialLoad";
import { currentScopeSelector, scopeGetter } from "../selectors/scope";
import { getScopes } from "../actions/scopes";

const buildDefaultNodeState = (current, getScopes) => {
	let node = current;
	let viewState = {};
	while ((node = getScopes(node.parentScopeId))) {
		viewState[node.id] = true;
	}
	return viewState;
};

const mapStateToProps = state => {
	const props = {
		currentScope: unwrapImmutable(currentScopeSelector(state)),
		getScope: scopeGetter(state),
	};
	props.defaultNodeState = buildDefaultNodeState(
		props.currentScope,
		props.getScope,
	);
	return props;
};
const mapDispatchToProps = dispatch => ({
	loadScopes: () => dispatch(getScopes()),
});

export const withScopeData = routingConnector(
	mapStateToProps,
	mapDispatchToProps,
);

export default compose(
	withScopeData,
	withInitialLoad("loadScopes", props => !props.currentScope.name),
);
