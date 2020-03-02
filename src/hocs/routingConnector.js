import { compose } from "recompose";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const deprecate = Comp => {
	console.warn(
		"Higher order component routingConnector has been deprecated in favor of React-Redux and React-Router hooks",
	);
	return Comp;
};

const routingConnector = (...connectArgs) =>
	compose(deprecate, withRouter, connect(...connectArgs));

export default routingConnector;
