import React from "react";
import styled from "styled-components";
import transition from "styled-transition-group";
import { TransitionGroup } from "react-transition-group";
import ReactDOM from "react-dom";
import { shade } from "polished";
import { getThemeProp } from "../utils";
import Text from "./Text";
import Icon from "./Icon";

const portal = document.getElementById("toast") || document.createElement("div");
/* istanbul ignore else */
if (!portal.parent) {
	portal.id = "toast";
	document.body.appendChild(portal);
}

const toastTransitionTime = 300;

export const ToastBox = transition.div`
	display: flex;
	width: 390px;
	margin-top: 10px;
	padding: 17px;
	border-radius: 5px;
	font-size: 14px;
	color: white;
	background-color: ${getThemeProp(["colors", "toasts", props => props.type], "#999")};
	z-index: 10000;

	& > * {
		margin-top: auto;
		margin-bottom: auto;
	}
	
	&:enter {
		transform: translateX(200%);
	}
	&:enter-active {
		transform: translateX(0);
		transition: transform ${toastTransitionTime}ms ease-out;
	}
	&:exit {
		transform-origin: top;
		transform: scale(1,1);
	}
	&:exit ~ & {
		transform: translateY(0);
	}
	&:exit-active {
		transform: scale(1, 0.001);
		transition: transform ${toastTransitionTime}ms ease-out;
	}
	&:exit-active ~ & {
		transition: transform ${toastTransitionTime}ms ease-out;
		transform: translateY(-100%);
	}
`;
ToastBox.defaultProps = {
	timeout: toastTransitionTime,
	unmountOnExit: true,
};

export const ToastIcon = styled(Icon).attrs(props => ({
	id: getThemeProp(["icons", "toast", props => props.type], "bubble-chat-2")(props),
}))`
	font-size: 20px;
	margin-right: 16px;
	stroke-width: 2px;
`;

export const CloseIcon = styled(Icon).attrs(props => ({
	id: getThemeProp(["icons", "close"], "close")(props),
}))`
	position: absolute;
	top: 8px;
	right: 8px;
	font-size: 10px;
	padding: 2px;
	border-radius: 2px;
	stroke-width: 2px;

	&:hover {
		background-color: ${getThemeProp(["colors", "toasts", props => props.type], "#999999", color => shade(0.3, color))};
	}
`;

export const Toast = ({ message = "[No message]", type = "", closeFunc, ...props }) => (
	<ToastBox type={type} in={props.in}>
		<ToastIcon type={type} />
		<Text message={message} />
		{closeFunc ? <CloseIcon onClick={closeFunc} type={type} /> : null}
	</ToastBox>
);

const ListWrapper = styled(TransitionGroup)`
	position: absolute;
	top: 40px;
	right: 16px;
	display: flex;
	flex-direction: column;
`;

export const ToastList = ({ toasts }) =>
	ReactDOM.createPortal(
		<ListWrapper>
			{toasts.map((props, idx) => (
				<Toast key={"toast" + idx} {...props} />
			))}
		</ListWrapper>,
		portal,
	);

export default ToastList;
