import { createSelector } from "reselect";
import { castArray } from "lodash";
import { requestStateOperationMap } from "../constants";

const requestStateData = state => state.get("requestStates");

export const getRequestStateInfo = (operation, keys) => {
	return createSelector(requestStateData, data => {
		const firstSegment = requestStateOperationMap[operation];
		return data.getIn([firstSegment, ...castArray(keys), "state"]) ?? {};
	});
};
