import React, { useState } from "react";
import Icon from "../../Icon";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "./TimePicker";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(theme => ({
	datePickerWrapper: {
		display: "flex",
		width: "auto",
		padding: theme.spacing(0.3, 0.5),
		border: props => (props.readOnly ? "none" : `1px solid ${theme.palette.grey.borders}`),
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
		"& .react-datepicker__input-time-container": {
			margin: theme.spacing(0.5, 0, 1, 0),
		},
		"& .react-datepicker-popper": {
			zIndex: 100,
		},
		"& .react-datepicker__input-container input": {
			border: "none",
			zIndex: 100,
			backgroundColor: "inherit",
			"&:focus": {
				outline: "none",
			},
		},
	},
	calendarIcon: {
		fontSize: theme.fontSize,
	},
}));

const WrappedDatePicker = ({
	value,
	useTime,
	useDate = true,
	onChange,
	dateFormat,
	showTimeZone,
	timeInputLabel,
	readOnly,
	showTimeSelectOnly,
	...props
}) => {
	const classes = useStyles({ readOnly });
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
			<Grid container item xs={10}>
				<DatePicker
					{...props}
					dateFormat={dateFormat || (useDate && useTime ? "P p" : !useDate && useTime ? "p" : "P")}
					selected={startDate}
					onChange={date => updateDate(date)}
					showTimeInput={useTime ?? false}
					useTime={useTime ?? false}
					customTimeInput={useTime ? <TimePicker showTimeZone={showTimeZone} /> : null}
					timeInputLabel={timeInputLabel ?? ""}
					readOnly={readOnly}
					showTimeSelectOnly={showTimeSelectOnly}
				/>
			</Grid>
			{!readOnly ? (
				<Grid container item xs={2} justify="flex-end">
					<Icon className={classes.calendarIcon} id="calendar-date" />
				</Grid>
			) : null}
		</label>
	);
};

export default WrappedDatePicker;
