import React from "react";
import classNames from "classnames";
import Icon from "../../Icon";
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
		},
		"& .react-datepicker-popper": {
			zIndex: 100,
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
	errorText: {
		marginTop: theme.spacing(0.5),
		color: theme.palette.error.main,
		fontSize: theme.typography.fieldLabelSize,
		float: "left",
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
	error,
	...props
}) => {
	const classes = useStyles({ readOnly });
	const startDate = value ? new Date(value) : null;
	var disabledCls = classNames({ [classes.disabled]: props.disabled });

	const updateDate = date => {
		if (onChange) {
			onChange(date);
		}
	};

	return (
		<div className={classes.container}>
			<label className={classNames(classes.datePickerWrapper, disabledCls)}>
				<div className={classes.datePickerContainer}>
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
