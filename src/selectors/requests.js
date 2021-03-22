import { createSelector } from "reselect";
import { memoize } from "../utils";

const viewData = state => state.get("view");

const requestData = state => state.get("requests");

export const selectActivity = memoize(requestName =>
	createSelector(requestData, reqs => reqs.getIn(["actives", requestName])),
);

export const requestRunningSelector = createSelector(
	requestData,
	viewData,
	(requestData, viewData) =>
		// Be default, we display the loadingScreen when a request is active. If it needs to be deactivated for
		// a specific use case, it is important to activate it back when done. use it with care please.
		requestData.get("actives").size > 0 && viewData.getIn(["loadingScreen", "enabled"]) !== false,
);
