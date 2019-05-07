import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { shade } from "polished";
import { getThemeProp } from "../utils";
import Text from "./Text";
import Icon from "./Icon";

const portal =
	document.getElementById("toast") || document.createElement("div");
/* istanbul ignore else */
if (!portal.parent) {
	portal.id = "toast";
	document.body.appendChild(portal);
}

export const ToastBox = styled.div`
	position: absolute;
	top: 50px;
	right: 16px;
	display: flex;
	min-height: 36px;
	width: 390px;
	padding: 17px;
	border-radius: 5px;
	color: white;
	background-color: ${getThemeProp(
		["toastColors", props => props.type],
		"#999",
	)};

	& > * {
		margin-top: auto;
		margin-bottom: auto;
	}
`;

export const ToastIcon = styled(Icon).attrs({
	id: getThemeProp(["icons", "toast", props => props.type], "bubble-chat-2"),
})`
	margin-right: 16px;
	stroke-width: 2px;
`;

export const CloseIcon = styled(Icon).attrs({
	id: getThemeProp(["icons", "close"], "close"),
})`
	position: absolute;
	top: 8px;
	right: 8px;
	height: 10px;
	width: 10px;
	padding: 2px;
	border-radius: 2px;
	stroke-width: 2px;

	&:hover {
		background-color: ${getThemeProp(
			["toastColors", props => props.type],
			"#999",
			color => shade(0.3, color),
		)};
	}
`;

export const Toast = ({ message = "[No message]", type = "", closeFunc }) => (
	<ToastBox type={type}>
		<ToastIcon type={type} />
		<Text message={message} />
		{closeFunc ? <CloseIcon onClick={closeFunc} type={type} /> : null}
	</ToastBox>
);

export default props => ReactDOM.createPortal(<Toast {...props} />, portal);
