import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";

const getModalRoot = () => document.getElementById("modal");

const useStyles = makeStyles({
	panel: props => ({
		position: "absolute",
		top: 0,
		bottom: 0,
		right: 0,
		width: props.width,

		"&.enter": {
			transform: `translateX(${props.width})`,
		},
		"&.enter-active": {
			transform: "translateX(0)",
			transition: `transform ${props.timeout}ms ease-out`,
		},
		"&.exit": {
			transform: "translateX(0)",
		},
		"&.exit-active": {
			transform: `translateX(${props.width})`,
			transition: `transform ${props.timeout}ms ease-out`,
		},
	}),
});

const Sidepanel = ({ in: inProp, width = "300px", timeout = 1000, children, className }) => {
	const classes = useStyles({ width, timeout });

	const panel = (
		<CSSTransition in={inProp} timeout={timeout} unmountOnExit>
			<div className={classNames(classes.panel, className)}>{children}</div>
		</CSSTransition>
	);

	return ReactDOM.createPortal(panel, getModalRoot());
};

export default Sidepanel;
