import Immutable from "immutable";
import { CHANGE_LOCALE } from "../actions/locale";

const localeFactory = supportedLocales => {
	const initialState = Immutable.fromJS({
		locale: supportedLocales[0],
		supportedLocales,
	});

	const locale = (state = initialState, action) => {
		switch (action.type) {
			case CHANGE_LOCALE:
				if (supportedLocales.indexOf(action.payload) !== -1) {
					return state.set("locale", action.payload);
				} else {
					return state;
				}
			default:
				return state;
		}
	};
	return locale;
};

export default localeFactory;
