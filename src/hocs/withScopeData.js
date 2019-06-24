import { compose } from "recompose";
import routingConnector from "./routingConnector";
import { unwrapImmutable } from "../utils";
import withInitialLoad from "./withInitialLoad";
import { currentScopeSelector, scopeGetter } from "../selectors/scope";
import { getScopes } from "../actions/scopes";

const mapStateToProps = state => ({
	currentScope: unwrapImmutable(currentScopeSelector(state)),
	getScope: scopeGetter(state),
});
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
