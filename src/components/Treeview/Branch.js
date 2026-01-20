import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { branchIndentSpacing, branchLengthSpacing, branchHeightSpacing } from "./settings";
import classNames from "classnames";

const useStyles = makeStyles(theme => {
	const base = {
		margin: 0,
		fontSize: theme.spacing(1.3),
		listStyleType: "none",
		borderWidth: 0,
		borderStyle: "solid",
		borderColor: "#666",
		position: "relative",
	};

	return {
		branch: props => ({
			...base,
			marginLeft: `${theme.spacing(branchIndentSpacing)}`,
			padding: "0",
			paddingLeft: `${theme.spacing(branchLengthSpacing)}`,
			borderLeftWidth: theme.spacing(0.1),

			"&:last-child::after": {
				/* blocker - hides lowest part of vertical branch */
				content: '""',
				backgroundColor: props.dark ? theme.palette.grey.dark : "#fff",
				position: "absolute",
				left: `-${theme.spacing(branchIndentSpacing + branchLengthSpacing + 0.2)}`,
				bottom: 0,
				top: `-${theme.spacing(branchHeightSpacing)}`,
				width: theme.spacing(0.1),
			},
		}),
		wrapper: {
			...base,
			overflowY: "auto",
			overflowX: "hidden",
			marginLeft: 0,
			padding: `${theme.spacing(branchLengthSpacing - 0.5)}`,

			"& > $branch": {
				/* First Branch immediately under Wrapper needs margin adjusted to look right */
				marginLeft: `${theme.spacing(branchIndentSpacing * 1.5)}`,
			},
		},
	};
});

export const Branch = ({ dark, branchClassName, children }) => {
	const classes = useStyles({ dark });

	return (
		<ul className={classNames(classes.branch, branchClassName)} data-qa="branch">
			{children}
		</ul>
	);
};

export const Wrapper = ({ children }) => {
	const classes = useStyles();

	return <ul className={classes.wrapper}>{children}</ul>;
};
