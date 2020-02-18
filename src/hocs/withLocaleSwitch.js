import { useDispatch } from "react-redux";
import { withProps } from "recompose";
import { changeLocale } from "../actions/locale";

console.warn("withLocaleSwitch has been deprecated");

const withLocaleSwitch = withProps(({ locale }) => {
	const dispatch = useDispatch();
	return {
		onClick: () => dispatch(changeLocale(locale)),
	};
});

export default withLocaleSwitch;
