import React from "react";
import { useIntl } from "react-intl";
import sharedMessages from "../sharedMessages";

const useDaysAndMonthsLocalization = () => {
	const { formatMessage } = useIntl();

	return React.useMemo(() => {
		const weekdays = [
			formatMessage(sharedMessages.sunday),
			formatMessage(sharedMessages.monday),
			formatMessage(sharedMessages.tuesday),
			formatMessage(sharedMessages.wednesday),
			formatMessage(sharedMessages.thursday),
			formatMessage(sharedMessages.friday),
			formatMessage(sharedMessages.saturday),
		];

		const weekdaysShort = [
			formatMessage(sharedMessages.sundayShort),
			formatMessage(sharedMessages.mondayShort),
			formatMessage(sharedMessages.tuesdayShort),
			formatMessage(sharedMessages.wednesdayShort),
			formatMessage(sharedMessages.thursdayShort),
			formatMessage(sharedMessages.fridayShort),
			formatMessage(sharedMessages.saturdayShort),
		];

		const weekdaysMin = [
			formatMessage(sharedMessages.sundayMin),
			formatMessage(sharedMessages.mondayMin),
			formatMessage(sharedMessages.tuesdayMin),
			formatMessage(sharedMessages.wednesdayMin),
			formatMessage(sharedMessages.thursdayMin),
			formatMessage(sharedMessages.fridayMin),
			formatMessage(sharedMessages.saturdayMin),
		];

		const months = [
			formatMessage(sharedMessages.january),
			formatMessage(sharedMessages.february),
			formatMessage(sharedMessages.march),
			formatMessage(sharedMessages.april),
			formatMessage(sharedMessages.may),
			formatMessage(sharedMessages.june),
			formatMessage(sharedMessages.july),
			formatMessage(sharedMessages.august),
			formatMessage(sharedMessages.september),
			formatMessage(sharedMessages.october),
			formatMessage(sharedMessages.november),
			formatMessage(sharedMessages.december),
		];

		const monthsShort = [
			formatMessage(sharedMessages.januaryShort),
			formatMessage(sharedMessages.februaryShort),
			formatMessage(sharedMessages.marchShort),
			formatMessage(sharedMessages.aprilShort),
			formatMessage(sharedMessages.mayShort),
			formatMessage(sharedMessages.juneShort),
			formatMessage(sharedMessages.julyShort),
			formatMessage(sharedMessages.augustShort),
			formatMessage(sharedMessages.septemberShort),
			formatMessage(sharedMessages.octoberShort),
			formatMessage(sharedMessages.novemberShort),
			formatMessage(sharedMessages.decemberShort),
		];

		return {
			weekdays,
			weekdaysShort,
			weekdaysMin,
			months,
			monthsShort,
		};
	}, [formatMessage]);
};

export default useDaysAndMonthsLocalization;
