import { useSelector } from "react-redux";
import { getScopeChangeInProgress } from "../selectors/scopeRouteState";
import useLoader from "./useLoader";

// look at scopeRouteState.js for documentation

const useScopeGuardLoader = (actions, cutoutSelector) => {
	const changeInProgress = useSelector(getScopeChangeInProgress);

	const cutoutSelectorGuard = (...selArgs) => {
		if (changeInProgress) {
			return true;
		}

		if (cutoutSelector) {
			return cutoutSelector.apply(null, selArgs);
		}

		return true;
	};

	useLoader(actions, cutoutSelectorGuard);
};

export default useScopeGuardLoader;
