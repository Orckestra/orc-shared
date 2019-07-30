import { addLocaleData } from "react-intl";

const addLocales = (...locales) =>
	Promise.all(
		locales.map(locale =>
			import(
				/* webpackChunkName: "localeData" */ `react-intl/locale-data/${locale}`
			).then(localeData => addLocaleData(localeData.default)),
		),
	);

export default addLocales;
