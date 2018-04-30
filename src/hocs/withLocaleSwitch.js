import { connect } from "react-redux";
import { changeLocale } from "../actions/locale";

const withLocaleSwitch = connect(
	() => ({}),
	(dispatch, ownProps) => ({
		onClick: () => dispatch(changeLocale(ownProps.locale)),
	}),
);

export default withLocaleSwitch;
