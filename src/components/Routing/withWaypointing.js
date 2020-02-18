// HOC that sets the currently matched route of a component in state, including params
import React from "react";
import { useLocation } from "react-router-dom";
import { selectRouteHref } from "../../selectors/navigation";
import { setRoute, mapHref } from "../../actions/navigation";
import useLoader from "../../hooks/useLoader";

const withWaypointing = Comp => props => {
	const { match, mapFrom } = props;
	const location = useLocation();
	const loadActions = [];
	if (match.isExact) {
		if (mapFrom) {
			loadActions.push(
				mapHref(mapFrom, location.pathname),
				setRoute({ ...location, pathname: mapFrom }, match),
			);
		} else {
			loadActions.push(setRoute(location, match));
		}
	}
	const cutout = state => selectRouteHref(state) === location.pathname;
	useLoader(loadActions, cutout);
	return <Comp {...props} />;
};

export default withWaypointing;
