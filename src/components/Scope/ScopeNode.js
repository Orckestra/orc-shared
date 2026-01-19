import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ScopeIcon } from "../MaterialUI/ScopeSelector/TreeItem";
import classNames from "classnames";

const useStyles = makeStyles(theme => ({
	scopeIcon: {
		fontSize: "20px",
		verticalAlign: "middle",
		paddingRight: "8px",
		flexShrink: 0,
	},
	scopeText: {
		overflowWrap: "break-word",
	},
	contentLabel: props => ({
		boxSizing: "border-box",
		display: "flex",
		alignItems: "center",
		padding: "10px",
		width: "100%",
		textTransform: props.isGlobal ? "uppercase" : "none",
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
			<ScopeIcon type={type} className={classNames(classes.scopeIcon, iconClassName)} />
			{displayValue && <div className={classes.scopeText}>{displayValue}</div>}
			{children}
		</div>
	);
};

export default ScopeNode;
