import { createSelector } from "reselect";

const authData = state => state.get("authentication");

export const selectCurrentUsername = createSelector(authData, data =>
	data.get("name"),
);
