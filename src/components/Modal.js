// @flow
import React from "react";
import type { Node, StatelessFunctionalComponent } from "react";
import styled, { css } from "styled-components";
import transition from "styled-transition-group";

const ModalWrapper = transition.div.attrs({
	unmountOnExit: true,
	timeout: 300,
})`
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	z-index: 9999;
	transition: opacity 0.3s ease-out;
	display: flex;

	&:enter {
		opacity: 0.01;
	}
	&:enter-active {
		opacity: 1;
	}
	&:exit {
		opacity: 1;
	}
	&:exit-active {
		opacity: 0.01;
	}
`;

const ModalBackground = styled.div`
	position: absolute;
	background-color: rgba(127, 127, 127, 0.5);
	height: 100%;
	width: 100%;
`;

const darkDialogStyle = css`
	background-color: #333;
	border-radius: 15px;
`;

const dialogLook = {
	default: css`
		background-color: white;
	`,
	dark: darkDialogStyle,
};

// TODO: Add light dialog style for other dialogs, switching mechanism
const ModalDialog = styled.div`
	flex: 0 0 auto;
	margin: auto;
	z-index: 10000;
	${props => dialogLook[props.look]};
`;

export type ModalProps = {
	show: boolean,
	toggle: () => void,
	children: Node,
	look: string,
};

const Modal: StatelessFunctionalComponent<ModalProps> = ({
	show,
	toggle,
	children,
	look = "default",
}: ModalProps): Node => (
	<ModalWrapper in={show}>
		<ModalBackground onClick={toggle} />
		<ModalDialog look={look}>{children}</ModalDialog>
	</ModalWrapper>
);

export default Modal;
