import React from "react";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { currentLocaleOrDefault } from "../selectors/locale";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import * as date_fns_locale from "date-fns/locale";
import { findCorrespondingLocale } from "../utils/localizationHelper";

const Culture = () => {
	const locale = useSelector(currentLocaleOrDefault);
	const language = navigator.language ?? locale;

	useMemo(() => {
		const fnsLocale = findCorrespondingLocale(date_fns_locale, language);

		if (fnsLocale != null) {
			registerLocale(language, fnsLocale);
			setDefaultLocale(language);
		}
	}, [language]);

	return <React.Fragment />;
};

export default Culture;
