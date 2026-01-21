import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { FormattedMessage } from "react-intl";

const useStyles = makeStyles(theme => ({
	fieldBox: {
		flex: "0 1 auto",
		display: "flex",
		flexDirection: "column",
		marginTop: theme.spacing(2),
		position: "relative",
	},
	label: {
		minHeight: theme.spacing(1.7),
		color: theme.palette.text.hint,
		marginBottom: theme.spacing(1),
	},
	invalidLabel: {
		color: theme.palette.error.main,
	},
	centerLabel: {
		textAlign: "center",
	},
	labelOnly: {
		marginBottom: 0,
	},
	requiredLabel: {
		"&::after": {
			content: '" *"',
			color: "#666",
		},
	},
	requiredNotice: {
		position: "absolute",
		bottom: "-1.6em",
		right: 0,
		color: theme.palette.error.main,
	},
}));

const Field = ({ id, label, center, labelOnly, required, invalid, children }) => {
	const classes = useStyles();

	return (
		<div className={classes.fieldBox}>
			{label !== undefined ? (
				<label
					htmlFor={labelOnly ? undefined : id}
					id={`${id}_label`}
					className={`${classes.label} 
						${invalid ? classes.invalidLabel : ""}
						${center ? classes.centerLabel : ""}
						${labelOnly ? classes.labelOnly : ""}
						${required ? classes.requiredLabel : ""}`}
				>
					{typeof label === "string" ? label : <FormattedMessage {...label} />}
				</label>
			) : null}
			{labelOnly ? null : children}
			{!labelOnly && required && invalid ? (
				<div className={classes.requiredNotice}>
					{typeof required === "string" ? required : <FormattedMessage {...required} />}
				</div>
			) : null}
		</div>
	);
};

export default Field;
