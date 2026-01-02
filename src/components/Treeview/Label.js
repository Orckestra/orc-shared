import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Icon from "../MaterialUI/DataDisplay/Icon";
import { branchLength } from "./settings";
import classNames from "classnames";

const useStyles = makeStyles(theme => ({
	beforeIndicator: {
		backgroundColor: "#666",
		marginLeft: `-${branchLength + 1}px`,
		width: `${branchLength + 1}px`,
		height: "1px",
		zIndex: 99,
		position: "absolute",
	},
	nonIndicator: {
		height: "1px",
		width: `${branchLength + 21}px`,
		margin: `auto 0 auto -${branchLength + 1}px`,
		backgroundColor: "#666",
		alignSelf: "stretch",
		flex: "0 0 auto",
		zIndex: 99,
	},
	label: props => ({
		cursor: "pointer",
		flexGrow: 1,
		width: "100%",
		backgroundColor: props.isSelectedNode ? "#222" : undefined,
		border: props.isSelectedNode ? `1px solid ${theme.palette.grey.borders}` : undefined,
	}),
	indicator: props => ({
		fontSize: "10px",
		padding: "10px 0 10px 10px",
		cursor: "pointer",
		flex: "0 0 auto",
		color: props.open
			? props.dark
				? theme.palette.primary.light
				: theme.palette.text.primary
			: theme.palette.primary.main,
	}),
}));

export const BeforeIndicator = ({ children }) => {
	const classes = useStyles();

	return <div className={classes.beforeIndicator}>{children}</div>;
};

export const NonIndicator = ({ children }) => {
	const classes = useStyles();

	return <div className={classes.nonIndicator}>{children}</div>;
};

export const Label = ({ isSelectedNode, labelClassName, children }) => {
	const classes = useStyles({ isSelectedNode });

	return <div className={classNames(classes.label, labelClassName)}>{children}</div>;
};

export const Indicator = ({ open, dark, onClick }) => {
	const classes = useStyles({ open, dark });
	const iconId = open ? "dropdown-chevron-down" : "dropdown-chevron-right";

	return <Icon id={iconId} className={classes.indicator} onClick={onClick} data-qa="indicator" />;
};
