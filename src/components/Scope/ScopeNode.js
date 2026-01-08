import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import useScopeSelect from "./useScopeSelect";
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

export const ScopeNode = ({
	type,
	name,
	id,
	isAuthorizedScope,
	closeSelector,
	contentLabelClassName,
	scopeTextClassName,
	iconClassName,
	onClick,
	children,
}) => {
	const [navigate] = useScopeSelect(id);

	if (!onClick && isAuthorizedScope && type !== "Virtual") {
		onClick = event => {
			navigate(event);
			closeSelector(event);
		};
	}
	const classes = useStyles({ isGlobal: type === "Global", isClickable: onClick !== undefined });

	return (
		<div
			id={"selectorNode" + id}
			className={classNames(classes.contentLabel, contentLabelClassName)}
			onClick={onClick}
			data-qa="content-label"
		>
			<ScopeIcon type={type} className={classNames(classes.scopeIcon, iconClassName)} />
			<div className={classNames(classes.scopeText, scopeTextClassName)}>{name || id}</div>
			{children}
		</div>
	);
};

export default ScopeNode;
