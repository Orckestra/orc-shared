import React, { useState } from "react";
import { getThemeProp } from "../../../utils";
import Icon from "../../Icon";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "./TimePicker";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
	datePickerWrapper: {
		display: "flex",
		width: "auto",
		padding: theme.spacing(0.3, 0.5),
		border: `1px solid ${theme.palette.grey.borders}`,
		borderRadius: theme.shape.borderRadius,
		alignItems: "center",
		"&:focus, &:focus-within": {
			borderRadius: theme.shape.borderRadius,
			borderColor: theme.palette.focus,
			boxShadow: `0 0 4px ${theme.palette.focus}`,
			outline: "none",
		},
		"& .react-datepicker": {
			fontFamily: theme.fontFamily,
		},
		"& .react-datepicker-popper": {
			zIndex: 100,
		},
		"& .react-datepicker__input-container input": {
			width: theme.spacing(13.5),
			border: "none",
			zIndex: 100,
			"&:focus": {
				outline: "none"
			}
		},
	},
	calendarIcon: {
		fontSize: theme.fontSize,
	}
}));

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
			<Icon className={classes.calendarIcon} id={getThemeProp(["icons", "calendar"], "date")(props)} />
		</label>
	);
};

export default WrappedDatePicker;
