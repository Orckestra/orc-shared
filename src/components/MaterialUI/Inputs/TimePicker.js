import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
	timeWrapper: {
		margin: "auto",
	},
	timeZoneWrapper: {
		marginLeft: theme.spacing(0.5),
		fontFamily: theme.fontFamily,
		fontSize: theme.fontSize,
	},
	timePickerWrapper: {
		display: "flex",
		flexWrap: "wrap",
		width: "100%",
		alignItems: "center",
	},
	timePickerSegmentWrapper: {
		fontFamily: theme.fontFamily,
		fontSize: theme.fontSize,
		color: "#333333",
		marginLeft: theme.spacing(0.5),
		marginRight: theme.spacing(0.5),
		padding: theme.spacing(0.5, 1.5, 0.5, 1),
		borderRadius: theme.shape.borderRadius,
		"&:first-child": {
			marginLeft: 0,
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

const parseTime = timeStr => {
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

const TimePicker = ({ value, onChange, showTimeZone, showAMPM, timeZone }) => {
	const classes = useStyles();
	showAMPM = showAMPM ?? isBrowserUsingAMPM();
	const [time, setTime] = useState(parseTime(value || "00:00"));
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

	const updateTimeOptions = id => event => {
		const value = event?.target?.value;
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

	const getTimeZone = timeZone => {
		if (timeZone) {
			return timeZone;
		} else {
			const localTimezone = new Date().toString().match(/GMT(\S+) \(([^)]+)\)/i);
			const defaultTimezone = `${localTimezone[2]} (GMT${localTimezone[1]}`;
			return defaultTimezone;
		}
	};

	const properHourOptions = showAMPM ? hourOptionsAMPM : hourOptions;
	const AMPMSelect = ({ showAMPM }) => {
		if (!showAMPM) return null;

		return (
			<select
				className={classes.timePickerSegmentWrapper}
				name="ampm"
				id="ampm"
				onChange={updateTimeOptions("ampm")}
				value={calculateAMPM(time)}
			>
				{ampmOptions.map(option => (
					<option key={"ampm" + option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
		);
	};

	return (
		<div className={classes.timeWrapper}>
			<span className={classes.timePickerWrapper}>
				<select
					className={classes.timePickerSegmentWrapper}
					name="hours"
					id="hours"
					onChange={updateTimeOptions("hours")}
					value={calculateHours(time, showAMPM)}
				>
					{properHourOptions.map(option => (
						<option key={"hour" + option.value} value={option.value}>
							{option.label}
						</option>
					))}
				</select>
				<label> : </label>
				<select
					className={classes.timePickerSegmentWrapper}
					name="mins"
					id="mins"
					onChange={updateTimeOptions("mins")}
					value={calculateMins(time)}
				>
					{minOptions.map(option => (
						<option key={"min" + option.value} value={option.value}>
							{option.label}
						</option>
					))}
				</select>
				<AMPMSelect showAMPM={showAMPM} />
			</span>
			{showTimeZone && <br />}
			{showTimeZone && <label className={classes.timeZoneWrapper}>{showTimeZone && getTimeZone(timeZone)}</label>}
		</div>
	);
};

export default TimePicker;
