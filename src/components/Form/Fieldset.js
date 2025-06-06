import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { FormattedMessage } from "react-intl";

const useStyles = makeStyles(theme => ({
	fieldsetBox: {
		position: "relative",
		boxSizing: "border-box",
		display: "flex",
		alignSelf: "stretch",
		flexDirection: "column",
		flexWrap: "wrap",
		border: `1px solid ${theme.palette.grey.borders}`,
		borderRadius: 5,
		marginTop: 45,
		marginLeft: 0,
		marginBottom: 0,
		padding: 20,
		paddingTop: 0,
		backgroundColor: "#fafafa",
	},
	legend: {
		position: "absolute",
		top: "-2em",
		left: -4,
		fontFamily: theme.typography.button.fontFamily,
		fontStyle: "italic",
		fontSize: 13,
		textTransform: "uppercase",
		color: theme.palette.primary.main,
	},
}));

const Fieldset = ({ label, children }) => {
	const classes = useStyles();

	return (
		<fieldset className={classes.fieldsetBox}>
			<legend className={classes.legend}>
				<FormattedMessage {...label} />
			</legend>
			{children}
		</fieldset>
	);
};

export default Fieldset;
