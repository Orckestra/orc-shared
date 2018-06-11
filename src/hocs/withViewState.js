import { connect } from "react-redux";
import { setStateField } from "../actions/view";

const getViewState = (state, name) => {
	const stateData = state.getIn(["view", name]);
	if (stateData && stateData.toJS) {
		return stateData.toJS();
	} else {
		return {};
	}
};

const mapStateToProps = (state, ownProps) => getViewState(state, ownProps.name);

const mapDispatchToProps = (dispatch, ownProps) => ({
	updateViewState: (fieldName, value) =>
		dispatch(setStateField(ownProps.name, fieldName, value)),
});

const withValue = connect(
	mapStateToProps,
	mapDispatchToProps,
);

export default withValue;
