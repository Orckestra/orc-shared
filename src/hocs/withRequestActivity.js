import { connect } from "react-redux";

const withRequestActivity = requestName =>
	connect(state => ({
		active: !!state.getIn(["requests", requestName]),
	}));

export default withRequestActivity;
