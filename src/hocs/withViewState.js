import { setStateField } from "../actions/view";
import routingConnector from "./routingConnector";

const getViewState = (state, name) => {
	const stateData = state.getIn(["view", name]);
	if (stateData && stateData.toJS) {
		return {
			viewState: stateData.toJS(),
		};
	} else {
		return { viewState: {} };
	}
};

const mapStateToProps = (state, ownProps) => getViewState(state, ownProps.name);

const mapDispatchToProps = (dispatch, ownProps) => ({
	updateViewState: (fieldName, value) =>
		dispatch(setStateField(ownProps.name, fieldName, value)),
});

const withValue = routingConnector(mapStateToProps, mapDispatchToProps);

export default withValue;
