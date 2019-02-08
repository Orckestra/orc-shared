import { compose } from "recompose";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const routingConnector = (...connectArgs) =>
	compose(
		withRouter,
		connect(...connectArgs),
	);

export default routingConnector;
