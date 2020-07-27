import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { getThemeProp } from "../../../../utils";

const TimeWrapper = styled.div`
	margin: auto;
`;

const TimeZoneWrapper = styled.label`
	margin-left: 5px;
	font-family: ${getThemeProp(["fonts", "base"], "sans-serif")};
	font-size: 12px;
`;

const TimePickerWrapper = styled.span`
	display: flex;
	flex-wrap: wrap;
	width: 100%;
`;

const TimePickerSegmentWrapper = styled.select`
	font-family: ${getThemeProp(["fonts", "base"], "sans-serif")};
	font-size: 12px;
	color: #333333;
	margin-left: 0.5em;
	margin-right: 3px;
`;

const hourOptions = [];
for (var i = 1; i <= 12; i++) {
	hourOptions.push({ value: i, label: i });
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

const parseTime = timeStr => {
	var time = timeStr.match(/(\d+)(?::(\d\d))?\s*(p?)/i);
	if (!time) {
		return new Date();
	}

	let dt = new Date();
	var hours = parseInt(time[1], 10);
	if (time[3] === "p" && hours < 12) {
		hours += 12;
	}
	dt.setHours(hours);
	dt.setMinutes(parseInt(time[2], 10) || 0);
	dt.setSeconds(0, 0);
	return dt;
};

const leftFillNum = (num, targetLength) => num.toString().padStart(targetLength, 0);
const isAM = time => time.getHours() < 12;
const calculateHours = time => (time.getHours() === 0 || time.getHours() === 12 ? 12 : time.getHours() % 12);
const calculateMins = time =>
	time.getMinutes() >= 45 ? "45" : time.getMinutes() >= 30 ? "30" : time.getMinutes() >= 15 ? "15" : "00";
const calculateAMPM = time => (isAM(time) ? "AM" : "PM");

const TimePicker = ({ value, onChange, showTimeZone }) => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const [time, setTime] = useState(parseTime(value || "00:00"));

	const onTimeChange = useCallback(
		datetime => {
			if (onChange) {
				// DatePicker expects military time format, or else things go wonky!
				const time = `${leftFillNum(datetime.getHours(), 2)}:${leftFillNum(datetime.getMinutes(), 2)}`;
				onChange(time);
			}
		},
		[onChange],
	);

	const setHours = useCallback(
		(hours, isAMTime) => {
			if (isAMTime && hours === 12) {
				time.setHours(0);
			} else if (!isAMTime && hours === 12) {
				time.setHours(12);
			} else {
				time.setHours(hours + (isAMTime ? 0 : 12));
			}
			setTime(time);
			onTimeChange(time);
		},
		[time, setTime, onTimeChange],
	);

	const updateHours = useCallback(
		e => {
			setHours(parseInt(e?.target?.value || e), isAM(time));
		},
		[setHours, time],
	);

	const getTimeZone = () => {
		var timezone = new Date().toString().match(/GMT(\S+) \(([^)]+)\)/i);
		return `${timezone[2]} (GMT${timezone[1]})`;
	};

	const updateMins = useCallback(
		e => {
			const value = e.target.value;
			if (value === "45") {
				time.setMinutes(45);
			} else if (value === "30") {
				time.setMinutes(30);
			} else if (value === "15") {
				time.setMinutes(15);
			} else {
				time.setMinutes(0);
			}
			setTime(time);
			onTimeChange(time);
		},
		[onTimeChange, setTime, time],
	);

	const updateAMPM = useCallback(
		e => {
			setHours(calculateHours(time), e.target.value === "AM");
		},
		[setHours, time],
	);

	return (
		<TimeWrapper>
			<TimePickerWrapper>
				<TimePickerSegmentWrapper name="hours" id="hours" onChange={updateHours} value={calculateHours(time)}>
					{hourOptions.map(option => (
						<option key={"hour" + option.value} value={option.value}>
							{option.label}
						</option>
					))}
				</TimePickerSegmentWrapper>{" "}
				:
				<TimePickerSegmentWrapper name="mins" id="mins" onChange={updateMins} value={calculateMins(time)}>
					{minOptions.map(option => (
						<option key={"min" + option.value} value={option.value}>
							{option.label}
						</option>
					))}
				</TimePickerSegmentWrapper>
				<TimePickerSegmentWrapper name="ampm" id="ampm" onChange={updateAMPM} value={calculateAMPM(time)}>
					{ampmOptions.map(option => (
						<option key={"ampm" + option.value} value={option.value}>
							{option.label}
						</option>
					))}
				</TimePickerSegmentWrapper>
			</TimePickerWrapper>
			{showTimeZone && <br />}
			{showTimeZone && <TimeZoneWrapper>{showTimeZone && getTimeZone()}</TimeZoneWrapper>}
		</TimeWrapper>
	);
};

export default TimePicker;
