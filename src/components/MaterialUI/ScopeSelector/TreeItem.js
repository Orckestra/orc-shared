import React from "react";
import TreeItemMui from "@material-ui/lab/TreeItem";
import Icon from "./../DataDisplay/Icon";
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/styles";
import MultipleLinesText from "./../DataDisplay/TooltippedElements/MultipleLinesText";
import TextProps from "./../textProps";
import classNames from "classnames";
import { scopeTypes } from "./../../../constants";

const useStyles = makeStyles(theme => ({
	group: {
		marginLeft: props => (props.isRootScope ? theme.spacing(1.2) : theme.spacing(3.2)),
		// to hide unnecessary border part
		// "& > div > div > :last-child": {
		//   "&:after": {
		//     content: "''",
		//     backgroundColor: theme.palette.grey.light,
		//     position: "absolute",
		//     top: theme.spacing(1.2),
		//     left: theme.spacing(-2.1),
		//     height: "100%",
		//     bottom: 0,
		//     width: "1px",
		//   },
		// }
	},
	rootIconContainer: {
		marginRight: 0,
		display: "none",
	},
	scopeLabel: {
		position: "relative",
		display: "flex",
		alignItems: "center",
	},
	scopeLabelInactive: {
		color: theme.palette.secondary.light,
	},
	scopeIcon: {
		marginRight: theme.spacing(0.7),
		height: theme.spacing(2.4),
		width: theme.spacing(2.4),
	},
	horizontalLine: {
		position: "absolute",
		left: props => (props.hasChildren ? theme.spacing(-4.1) : theme.spacing(-3)),
		width: props => (props.hasChildren ? theme.spacing(1.5) : theme.spacing(2.5)),
		height: "1px",
		backgroundColor: theme.palette.grey.icon,
	},
	regularScopeName: {
		fontSize: theme.typography.htmlFontSize,
		fontFamily: theme.typography.fontFamily,
		fontWeight: theme.typography.fontWeightSemiBold,
	},
	virtualScopeName: {
		fontWeight: theme.typography.fontWeightRegular,
	},
	virtualScopeContent: {
		"& > .MuiTreeItem-label": {
			cursor: "auto",
			"&:hover,&:focus": {
				backgroundColor: "transparent",
			},
		},
	},
	virtualScopeSelected: {
		"& > .MuiTreeItem-content .MuiTreeItem-label": {
			border: "none",
			backgroundColor: "transparent !important",
		},
	},
}));

export const ScopeIcon = ({ type }) => {
	const classes = useStyles();
	const theme = useTheme();

	const globalIcon = <Icon className={classes.scopeIcon} color="primary" fontSize="medium" id="global-scope" />;
	const virtualIcon = (
		<Icon className={classes.scopeIcon} themeColor={theme.palette.grey.dark} fontSize="medium" id="virtual-scope" />
	);
	const salesIcon = <Icon className={classes.scopeIcon} color="primary" fontSize="medium" id="sales-scope" />;
	const dependentIcon = (
		<Icon
			className={classes.scopeIcon}
			themeColor={theme.palette.success.main}
			fontSize="medium"
			id="dependent-scope"
		/>
	);

	switch (type) {
		case scopeTypes.global:
			return globalIcon;
		case scopeTypes.virtual:
			return virtualIcon;
		case scopeTypes.sale:
			return salesIcon;
		case scopeTypes.dependant:
			return dependentIcon;
		default:
			return null;
	}
};

export const ScopeLabel = ({ name, type, isRootScope, hasChildren, isVirtualScope, isActive }) => {
	const classes = useStyles({ hasChildren });

	const icon = <ScopeIcon type={type} />;

	const multipleLinesTextProps = new TextProps();
	multipleLinesTextProps.set(TextProps.propNames.lineCount, 3);
	multipleLinesTextProps.set(
		TextProps.propNames.classes,
		classNames(classes.regularScopeName, { [classes.virtualScopeName]: isVirtualScope }),
	);
	// 16.8 height of 1 lines of text

	const label = (
		<div className={classNames(classes.scopeLabel, isActive === false ? classes.scopeLabelInactive : "")}>
			{icon}
			<MultipleLinesText textProps={multipleLinesTextProps} children={name} />
		</div>
	);

	return label;
};

const TreeItem = ({ scope, rootId, onScopeSelect, isScopeSelectable, children }) => {
	const isRootScope = scope.id === rootId;
	const isVirtualScope = scope.type === scopeTypes.virtual;
	const hasChildren = scope.children.length > 0;
	const isSelectable = !isVirtualScope && (!isScopeSelectable || isScopeSelectable(scope.id));
	const classes = useStyles({ isRootScope });

	const expandIcon = <Icon id="dropdown-chevron-down" />;
	const collapseIcon = <Icon id="dropdown-chevron-up" />;

	const onLabelClickHandler = event => {
		event.preventDefault();

		if (isSelectable) {
			onScopeSelect(event, scope.id);
		}
	};

	return (
		<TreeItemMui
			nodeId={scope.id}
			label={
				<ScopeLabel
					name={scope.name}
					type={scope.type}
					isRootScope={isRootScope}
					isVirtualScope={isVirtualScope}
					hasChildren={hasChildren}
					isActive={scope.isActive}
				/>
			}
			expandIcon={isRootScope ? null : expandIcon}
			collapseIcon={isRootScope ? null : collapseIcon}
			onLabelClick={e => onLabelClickHandler(e)}
			classes={{
				group: classes.group,
				iconContainer: classNames({ [classes.rootIconContainer]: isRootScope }),
				content: classNames({ [classes.virtualScopeContent]: !isSelectable }),
				selected: classNames({ [classes.virtualScopeSelected]: !isSelectable }),
			}}
		>
			{children}
		</TreeItemMui>
	);
};

export default TreeItem;
