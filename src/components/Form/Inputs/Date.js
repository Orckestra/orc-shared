import React from "react";
import styled, { css } from "styled-components";
import { getDate, getDay, isSameMonth, isToday, format } from "date-fns";
import { FormattedDate } from "react-intl";
import Kalendaryo from "kalendaryo";
import { getThemeProp, ifFlag } from "../../../utils";
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
		<FormInput
			type="date"
			onChange={getEventUpdater(update)}
			{...props}
			value={value}
		/>
		<Kalendaryo
			open={open}
			render={CalendarDropdown}
			startSelectedDateAt={new Date(value)}
			startCurrentDateAt={new Date(value)}
			onSelectedChange={date => {
				update(format(date, "YYYY-MM-DD"));
				reset();
			}}
		/>
		<CalendarButton onClick={toggle}>
			<CalendarIcon />
		</CalendarButton>
	</PositionedWrapper>
);

export const DateInput = withToggle("open")(CrudeDateInput);
