import React from "react";
import { useSelector } from "react-redux";
import pt from "prop-types";
import styled, { keyframes } from "styled-components";
import { FormattedMessage } from "react-intl";
import { safeGet, unwrapImmutable, getThemeProp } from "../utils";
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
	background-color: ${getThemeProp(["colors", "textMedium"], "#999999")};
	animation: ${fadeCycle} 3s infinite alternate;
`;

const Text = ({ message, error }) => {
	let valueSelector = () => {};
	if (typeof safeGet(message, "values") === "function") {
		valueSelector = message.values;
		delete message.values;
	}
	const selectValues = unwrapImmutable(useSelector(valueSelector));
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
		if (message.values || selectValues) {
			message.values = { ...message.values, ...selectValues };
		}
		if (messageContainsValues(message)) {
			return <FormattedMessage {...message} />;
		} else {
			return <Placeholder />;
		}
	} else {
		return message.toString();
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
