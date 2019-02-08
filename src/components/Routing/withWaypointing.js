// HOC that sets the currently matched route of a component in state, including params
import { compose } from "recompose";
import routingConnector from "../../hocs/routingConnector";
import { selectPathname } from "../../selectors/route";
import { setRoute } from "../../actions/navigation";
import withInitialLoad from "../../hocs/withInitialLoad";

const withWaypointing = compose(
	routingConnector(
		(state, { location }) => ({
			routeIsAligned: selectPathname(state) === window.location.pathname,
		}),
		(dispatch, { location, match }) => ({
			setRoute: () => dispatch(setRoute(location, match)),
		}),
	),
	withInitialLoad("setRoute", ({ routeIsAligned }) => !routeIsAligned),
);

export default withWaypointing;
