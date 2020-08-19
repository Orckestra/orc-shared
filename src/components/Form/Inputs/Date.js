import React from "react";
import styled, { css } from "styled-components";
import { getDate, getDay, isSameMonth, isToday, format, parseISO } from "date-fns-2";
import { FormattedDate, injectIntl } from "react-intl";
import Kalendaryo from "kalendaryo";
import { getThemeProp, ifFlag, switchEnum, memoize } from "../../../utils";
import withClickOutside from "../../../hocs/withClickOutside";
import useToggle from "../../../hooks/useToggle";
import Icon from "../../Icon";
import { FormInput, getEventUpdater } from "./Text";
import { ButtonWrapper, InputButton } from "./FieldButtons";

// TODO: Calendar dialog on focus

export const PositionedWrapper = withClickOutside(styled(ButtonWrapper)`
	position: relative;
`);

export const CalendarBox = styled.div`
	box-sizing: border-box;
	height: auto;
	position: absolute;
	top: 30px;
	right: 3px;
	border: 1px solid ${getThemeProp(["colors", "borderLight"], "#cccccc")};
	padding: 8px 15px 15px;
	background-color: white;
	z-index: 100;
	transition: visibility 0.2s, opacity 0.2s;

	${ifFlag(
		"open",
		css`
			visibility: visible;
			opacity: 1;
		`,
		css`
			visibility: hidden;
			opacity: 0;
		`,
	)}
`;

export const CalendarHeader = styled.div`
	display: flex;
	height: 40px;
	align-items: center;
`;

export const MonthName = styled.div`
	flex: 1 1 auto;
	text-align: center;
`;

const MonthArrow = styled(Icon).attrs(() => ({ role: "button" }))`
	flex: 0 0 30px;
	font-size: 10px;
	cursor: pointer;
`;

export const LastArrow = styled(MonthArrow).attrs(props => ({
	id: getThemeProp(["icons", "prev"], "previous")(props),
	"aria-label": "last month",
	"data-test-id": "calendar_lastArrow",
}))``;
export const NextArrow = styled(MonthArrow).attrs(props => ({
	id: getThemeProp(["icons", "next"], "next")(props),
	"aria-label": "next month",
	"data-test-id": "calendar_nextArrow",
}))``;

export const DateTable = styled.table`
	border-collapse: collapse;
`;

export const DayCell = styled.td.attrs(() => ({ role: "button" }))`
	height: 30px;
	width: 30px;
	margin: 0;
	padding: 0;
	text-align: center;
	cursor: pointer;

	${ifFlag("today", "font-weight: bold;")}
	${ifFlag(
		"outsideMonth",
		css`
			background-color: white;
			color: ${getThemeProp(["colors", "borderLight"], "#cccccc")};
		`,
		ifFlag(
			"selected",
			css`
				background-color: ${getThemeProp(["colors", "application", "base"], "#cccccc")};
				border-radius: 3px;
			`,
			css`
				background-color: ${getThemeProp(["colors", "bgLight"], "#efefef")};
			`,
		),
	)}
`;

export const Day = ({
	date,
	selectedDate,
	thisDate,
	getClickHandler,
	getFormattedDate,
}) => (
	<DayCell
		onClick={getClickHandler(thisDate)}
		outsideMonth={!isSameMonth(date, thisDate)}
		today={isToday(thisDate)}
		selected={getFormattedDate(selectedDate) === getFormattedDate(thisDate)}
		active={getFormattedDate(date) === getFormattedDate(thisDate)}
		data-test-id={getFormattedDate(thisDate)}
	>
		{getDate(thisDate) + ""}
	</DayCell>
);

const getClickHandlerGetter = pickDate => date => () => pickDate(date);

export const CalendarDropdown = ({
	open,
	date,
	selectedDate,
	getWeeksInMonth,
	setDatePrevMonth,
	setDateNextMonth,
	getFormattedDate,
	pickDate,
}) => {
	const getClickHandler = getClickHandlerGetter(pickDate);
	const weeksInCurrentMonth = getWeeksInMonth();
	return (
		<CalendarBox open={open}>
			<CalendarHeader>
				<LastArrow onClick={setDatePrevMonth} />
				<MonthName>
					<FormattedDate value={date} month="long" year="numeric" />
				</MonthName>
				<NextArrow onClick={setDateNextMonth} />
			</CalendarHeader>
			<DateTable>
				<thead>
					<tr>
						{weeksInCurrentMonth[0].map(day => (
							<th key={getDay(day.dateValue)}>
								<FormattedDate value={day.dateValue} weekday="short" />
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{weeksInCurrentMonth.map((week, index) => (
						<tr key={index}>
							{week.map(day => (
								<Day
									key={getFormattedDate(day.dateValue)}
									thisDate={day.dateValue}
									{...{
										date,
										selectedDate,
										getClickHandler,
										getFormattedDate,
									}}
								/>
							))}
						</tr>
					))}
				</tbody>
			</DateTable>
		</CalendarBox>
	);
};

export const CalendarIcon = styled(Icon).attrs(props => ({
	id: getThemeProp(["icons", "date"], "calendar")(props),
}))`
	font-size: 20px;
`;

export const CalendarButton = styled(InputButton)`
	margin-top: -1px;
	margin-right: -1px;
	min-width: 36px;
	padding: 4px 7px;
	border-left-color: transparent;
	background-color: #fff;
`;

export let DateInputField, getDateUpdater, LiteralInput, PartInput;
/* istanbul ignore else */
if (Intl.DateTimeFormat.prototype.formatToParts) {
	const getFormatter = memoize(locale =>
		Intl.DateTimeFormat(locale, {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
		}),
	);

	LiteralInput = styled(FormInput).attrs(() => ({
		tabIndex: -1,
		type: "text",
		readOnly: true,
	}))`
		flex: 0 0 auto;
		min-width: 0;
		width: 1em;
		padding-left: 0.2em;
		padding-right: 0.2em;
		text-align: center;

		&:focus {
			box-shadow: none;
			border-color: ${getThemeProp(["colors", "borderDark"], "#333333")};
		}
		&:last-of-type {
			flex-grow: 1;
		}
	`;

	PartInput = styled(FormInput).attrs(() => ({
		onFocus: /* istanbul ignore next */ () => event => event.target.select(),
		type: "number",
	}))`
		padding-left: 0.2em;
		padding-right: 0.2em;
		min-width: 0;
		width: 1em;
		flex-grow: 0;
		flex-shrink: 0;
		text-align: center;

		&:first-child {
			text-align: right;
		}
		&:last-of-type {
			text-align: left;
		}

		${switchEnum("part", {
			day: css`
				flex-basis: 2em;
			`,
			month: css`
				flex-basis: 2em;
			`,
			year: css`
				flex-basis: 3em;
			`,
		})}
	`;

	getDateUpdater = (update, part, value) => {
		let prefix, suffix, partLength;
		const match = value.match(/^(\d+)-(\d+)-(\d+)$/);
		if (part === "year") {
			prefix = "";
			suffix = "-" + match[2] + "-" + match[3];
			partLength = 4;
		} else if (part === "month") {
			prefix = match[1] + "-";
			suffix = "-" + match[3];
			partLength = 2;
		} else {
			prefix = match[1] + "-" + match[2] + "-";
			suffix = "";
			partLength = 2;
		}
		return event => {
			let eventVal = event.target.value + "";
			const value = eventVal.padStart(partLength, "0").slice(-partLength);
			const newDate = parseISO(prefix + value + suffix /* + " 12:00"*/);
			update(format(newDate, "yyyy-MM-dd"));
		};
	};

	DateInputField = injectIntl(({ value, intl, update, ...props }) => {
		const safeValue = value || "1970-01-01";
		const formatter = getFormatter(intl.locale);
		const parts = formatter.formatToParts(parseISO(safeValue));
		return (
			<React.Fragment>
				{parts.map(({ type, value: partValue }, index) =>
					type === "literal" ? (
						<LiteralInput key={index} value={partValue} />
					) : (
						<PartInput
							key={index}
							{...props}
							value={partValue}
							part={type}
							onChange={getDateUpdater(update, type, safeValue)}
						/>
					),
				)}
				<LiteralInput value="" />
			</React.Fragment>
		);
	});
} else {
	// IE11 does not support any of this
	DateInputField = ({ update, ...props }) => (
		<FormInput {...props} onChange={getEventUpdater(update)} type="text" />
	);
}

export const DateInput = ({ update, initOpen, required, value, ...props }) => {
	const [open, toggle, reset] = useToggle(initOpen);
	const safeValue = value || "1970-01-01";
	const parsedValue = parseISO(safeValue);
	return (
		<PositionedWrapper onClickOutside={reset} invalid={required && !value}>
			<DateInputField update={update} {...props} value={safeValue} />
			<Kalendaryo
				key={open} // Re-render if opened and closed
				open={open}
				render={CalendarDropdown}
				startSelectedDateAt={parsedValue}
				startCurrentDateAt={parsedValue}
				onSelectedChange={
					/* istanbul ignore next */ date => {
						update(format(date, "yyyy-MM-dd"));
						reset();
					}
				}
			/>
			<CalendarButton onClick={toggle} active={open}>
				<CalendarIcon />
			</CalendarButton>
		</PositionedWrapper>
	);
};
