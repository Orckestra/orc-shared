import { createSelector } from "reselect";
import { memoize } from "../utils";

const requestData = state => state.get("requests");

export const selectActivity = memoize(requestName => createSelector(requestData, reqs => reqs.get(requestName)));
