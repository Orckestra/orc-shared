import routingConnector from "./routingConnector";
import { changeLocale } from "../actions/locale";

console.warn("withLocaleSwitch has been deprecated");

const withLocaleSwitch = routingConnector(
	() => ({}),
	(dispatch, ownProps) => ({
		onClick: () => dispatch(changeLocale(ownProps.locale)),
	}),
);

export default withLocaleSwitch;
