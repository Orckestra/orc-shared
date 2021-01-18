import React from "react";
import TreeItemMui from '@material-ui/lab/TreeItem';
import Icon from "./../DataDisplay/Icon";
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from '@material-ui/styles';
import MultipleLinesText from "./../DataDisplay/TooltippedElements/MultipleLinesText";
import TextProps from "./../textProps";
import classNames from "classnames";

const useStyles = makeStyles(theme => ({
  treeItem: {
    position: "relative",
    marginBottom: theme.spacing(1),
  },
  group: {
    marginLeft: props => props.isRootScope ? theme.spacing(1.2) : theme.spacing(3.2),
    borderLeft: `1px solid ${theme.palette.grey.borders}`,
    "& > *": {
      marginLeft: theme.spacing(2),
      marginTop: theme.spacing(1.5),
    },
    "& > div > div > &:last-child": {
      "&:after": {
        content: "''",
        backgroundColor: theme.palette.grey.light,
        position: "absolute",
        top: theme.spacing(1.2),
        left: theme.spacing(-2.1),
        bottom: 0,
        width: "1px",
      },
    }
  },
  iconContainer: {
    width: "auto",
    marginRight: theme.spacing(1),
    "& svg": {
      fontSize: "10px"
    }
  },
  globalIconContainer: {
    marginRight: 0
  },
  treeItemLabel: {
    padding: 0
  },
  scopeLabel: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(0.5)
  },
  scopeIcon: {
    marginRight: theme.spacing(0.7),
    height: theme.spacing(2.4),
    width: theme.spacing(2.4)
  },
  horizontalLine: {
    position: "absolute",
    left: props => props.hasChildren ? theme.spacing(-4.1) : theme.spacing(-3),
    width: props => props.hasChildren ? theme.spacing(1.5) : theme.spacing(2.9),
    height: "1px",
    backgroundColor: theme.palette.grey.borders,
  }
}));

export const ScopeIcon = ({ type }) => {
  const classes = useStyles();
  const theme = useTheme();

  const globalIcon =
    <Icon className={classes.scopeIcon} color="primary" fontSize="default" id="global-scope" />;
  const virtualIcon =
    <Icon className={classes.scopeIcon} themeColor={theme.palette.grey.dark} fontSize="default" id="virtual-scope" />;
  const salesIcon =
    <Icon className={classes.scopeIcon} color="primary" fontSize="default" id="sales-scope" />;
  const dependentIcon =
    <Icon className={classes.scopeIcon} themeColor={theme.palette.success.main} fontSize="default" id="dependent-scope" />;

  switch (type) {
    case "Global":
      return globalIcon;
    case "Virtual":
      return virtualIcon;
    case "Sale":
      return salesIcon;
    case "Dependant":
      return dependentIcon;
    default:
      return null;
  }
};

export const ScopeLabel = ({ name, type, isRootScope, hasChildren }) => {
  const classes = useStyles({ hasChildren });

  const icon = <ScopeIcon type={type} />;

  const multipleLinesTextProps = new TextProps();
  multipleLinesTextProps.set(TextProps.propNames.lineCount, 3);
  //	multipleLinesTextPropsLabel.set(TextProps.propNames.classes, classes.label);

  const horizontalLine = <div className={classes.horizontalLine} />;

  const label = (
    <div className={classes.scopeLabel}>
      {isRootScope ? null : horizontalLine}
      {icon}
      <MultipleLinesText textProps={multipleLinesTextProps} children={name} />
    </div>
  );

  return label
};

const TreeItem = ({ scope, rootId, ...props }) => {
  const isRootScope = scope.id === rootId;
  const hasChildren = scope.children.length > 0;
  const classes = useStyles({ isRootScope });

  const expandIcon = <Icon id="dropdown-chevron-down" />;
  const collapseIcon = <Icon id="dropdown-chevron-up" />;

  console.log(props.children);

  const treeItem = (
    <TreeItemMui
      nodeId={scope.id}
      label={<ScopeLabel name={scope.name} type={scope.type} isRootScope={isRootScope} hasChildren={hasChildren} />}
      expandIcon={isRootScope ? null : expandIcon}
      collapseIcon={isRootScope ? null : collapseIcon}
      classes={{
        root: classes.treeItem,
        group: classes.group,
        label: classes.treeItemLabel,
        iconContainer: classNames(classes.iconContainer, { [classes.globalIconContainer]: isRootScope })
      }}
    >
      {props.children}
    </TreeItemMui>
  );

  return treeItem;
};

export default TreeItem;