import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { branchIndent, branchLength, branchHeight } from "./settings";
import classNames from "classnames";

const useStyles = makeStyles(theme => {
	const base = {
		margin: 0,
		fontSize: "13px",
		listStyleType: "none",
		borderWidth: 0,
		borderStyle: "solid",
		borderColor: "#666",
		position: "relative",
	};

	return {
		branch: props => ({
			...base,
			marginLeft: `${branchIndent}px`,
			padding: "0",
			paddingLeft: `${branchLength}px`,
			borderLeftWidth: "1px",

			"&:last-child::after": {
				/* blocker - hides lowest part of vertical branch */
				content: '""',
				backgroundColor: props.dark ? theme.palette.grey.dark : "#fff",
				position: "absolute",
				left: `-${branchIndent + branchLength + 2}px`,
				bottom: 0,
				top: `-${branchHeight}px`,
				width: "1px",
			},
		}),
		wrapper: {
			...base,
			overflowY: "auto",
			overflowX: "hidden",
			marginLeft: 0,
			padding: `${branchLength - 5}px`,

			"& > $branch": {
				/* First Branch immediately under Wrapper needs margin adjusted to look right */
				marginLeft: `${1.5 * branchIndent}px`,
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
