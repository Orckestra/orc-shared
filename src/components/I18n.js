import React from "react";
import { useSelector } from "react-redux";
import { IntlProvider } from "react-intl";
import { currentLocaleOrDefault } from "../selectors/locale";

const I18n = props => {
	const locale = useSelector(currentLocaleOrDefault);
	const messages = require("translations/" + locale + ".json");
	return (
		<IntlProvider
			key={locale} // TODO: Remove this when react-intl suports new React context API
			locale={locale}
			messages={messages}
			{...props}
		/>
	);
};

export default I18n;
