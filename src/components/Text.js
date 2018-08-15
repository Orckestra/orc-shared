import React from "react";
import { FormattedMessage } from "react-intl";
import withErrorBoundary from "../hocs/withErrorBoundary";

const Text = ({ message, error }) =>
	!error ? (
		message.id ? (
			<FormattedMessage {...message} />
		) : (
			<span>{message}</span>
		)
	) : (
		<span
			style={{
				color: "red",
				backgroundColor: "white",
				fontWeight: "bold",
			}}
		>
			Errored: {error.message}
		</span>
	);

export default withErrorBoundary("Text")(Text);
