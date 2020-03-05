import React from "react";
import styled from "styled-components";
import { useIntl } from "react-intl";
import { getThemeProp } from "../utils";

const maybeTranslate = (formatMessage, message) =>
	message && message.id ? formatMessage(message) : message;

export const InputComponent = styled.input`
	font-family: ${getThemeProp(["fonts", "base"], "sans-serif")};
	box-sizing: border-box;
	flex: 0 0 auto;
	height: 30px;
	padding: 5px 10px;
	border: 1px solid ${getThemeProp(["colors", "borderLight"], "#cccccc")};
	border-radius: 5px;

	&:focus {
		border-color: #4fa1f0;
		box-shadow: 0 0 4px #4fa1f0;
		outline: none;
	}
`;

const Input = ({ placeholder, ...props }) => {
	const { formatMessage } = useIntl();
	return (
		<InputComponent {...props} placeholder={maybeTranslate(formatMessage, placeholder)} />
	);
};

export default Input;
