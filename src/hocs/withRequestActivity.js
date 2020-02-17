import { withProps } from "recompose";
import { useSelector } from "react-redux";
import { selectActivity } from "../selectors/requests";
console.warn("withRequestActivity has been deprecated");

const withRequestActivity = requestName =>
	withProps(() => ({
		active: !!useSelector(selectActivity(requestName)),
	}));

export default withRequestActivity;
