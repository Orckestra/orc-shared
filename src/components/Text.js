import React from "react";
import pt from "prop-types";
import styled, { keyframes } from "styled-components";
import { FormattedMessage } from "react-intl";
import withErrorBoundary from "../hocs/withErrorBoundary";

export const messageContainsValues = message => {
	const valRefs = message.defaultMessage.match(/(\{\w+\})/g);
	if (!valRefs) return true;
	const valNames = valRefs.map(ref => ref.replace(/[{}]/g, ""));
	return (
		!!message.values &&
		valNames.every(
			key => message.values[key] !== undefined && message.values[key] !== null,
		)
	);
};

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
	background-color: #999999;
	animation: ${fadeCycle} 3s infinite alternate;
`;

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
	if (message.id) {
		if (messageContainsValues(message)) {
			return <FormattedMessage {...message} />;
		} else {
			return <Placeholder />;
		}
	} else {
		return message;
	}
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
