import React from "react";
import styled, { css } from "styled-components";
import { getDate, getDay, isSameMonth, isToday, format, parse } from "date-fns";
import { FormattedDate, injectIntl } from "react-intl";
import Kalendaryo from "kalendaryo";
import { getThemeProp, ifFlag, switchEnum, memoize } from "../../../utils";
import withClickOutside from "../../../hocs/withClickOutside";
import withToggle from "../../../hocs/withToggle";
import Icon from "../../Icon";
import { FormInput, getEventUpdater } from "./Text";
import { ButtonWrapper, InputButton } from "./FieldButtons";

// TODO: Calendar dialog on focus, prevent default behavior in Edge, Firefox

export const PositionedWrapper = withClickOutside(styled(ButtonWrapper)`
	position: relative;
`);

export const CalendarBox = styled.div`
	box-sizing: border-box;
	height: auto;
	width: 70%;
	position: absolute;
	top: 30px;
	right: 3px;
	border: 1px solid #cccccc;
	padding: 8px 15px 15px;
	background-color: white;
	z-index: 100;
	transition: visibility 0.2s, opacity 0.2s;

	${ifFlag(
		"open",
		"visibility: visibile; opacity: 1;",
		"visibility: hidden; opacity: 0;",
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

const MonthArrow = styled(Icon).attrs({ role: "button" })`
	flex: 0 0 30px;
	font-size: 10px;
	cursor: pointer;
`;

export const LastArrow = styled(MonthArrow).attrs({
	id: getThemeProp(["icons", "right"], "navigation-before-1"),
	"aria-label": "last month",
})``;
export const NextArrow = styled(MonthArrow).attrs({
	id: getThemeProp(["icons", "left"], "navigation-next-1"),
	"aria-label": "next month",
})``;

export const DateTable = styled.table`
	border-collapse: collapse;
`;

export const DayCell = styled.td.attrs({ role: "button" })`
	height: 30px;
	width: 30px;
	margin: 0;
	padding: 0;
	text-align: center;
	cursor: pointer;

	${ifFlag("today", "font-weight: bold;")}
	${ifFlag(
		"outsideMonth",
		"background-color: white; color: #cccccc;",
		ifFlag(
			"selected",
			css`
				background-color: ${getThemeProp(["appHighlightColor"], "#cccccc")};
				border-radius: 3px;
			`,
			"background-color: #efefef;",
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
	setDate,
	pickDate,
}) => {
	const getClickHandler = getClickHandlerGetter(pickDate);
	const weeksInCurrentMonth = getWeeksInMonth();
	return (
		<CalendarBox open={open}>
			<CalendarHeader>
				<LastArrow onClick={setDatePrevMonth} />
				<MonthName>
					<FormattedDate value={date} month="long" />
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

export const CalendarIcon = styled(Icon).attrs({
	id: getThemeProp(["icons", "date"], "calendar"),
})`
	font-size: 20px;
`;

export const CalendarButton = styled(InputButton)`
	min-width: 36px;
	padding: 4px 7px;
	border-left-color: transparent;
	background-color: #fff;
`;

export let DateInputField, getDateUpdater, LiteralInput, DatePartInput;
/* istanbul ignore else */
if (Intl.DateTimeFormat.prototype.formatToParts) {
	const getFormatter = memoize(locale =>
		Intl.DateTimeFormat(locale, {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
		}),
	);

	LiteralInput = styled(FormInput).attrs({
		tabIndex: -1,
		type: "text",
		readOnly: true,
	})`
		flex: 0 0 auto;
		min-width: 0;
		width: 1em;
		padding-left: 0.2em;
		padding-right: 0.2em;
		text-align: center;

		&:focus {
			box-shadow: none;
			border-color: #333;
		}
		&:last-of-type {
			flex-grow: 1;
		}
	`;

	DatePartInput = styled(FormInput).attrs({
		onFocus: /* istanbul ignore next */ () => event => event.target.select(),
		type: "number",
	})`
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

	let getDateUpdater = (update, part, value) => {
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
			update(format(parse(prefix + value + suffix), "YYYY-MM-DD"));
		};
	};

	DateInputField = injectIntl(({ value, intl, update, ...props }) => {
		const formatter = getFormatter(intl.locale);
		const parts = formatter.formatToParts(parse(value));
		return (
			<React.Fragment>
				{parts.map(({ type, value: partValue }, index) =>
					type === "literal" ? (
						<LiteralInput key={index} value={partValue} />
					) : (
						<DatePartInput
							key={index}
							{...props}
							value={partValue}
							part={type}
							onChange={getDateUpdater(update, type, value)}
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

export const CrudeDateInput = ({
	update,
	toggle,
	reset,
	open,
	required,
	value,
	...props
}) => (
	<PositionedWrapper onClickOutside={reset} invalid={required && !value}>
		<DateInputField update={update} {...props} value={value} />
		<Kalendaryo
			open={open}
			render={CalendarDropdown}
			startSelectedDateAt={parse(value)}
			startCurrentDateAt={parse(value)}
			onSelectedChange={date => {
				update(format(date, "YYYY-MM-DD"));
				reset();
			}}
		/>
		<CalendarButton onClick={toggle} active={open}>
			<CalendarIcon />
		</CalendarButton>
	</PositionedWrapper>
);

export const DateInput = withToggle("open")(CrudeDateInput);
