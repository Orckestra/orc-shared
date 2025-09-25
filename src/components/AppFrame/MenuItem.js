import React, { useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import Icon from "../MaterialUI/DataDisplay/Icon";

const getToastColor = (theme, alertType) => {
	const toastBorderColors = {
		error: theme.palette.error.main,
		warn: theme.palette.warning.main,
		confirm: theme.palette.success.main,
	};
	return toastBorderColors[alertType] || "red";
};

const useStyles = makeStyles(theme => ({
	block: props => ({
		display: "block",
		position: "relative",
		padding: "0 10px",
		marginBottom: "35px",
		textDecoration: "none",
		cursor: "pointer",
		color: props.active ? theme.palette.primary.light : theme.palette.text.hint,

		"&:hover": {
			color: props.menuToggle ? undefined : theme.palette.primary.light,
		},
	}),
	alert: props => {
		const toastColor = getToastColor(theme, props.alertType);

		return {
			borderRadius: "50%",
			border: `4px solid ${toastColor}`,
			position: "absolute",
			top: 0,
			left: "27px",
			visibility: "hidden",

			"&.show": {
				visibility: "visible",
			},
		};
	},
	alertMessage: props => {
		const toastColor = getToastColor(theme, props.alertType);

		return {
			position: "absolute",
			zIndex: 10000,
			top: "calc(-10px - 0.7em)",
			left: "22px",
			width: "max-content",
			borderRadius: "5px",
			padding: "10px 15px",
			boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.5)",
			color: theme.palette.grey.light,
			backgroundColor: toastColor,
			fontSize: "11px",
			fontWeight: "bold",
			lineHeight: 1.2,
			transition: `transform 200ms cubic-bezier(0.68, -0.55, 0.27, 1.55), opacity 100ms 50ms ease-out`,
			opacity: 0.01,
			transform: "translateX(-50%) scaleX(0)",

			"&::before": {
				content: "",
				position: "absolute",
				top: "calc(10px + 0.2em)",
				left: "-0.9em",
				border: "solid transparent",
				borderWidth: "0.4em 0.9em 0.4em 0",
				borderRightColor: toastColor,
			},

			"&.show": {
				opacity: 1,
				transform: "translateX(0) scaleX(1)",
			},
		};
	},
	menuIcon: props => ({
		fontSize: "24px",
		verticalAlign: "middle",
		color: props.active ? theme.palette.primary.light : theme.palette.text.hint,
	}),
	label: props => ({
		fontFamily: theme.typography.button.fontFamily,
		fontSize: "13px",
		verticalAlign: "middle",
		textTransform: "uppercase",
		paddingLeft: "10px",
		transition: "opacity 0.3s ease-out",
		opacity: props.showLabel ? 1 : 0,
	}),
}));

const FilteredLink = ({ staticContext, dispatch, component, ...props }) => <Link {...props} />;

const MenuItem = ({ open = false, label = "", icon, alert, isHidden = false, href, menuToggle, active, ...props }) => {
	const classes = useStyles({ active: active, menuToggle: menuToggle, alertType: alert?.type, showLabel: open });

	const alertMessage = useRef("");
	const showAlert = !!alert;
	const showAlertMessage = !!alert?.message;
	if (showAlert && showAlertMessage) {
		alertMessage.current = alert.message;
	}

	if (isHidden) {
		return false;
	}

	const ItemWrapper = menuToggle ? "a" : FilteredLink;

	return (
		<ItemWrapper to={href} className={classes.block} {...props}>
			<Icon id={icon} className={classes.menuIcon} />
			<div className={`${classes.alert} ${showAlert ? "show" : undefined}`}>
				{alertMessage.current && (
					<div className={`${classes.alertMessage} show`}>
						<FormattedMessage {...alertMessage.current} />
					</div>
				)}
			</div>
			<span className={classes.label}>{typeof label === "string" ? label : <FormattedMessage {...label} />}</span>
		</ItemWrapper>
	);
};

export default MenuItem;
