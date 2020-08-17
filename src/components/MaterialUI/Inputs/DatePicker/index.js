import React, { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { getThemeProp } from "../../../../utils";
import Icon from "../../../../components/Icon";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "./TimePicker";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
	datePickerWrapper: {
		display: "flex",
		flexWrap: "wrap",
		width: "auto",
		paddingLeft: "5px",
	},
}));

const CalendarIcon = styled(Icon).attrs(props => ({
	id: getThemeProp(["icons", "date"], "calendar")(props),
}))`
	font-size: 20px;
	padding: 3px 3px 3px 3px;
`;

const DatePickerStyle = createGlobalStyle`
    .react-datepicker {
        font-family: ${getThemeProp(["fonts", "base"], "sans-serif")};
    }

    .react-datepicker-popper {
        z-index: 100;
    }

    .react-datepicker__input-container input {
        width: 135px;
        border: 1px solid ${getThemeProp(["colors", "borderLight"], "#cccccc")};
        z-index: 100;
    }
`;

const WrappedDatePicker = ({ value, useTime, onChange, dateFormat, showTimeZone, timeInputLabel, ...props }) => {
	const classes = useStyles();
	const parsedValue = new Date(value || "1970/01/01");
	const [startDate, setStartDate] = useState(parsedValue);

	const updateDate = date => {
		if (onChange) {
			onChange(date);
		}
		setStartDate(date);
	};

	return (
		<label className={classes.datePickerWrapper}>
			<DatePickerStyle />
			<DatePicker
				{...props}
				dateFormat={dateFormat || (useTime ? "P p" : "P")}
				selected={startDate}
				onChange={date => updateDate(date)}
				showTimeInput={useTime ?? false}
				useTime={useTime ?? false}
				customTimeInput={useTime ? <TimePicker showTimeZone={showTimeZone} /> : null}
				timeInputLabel={timeInputLabel ?? ""}
			/>
			<CalendarIcon />
		</label>
	);
};

export default WrappedDatePicker;
