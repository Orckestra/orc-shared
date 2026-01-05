import React from "react";
import Placeholder from "./MaterialUI/DataDisplay/PredefinedElements/Placeholder";

const ErrorPlaceholder = ({ message, description }) => (
	<Placeholder icon="report-problem-triangle" error title={message} subtitle={description} />
);

export default ErrorPlaceholder;
