import React, { useState, useEffect } from "react";
import makeStyles from "@mui/styles/makeStyles";
import Select from "./Select";
import SelectProps from "./SelectProps";
import { getTimeZoneName } from "../../../utils/timezoneHelper";
import { namedLookupLocalizedSelector } from "../../../selectors/metadata";
import { useSelector } from "react-redux";

const useStyles = makeStyles(theme => ({
	timeWrapper: {
		margin: "auto",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		textAlign: "center",
	},
	timeZoneWrapper: {
		marginLeft: theme.spacing(0.5),
		fontFamily: theme.fontFamily,
		fontSize: theme.fontSize,
	},
	timePickerWrapper: {
		display: "flex",
		flexWrap: "wrap",
		alignItems: "center",
		paddingBottom: theme.spacing(2),
	},
	timePickerSegmentWrapper: {
		fontFamily: theme.fontFamily,
		fontSize: theme.fontSize,
		color: "#333333",
		marginLeft: theme.spacing(0.5),
		marginRight: theme.spacing(0.5),
		borderRadius: theme.shape.borderRadius,
		"&:first-of-type": {
			marginLeft: 0,
		},
		"& .MuiInputBase-root": {
			"& .MuiSelect-select": {
				minWidth: theme.spacing(3),
			},
		},
	},
}));

const hourOptionsAMPM = [];
for (var i = 1; i <= 12; i++) {
	hourOptionsAMPM.push({ value: i, label: i });
}

const hourOptions = [];
for (var j = 0; j <= 23; j++) {
	hourOptions.push({ value: j, label: j });
}

const minOptions = [
	{ value: "00", label: "00" },
	{ value: "15", label: "15" },
	{ value: "30", label: "30" },
	{ value: "45", label: "45" },
];

const ampmOptions = [
	{ value: "AM", label: "AM" },
	{ value: "PM", label: "PM" },
];

const isBrowserUsingAMPM = () =>
	!!new Date(Date.UTC(2020, 7, 30, 3, 0, 0)).toLocaleTimeString().match(/am|a.m|pm|p.m/i);

export const parseTime = timeStr => {
	var time = timeStr.match(/(\d+)(?::(\d\d))?\s*(p?)/i);
	if (!time) {
		return new Date();
	}

	var hours = parseInt(time[1]);
	if (time[3] === "p" && hours < 12) {
		hours += 12;
	}
	return new Date(0, 0, 0, hours, parseInt(time[2]) || 0, 0);
};

const leftFillNum = (num, targetLength) => num.toString().padStart(targetLength, 0);

const isAM = time => time.getHours() < 12;

const calculateHours = (time, showAMPM) => {
	if (!showAMPM) return time.getHours();

	return time.getHours() === 0 || time.getHours() === 12 ? 12 : time.getHours() % 12;
};

const calculateMins = time => {
	return time.getMinutes() >= 45 ? "45" : time.getMinutes() >= 30 ? "30" : time.getMinutes() >= 15 ? "15" : "00";
};

const calculateAMPM = time => (isAM(time) ? "AM" : "PM");

export const AMPMSelect = ({ showAMPM, updateTimeOptions, time }) => {
	const classes = useStyles();
	if (!showAMPM) return null;

	const selectProps = new SelectProps();

	selectProps.set(SelectProps.propNames.update, updateTimeOptions("ampm"));
	selectProps.set(SelectProps.propNames.value, calculateAMPM(time));
	selectProps.set(SelectProps.propNames.native, true);
	selectProps.set(SelectProps.propNames.inputProps, {
		name: "ampm",
		id: "ampm",
	});

	return (
		<div className={classes.timePickerSegmentWrapper}>
			<Select selectProps={selectProps}>
				{ampmOptions.map(option => (
					<option key={"ampm" + option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</Select>
		</div>
	);
};

export const HoursSelect = ({ updateTimeOptions, time, showAMPM }) => {
	const classes = useStyles();
	const selectProps = new SelectProps();
	const properHourOptions = showAMPM ? hourOptionsAMPM : hourOptions;

	selectProps.set(SelectProps.propNames.update, updateTimeOptions("hours"));
	selectProps.set(SelectProps.propNames.value, calculateHours(time, showAMPM));
	selectProps.set(SelectProps.propNames.native, true);
	selectProps.set(SelectProps.propNames.inputProps, {
		name: "hours",
		id: "hours",
	});

	return (
		<div className={classes.timePickerSegmentWrapper}>
			<Select selectProps={selectProps}>
				{properHourOptions.map(option => (
					<option key={"hour" + option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</Select>
		</div>
	);
};

export const MinsSelect = ({ updateTimeOptions, time }) => {
	const classes = useStyles();
	const selectProps = new SelectProps();

	selectProps.set(SelectProps.propNames.update, updateTimeOptions("mins"));
	selectProps.set(SelectProps.propNames.value, calculateMins(time));
	selectProps.set(SelectProps.propNames.native, true);
	selectProps.set(SelectProps.propNames.inputProps, {
		name: "mins",
		id: "mins",
	});

	return (
		<div className={classes.timePickerSegmentWrapper}>
			<Select selectProps={selectProps}>
				{minOptions.map(option => (
					<option key={"min" + option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</Select>
		</div>
	);
};

const TimePicker = ({ value, onChange, showTimeZone, showAMPM, requestedTimeZone }) => {
	const classes = useStyles();
	showAMPM = showAMPM ?? isBrowserUsingAMPM();
	const [time, setTime] = useState(parseTime(value || "00:00"));

	useEffect(() => {
		setTime(parseTime(value || "00:00"));
	}, [value, setTime]);

	const userTimeZone = getTimeZoneName();
	const localizedTimeZoneName = useSelector(namedLookupLocalizedSelector("customer", "TimeZone", userTimeZone, null));

	const onTimeChange = datetime => {
		if (onChange) {
			// DatePicker expects 24 hour time format, or else things go wonky!
			const time = `${leftFillNum(datetime.getHours(), 2)}:${leftFillNum(datetime.getMinutes(), 2)}`;
			onChange(time);
		}
	};

	const setHours = (hours, isAMTime) => {
		if (!showAMPM) {
			time.setHours(hours);
		} else if (parseInt(hours) === 12) {
			time.setHours(isAMTime ? 0 : 12);
		} else {
			time.setHours(parseInt(hours) + parseInt(isAMTime ? 0 : 12));
		}
	};

	const updateTimeOptions = id => newValue => {
		const value = newValue;
		if (id === "hours") {
			setHours(value, isAM(time));
		} else if (id === "ampm") {
			setHours(calculateHours(time, showAMPM), value === "AM");
		} else {
			time.setMinutes(parseInt(value));
		}
		setTime(time);
		onTimeChange(time);
	};

	const getTimeZone = requestedTimeZone => {
		if (requestedTimeZone) return requestedTimeZone;
		if (!localizedTimeZoneName) {
			var timezone = new Date().toString().match(/GMT(\S+) \(([^)]+)\)/i);
			return `${timezone[2]} (GMT${timezone[1]})`;
		}
		return localizedTimeZoneName;
	};

	return (
		<div className={classes.timeWrapper}>
			<span className={classes.timePickerWrapper}>
				<HoursSelect updateTimeOptions={updateTimeOptions} time={time} showAMPM={showAMPM} />
				<label> : </label>
				<MinsSelect updateTimeOptions={updateTimeOptions} time={time} />
				<AMPMSelect showAMPM={showAMPM} updateTimeOptions={updateTimeOptions} time={time} />
			</span>
			{showTimeZone && (
				<label className={classes.timeZoneWrapper}>{showTimeZone && getTimeZone(requestedTimeZone)}</label>
			)}
		</div>
	);
};

export default TimePicker;
