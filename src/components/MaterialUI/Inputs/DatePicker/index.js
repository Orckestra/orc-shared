import React, { useState } from "react";
import { getThemeProp } from "../../../../utils";
import Icon from "../../../../components/Icon";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "./TimePicker";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
	datePickerWrapper: {
		display: "flex",
		width: "auto",
		paddingLeft: theme.spacing(0.5),
		"& .react-datepicker": {
			fontFamily: theme.fontFamily,
		},
		"& .react-datepicker-popper": {
			zIndex: 100,
		},
		"& .react-datepicker__input-container input": {
			width: theme.spacing(13.5),
			border: `1px solid ${getThemeProp(["colors", "borderLight"], "#cccccc")}`,
			zIndex: 100,
		},
	},
	calendarIcon: {
		fontSize: theme.fontSize,
		padding: theme.spacing(0.3, 0.3, 0.3, 0.3),
	},
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
