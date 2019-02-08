import routingConnector from "./routingConnector";

const withRequestActivity = requestName =>
	routingConnector(state => ({
		active: !!state.getIn(["requests", requestName]),
	}));

export default withRequestActivity;
