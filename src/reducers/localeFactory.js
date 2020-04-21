import Immutable from "immutable";
import { CHANGE_LOCALE, GET_CULTURES_SUCCESS } from "../actions/locale";

const localeFactory = supportedLocales => {
	const defaultCulture =
		(supportedLocales[0] && supportedLocales[0].cultureIso) || "en-US";

	const initialState = Immutable.fromJS({
		locale: defaultCulture,
		supportedLocales,
		cultures: {},
		defaultCulture: defaultCulture,
	});

	const locale = (state = initialState, action) => {
		switch (action.type) {
			case CHANGE_LOCALE:
				if (supportedLocales.findIndex(l => l.cultureIso === action.payload) !== -1) {
					return state.set("locale", action.payload);
				} else {
					return state;
				}
			case GET_CULTURES_SUCCESS:
				return state.withMutations(s => {
					action.payload.forEach(culture => {
						s.setIn(["cultures", culture.cultureIso], culture);
						if (culture.isDefault) {
							s.set("defaultCulture", culture.cultureIso);
						}
					});
				});
			default:
				return state;
		}
	};
	return locale;
};

export default localeFactory;
