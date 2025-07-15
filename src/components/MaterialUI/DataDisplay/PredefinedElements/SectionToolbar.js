import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
	container: {
		display: "flex",
		padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
		minHeight: theme.spacing(4),
		alignItems: "center",
		borderBottom: `${theme.spacing(0.1)} solid ${theme.palette.grey.borders}`,
	},
	rightContent: {
		justifyContent: "flex-end",
		alignItems: "center",
		display: "flex",
		flex: 1,
	},
}));

const SectionToolbar = ({ children, rightContent }) => {
	const classes = useStyles();

	const container = (
		<div className={classes.container}>
			{children}
			{[
				rightContent && (
					<div key={"rightContent"} className={classes.rightContent}>
						{rightContent}
					</div>
				),
			]}
		</div>
	);

	return container;
};

export default SectionToolbar;
