import React from "react";
import DatePicker from "../../MaterialUI/Inputs/DatePicker";

// Component is replaced with DatePicker
console.warn("Date has been deprecated. Use DatePicker from MaterialUI.");

export const DateInput = ({ update, value, ...props }) => {
	return <DatePicker {...props} value={value} onChange={update} useTime={false} />;
};
