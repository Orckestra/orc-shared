import Immutable from "immutable";
import { CHANGE_LOCALE, GET_CULTURES_SUCCESS } from "../actions/locale";

export const cultureByDefault = "en-US";

const localeFactory = supportedLocales => {
	const defaultCulture = (supportedLocales[0] && supportedLocales[0].cultureIso) || cultureByDefault;

	const initialState = Immutable.fromJS({
		locale: null,
		supportedLocales,
		cultures: {},
		defaultCulture: defaultCulture,
	});

	const locale = (state = initialState, action) => {
		switch (action.type) {
			case CHANGE_LOCALE:
				const supportedLocale =
					(action.payload?.length >= 2 &&
						supportedLocales.find(l => l.cultureIso.startsWith(action.payload.substring(0, 2)))) ||
					null;
				if (supportedLocale != null) {
					return state.set("locale", supportedLocale.cultureIso);
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
