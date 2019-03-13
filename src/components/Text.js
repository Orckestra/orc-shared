import React from "react";
import { FormattedMessage } from "react-intl";
import withErrorBoundary from "../hocs/withErrorBoundary";

const Text = ({ message, error }) => {
	if (error || (!message && message !== "")) {
		return (
			<span
				style={{
					color: "red",
					backgroundColor: "white",
					fontWeight: "bold",
				}}
			>
				Errored: {message ? error.message : "No message provided"}
			</span>
		);
	}
	return message.id ? (
		<FormattedMessage {...message} />
	) : (
		<span>{message}</span>
	);
};

export default withErrorBoundary("Text")(Text);
