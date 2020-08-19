import React from "react";
import DatePicker from "../../MaterialUI/Inputs/DatePicker";

// Component is replaced with DatePicker

export const DateInput = ({ update, value, ...props }) => {
	return <DatePicker {...props} value={value} onChange={update} useTime={false} />;
};
