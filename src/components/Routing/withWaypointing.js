// HOC that sets the currently matched route of a component in state, including params
import React from "react";
import { useLocation } from "react-router-dom";
import { selectRouteHref } from "../../selectors/navigation";
import { setRoute, mapHref, setCurrentPrependPath } from "../../actions/navigation";
import useLoader from "../../hooks/useLoader";

const withWaypointing =
	(Comp, isVisible = true, componentProps = {}) =>
	props => {
		const { match, mapFrom, modulePrependPath } = props;
		const location = useLocation();
		const loadActions = [];
		if (modulePrependPath) {
			loadActions.push(setCurrentPrependPath(modulePrependPath));
		}

		if (match.isExact) {
			if (mapFrom) {
				loadActions.push(mapHref(mapFrom, location.pathname), setRoute({ ...location, pathname: mapFrom }, match));
			} else {
				loadActions.push(setRoute(location, match));
			}
		}
		const cutout = state => selectRouteHref(state) === location.pathname;
		useLoader(loadActions, cutout);
		return isVisible ? <Comp {...props} {...componentProps} /> : null;
	};

export default withWaypointing;
