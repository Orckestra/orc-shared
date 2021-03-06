import React, { useContext } from "react";
import styled from "styled-components";
import { IntlContext } from "react-intl";
import { getThemeProp } from "../utils";

const defaultFormatMessage = message => {
	throw new Error("Attempting to translate message " + message.id + " outside of Intl context");
};
const maybeTranslate = (formatMessage = defaultFormatMessage, message) =>
	message && message.id ? formatMessage(message) : message;

const useIntlSoft = () => useContext(IntlContext) || {};

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
	const { formatMessage } = useIntlSoft();
	return <InputComponent {...props} placeholder={maybeTranslate(formatMessage, placeholder)} />;
};

export default Input;
