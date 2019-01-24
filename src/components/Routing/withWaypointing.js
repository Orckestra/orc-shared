// HOC that sets the currently matched route of a component in state, including params
import { compose } from "recompose";
import { connect } from "react-redux";
import { setRoute } from "../../actions/navigation";
import withInitialLoad from "../../hocs/withInitialLoad";
import { safeGet } from "../../utils";

const withWaypointing = compose(
	connect(
		(state, { location }) => ({
			routeIsAligned:
				state.getIn(["navigation", "route", "location", "pathname"]) ===
				safeGet(location, "pathname"),
		}),
		(dispatch, { location, match }) => ({
			setRoute: () => dispatch(setRoute(location, match)),
		}),
	),
	withInitialLoad("setRoute", ({ routeIsAligned }) => !routeIsAligned),
);

export default withWaypointing;
