import React from "react";
import pt from "prop-types";
import styled, { keyframes } from "styled-components";
import { getThemeProp } from "../utils";
import withErrorBoundary from "../hocs/withErrorBoundary";
import useLabelMessage from "../hooks/useLabelMessage";

const fadeCycle = keyframes`
	0% {
		opacity: 0.3;
	}
	100% {
		opacity: 0.7;
	}
`;

export const Placeholder = styled.span`
	display: inline-block;
	height: 1em;
	width: 6em;
	border-radius: 0.5em;
	background-color: ${getThemeProp(["colors", "textMedium"], "#999999")};
	animation: ${fadeCycle} 3s infinite alternate;
`;

const Text = ({ message: rawMessage, error }) => {
	const [labelMessage, missingValues] = useLabelMessage(rawMessage);

	if (error || (!rawMessage && rawMessage !== "")) {
		return (
			<span
				style={{
					color: "red",
					backgroundColor: "white",
					fontWeight: "bold",
				}}
			>
				Errored: {error && error.message ? error.message : "No message provided"}
			</span>
		);
	}

	if (missingValues) {
		return <Placeholder />;
	}
	return labelMessage;
};

export const ptLabel = pt.oneOfType([
	pt.string,
	pt.shape({
		id: pt.string.isRequired,
		defaultMessage: pt.string.isRequired,
	}),
]);
Text.propTypes = { message: ptLabel };

export default withErrorBoundary("Text")(Text);
