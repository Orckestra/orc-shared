import routingConnector from "./routingConnector";

console.warn("withRequestActivity has been deprecated");

const withRequestActivity = requestName =>
	routingConnector(state => ({
		active: !!state.getIn(["requests", requestName]),
	}));

export default withRequestActivity;
