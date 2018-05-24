import React from "react";
import ReactDOM from "react-dom";
import transition from "styled-transition-group";

const getModalRoot = () => document.getElementById("modal");

export const Wrapper = transition.div`
	z-index: 9999;
	display: flex;
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	transition: opacity ${props => props.timeout}ms ease-out;

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
Wrapper.defaultProps = { timeout: 300, unmountOnExit: true };

export default props =>
	ReactDOM.createPortal(<Wrapper {...props} />, getModalRoot());
