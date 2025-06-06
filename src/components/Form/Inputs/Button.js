import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import withId from "../../../hocs/withId";
import Button from "@material-ui/core/Button";
import Icon from "../../MaterialUI/DataDisplay/Icon";
import { FormattedMessage } from "react-intl";

const useStyles = makeStyles(theme => ({
	positionedButton: {
		width: "max-content",
		position: "relative",
		padding: "6px 14px !important",
		"&:hover": {
			borderColor: "#4fa1f0",
			boxShadow: "0 0 4px #4fa1f0",
			outline: "none",
			backgroundColor: "#f7f7f7 !important",
		},
		"&:disabled": {
			opacity: 0.6,
			backgroundColor: "#f7f7f7 !important",
		},
	},
	buttonIcon: {
		height: "1em",
		width: "1em",
		fill: "currentColor",
		stroke: "currentColor",
		fontSize: "1.23em !important",
	},
	primaryButton: {
		color: `${theme.palette.primary.main} !important`,
		border: `1px solid ${theme.palette.primary.main} !important`,
		backgroundColor: "#fff !important",
		"&:hover": {
			backgroundColor: "#fff !important",
		},
	},
	primaryIcon: {
		color: `${theme.palette.primary.main} !important`,
	},
}));

const FormButton = ({ id, icon, buttonText, update, "aria-labelledby": aria, primary, ...props }) => {
	const classes = useStyles();

	return (
		<Button
			id={id}
			className={`${classes.positionedButton} ${primary ? classes.primaryButton : ""}`}
			onClick={update}
			variant="outlined"
			startIcon={<Icon id={icon} className={`${classes.buttonIcon} ${primary ? classes.primaryIcon : ""}`} />}
			{...props}
		>
			<FormattedMessage {...buttonText} />
		</Button>
	);
};

FormButton.displayName = "FormButton";

export default withId("formbutton")(FormButton);
