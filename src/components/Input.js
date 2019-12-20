import styled from "styled-components";
import { injectIntl } from "react-intl";
import { withProps, compose } from "recompose";
import { getThemeProp } from "../utils";

const maybeTranslate = ({ /* intl */ formatMessage }, message) =>
	message && message.id ? formatMessage(message) : message;

export const InputComponent = styled.input`
	font-family: ${getThemeProp(["fonts", "base"], "sans-serif")};
	box-sizing: border-box;
	flex: 0 0 auto;
	height: 30px;
	padding: 5px 10px;
	border: 1px solid #ccc;
	border-radius: 5px;

	&:focus {
		border-color: #4fa1f0;
		box-shadow: 0 0 4px #4fa1f0;
		outline: none;
	}
`;

const Input = compose(
	injectIntl,
	withProps(({ intl, placeholder }) => ({
		placeholder: maybeTranslate(intl, placeholder),
	})),
)(InputComponent);

export default Input;
