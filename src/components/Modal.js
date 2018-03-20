import React from "react";
import styled from "styled-components";
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
	justify-content: center;
	align-items: center;

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

const ModalDialog = styled.div`
	background-color: #333;
	border-radius: 5px;
	padding: 10px;
	min-width: 20%;
	min-height: 10%;
	color: white;
	font-size: 36px;
	z-index: 10000;
`;

const Modal = ({ show, toggle, children }) => (
	<ModalWrapper in={show}>
		<ModalBackground onClick={toggle} />
		<ModalDialog>{children}</ModalDialog>
	</ModalWrapper>
);

export default Modal;
