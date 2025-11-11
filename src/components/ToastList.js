import React from "react";
import ReactDOM from "react-dom";
import { FormattedMessage } from "react-intl";
import { makeStyles } from "@material-ui/core/styles";
import Icon from "./MaterialUI/DataDisplay/Icon";
import { getToastColor } from "../utils/toastHelper";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const portal = document.getElementById("toast") || document.createElement("div");
/* istanbul ignore else */
if (!portal.parent) {
	portal.id = "toast";
	document.body.appendChild(portal);
}

const useStyles = makeStyles(theme => ({
	toastBox: props => {
		const toastColor = getToastColor(theme, props.toastType);

		return {
			display: "flex",
			width: "390px",
			marginTop: "10px",
			padding: "17px",
			borderRadius: "5px",
			fontSize: "14px",
			color: "white",
			backgroundColor: toastColor,
			zIndex: 10000,

			"& > *": {
				marginTop: "auto",
				marginBottom: "auto",
			},

			"&.enter": {
				transform: "translateX(200%)",
			},
			"&.enter-active": {
				transform: "translateX(0)",
				transition: "transform 300ms ease-out",
			},
			"&.exit": {
				transformOrigin: "top",
				transform: "scale(1,1)",
			},
			"&.exit ~ &": {
				transform: "translateY(0)",
			},
			"&.exit-active": {
				transform: "scale(1, 0.001)",
				transition: "transform 300ms ease-out",
			},
			"&.exit-active ~ &": {
				transition: "transform 300ms ease-out",
				transform: "translateY(-100%)",
			},
		};
	},
	listWrapper: {
		position: "absolute",
		top: "40px",
		right: "16px",
		display: "flex",
		flexDirection: "column",
	},
	closeIcon: {
		padding: "2px",
		borderRadius: "2px",
		strokeWidth: "2px",
		cursor: "pointer",
		marginLeft: "auto",
		fontSize: "20px",
	},
}));

export const Toast = ({ message = "[No message]", type = "", closeFunc, ...props }) => {
	const classes = useStyles({ toastType: type });

	return (
		<CSSTransition in={props.in} timeout={300} unmountOnExit>
			<div className={classes.toastBox}>
				<span>{typeof message === "string" ? message : <FormattedMessage {...message} />}</span>
				{closeFunc ? <Icon id="close" className={classes.closeIcon} onClick={closeFunc} /> : null}
			</div>
		</CSSTransition>
	);
};

export const ToastList = ({ toasts }) => {
	const classes = useStyles();

	return ReactDOM.createPortal(
		<TransitionGroup className={classes.listWrapper}>
			{toasts.map((props, idx) => (
				<Toast key={"toast" + idx} {...props} />
			))}
		</TransitionGroup>,
		portal,
	);
};

export default ToastList;
