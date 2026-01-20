import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ScopeIcon } from "../MaterialUI/ScopeSelector/TreeItem";
import classNames from "classnames";

const useStyles = makeStyles(theme => ({
	scopeIcon: {
		paddingRight: theme.spacing(0.8),
		marginRight: theme.spacing(0),
		height: theme.spacing(2),
		width: theme.spacing(2),
	},
	scopeText: {
		overflowWrap: "break-word",
	},
	contentLabel: props => ({
		boxSizing: "border-box",
		display: "flex",
		alignItems: "center",
		padding: theme.spacing(1),
		width: "100%",
		...(props.isClickable
			? {
					"&:hover": {
						backgroundColor: "#222",
					},
				}
			: {
					color: theme.palette.error.main,
					cursor: "default",
				}),
	}),
}));

export const ScopeNode = ({ type, scopeId, name, contentLabelClassName, iconClassName, onClick, children }) => {
	const classes = useStyles({ isGlobal: type === "Global", isClickable: onClick !== undefined });

	const displayValue = (name || scopeId) ?? null;

	return (
		<div
			id={"selectorNode" + (scopeId ?? "scopeUnknown")}
			className={classNames(classes.contentLabel, contentLabelClassName)}
			onClick={onClick}
			data-qa="content-label"
		>
			<ScopeIcon type={type} scopeIconClass={classes.scopeIcon} />
			{displayValue && <div className={classes.scopeText}>{displayValue}</div>}
			{children}
		</div>
	);
};

export default ScopeNode;
