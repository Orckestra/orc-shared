import { addLocaleData } from "react-intl";

const addLocales = (...locales) => {
	locales.forEach(locale => {
		const localeData = require("react-intl/locale-data/" + locale);
		addLocaleData(localeData);
	});
};

export default addLocales;
