import React, { useMemo } from "react";
import { useIntl } from "react-intl";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import * as date_fns_locale from "date-fns/locale";
import { findCorrespondingLocale } from "../utils/localizationHelper";
import useDaysAndMonthsLocalization from "../hooks/useDaysAndMonthsLocalization";

export let customFnsLocale = null;

const Culture = () => {
	const { locale } = useIntl();
	const daysAndMonthsLocalization = useDaysAndMonthsLocalization();

	useMemo(() => {
		const fnsLocale = findCorrespondingLocale(date_fns_locale, locale);

		if (fnsLocale != null) {
			customFnsLocale = {
				...fnsLocale,
				localize: {
					...fnsLocale.localize,
					day: n => daysAndMonthsLocalization.weekdaysMin[n],
					month: n => daysAndMonthsLocalization.months[n],
				},
			};

			registerLocale(locale, customFnsLocale);
			setDefaultLocale(locale);
		}
	}, [locale, daysAndMonthsLocalization]);

	return <React.Fragment />;
};

export default Culture;
