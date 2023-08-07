import { createSelector } from "reselect";

const globalMsgData = state => state.get("globalErrorMessages");

export const firstDialogErrorMessageSelector = createSelector(globalMsgData, data => {
	const msgs = data.getIn(["dialog", "errorMessages"]);
	if (msgs.size === 0) {
		return null;
	}
	return msgs.first().toJS();
});
