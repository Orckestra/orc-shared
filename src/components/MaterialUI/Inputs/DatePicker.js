import React from "react";
import classNames from "classnames";
import Icon from "../DataDisplay/Icon";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "./TimePicker";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
	container: {
		display: "flex",
		flexDirection: "column",
	},
	datePickerWrapper: {
		display: "flex",
		width: "auto",
		padding: props => (props.readOnly ? "0" : theme.spacing(0.3, 0.5)),
		border: props => (props.readOnly ? "none" : `1px solid ${theme.palette.grey.borders}`),
		borderRadius: theme.shape.borderRadius,
		alignItems: "center",
		backgroundColor: props => (props.readOnly ? "inherit" : theme.palette.background.default),
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
			"& .react-datepicker-time__input-container .react-datepicker-time__input": {
				margin: 0,
				padding: theme.spacing(1),
			},
		},
		"& .react-datepicker-popper": {
			zIndex: 100,
			width: theme.spacing(26),
		},
		"& .react-datepicker__input-container input": {
			fontSize: theme.typography.fontSize,
			color: theme.palette.grey.dark,
			fontFamily: theme.typography.fontFamily,
			width: "inherit",
			border: "none",
			zIndex: 100,
			backgroundColor: "inherit",
			"&:focus": {
				outline: "none",
			},
		},
		"& .react-datepicker__month-container": {
			float: "none",
		},
		"& .react-datepicker__input-time-container .react-datepicker-time__input-container .react-datepicker-time__input": {
			display: "block",
		},
		"& .react-datepicker-time__caption": {
			display: "block",
		},
		"& .react-datepicker__input-time-container .react-datepicker-time__input-container": {
			display: "block",
		},
		"& .react-datepicker__day.disabledDay": {
			color: theme.palette.grey.borders,
			pointerEvents: "none",
		},
		"& .react-datepicker__day.alreadySelectedDay": {
			backgroundColor: theme.palette.background.selectedDate,
			color: theme.palette.primary.contrastText,
			borderRadius: "0.3rem",
			pointerEvents: "none",
			opacity: 0.4,
		},
	},
	disabled: {
		border: `1px solid ${theme.palette.grey.light} !important`,
		backgroundColor: `${theme.palette.grey.light} !important`,
	},
	calendarIcon: {
		fontSize: theme.fontSize,
	},
	datePickerContainer: {
		width: "80%",
	},
	iconContainer: {
		width: "20%",
		display: "flex",
		justifyContent: "flex-end",
	},
	errorInput: {
		border: `${theme.spacing(0.1)} solid ${theme.palette.error.main} !important`,
		"&:focus, &:focus-within": {
			border: `${theme.spacing(0.1)} solid ${theme.palette.error.main} !important`,
			boxShadow: `${theme.spacing(0, 0, 0.4)} ${theme.palette.error.main} !important`,
		},
	},
	errorText: {
		marginTop: theme.spacing(0.5),
		color: theme.palette.error.main,
		fontSize: theme.typography.fieldLabelSize,
		float: "left",
	},
}));

export const createFormat = (useDate, useTime) => {
	if (useDate && !useTime) {
		return "P";
	} else if (useTime && !useDate) {
		return "p";
	} else {
		return "P p";
	}
};

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
	metadata,
	timePickerTimeZone,
	error,
	...props
}) => {
	const classes = useStyles({ readOnly });
	const startDate = value ? new Date(value) : null;
	const disabledCls = classNames({ [classes.disabled]: props.disabled });

	const updateDate = (date, metadata) => {
		if (onChange) {
			onChange(date, metadata);
		}
	};

	return (
		<div className={classes.container}>
			<label className={classNames(classes.datePickerWrapper, disabledCls, error ? classes.errorInput : null)}>
				<div className={classes.datePickerContainer}>
					<DatePicker
						{...props}
						dateFormat={dateFormat || createFormat(useDate, useTime)}
						selected={startDate}
						onChange={date => updateDate(date, metadata)}
						showTimeInput={useTime ?? false}
						useTime={useTime ?? false}
						customTimeInput={
							useTime ? <TimePicker showTimeZone={showTimeZone} requestedTimeZone={timePickerTimeZone} /> : null
						}
						timeInputLabel={timeInputLabel ?? ""}
						readOnly={readOnly}
						showTimeSelectOnly={showTimeSelectOnly}
					/>
				</div>
				{!readOnly ? (
					<div className={classes.iconContainer}>
						<Icon className={classes.calendarIcon} id={showTimeSelectOnly ? "clock" : "calendar-date"} />
					</div>
				) : null}
			</label>
			{error && <div className={classes.errorText}>{error}</div>}
		</div>
	);
};

export default WrappedDatePicker;
