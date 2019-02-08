import routingConnector from "./routingConnector";
import { changeLocale } from "../actions/locale";

const withLocaleSwitch = routingConnector(
	() => ({}),
	(dispatch, ownProps) => ({
		onClick: () => dispatch(changeLocale(ownProps.locale)),
	}),
);

export default withLocaleSwitch;
