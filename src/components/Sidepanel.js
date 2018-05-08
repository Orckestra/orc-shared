import React from "react";
import ReactDOM from "react-dom";
import transition from "styled-transition-group";

const getProp = propName => props => props[propName];

const panelWidth = getProp("width");

const getModalRoot = () => document.getElementById("modal");

export const PanelDrawer = transition.div`
	position: absolute;
	top: 0;
	bottom: 0;
	right: 0;
	width: ${panelWidth};

	transition: transform ${getProp("timeout")}ms ease-out;

	&:enter {
		transform: translateX(${panelWidth});
	}
	&:enter-active {
		transform: translateX(0);
	}
	&:exit {
		transform: translateX(0);
	}
	&:exit-active {
		transform: translateX(${panelWidth});
	}
`;
PanelDrawer.defaultProps = {
	timeout: 1000,
	unmountOnExit: true,
	width: "200px",
};

const Sidepanel = props =>
	ReactDOM.createPortal(<PanelDrawer {...props} />, getModalRoot());

export default Sidepanel;
