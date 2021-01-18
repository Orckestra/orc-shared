import React from "react";
import TreeView from "./TreeView";
import { makeStyles } from "@material-ui/core/styles";
import Sidepanel from "./../../Sidepanel";

const useStyles = makeStyles(theme => ({
  container: {
    top: theme.spacing(9),
    zIndex: 9999,
    backgroundColor: theme.palette.grey.light,
    border: `1px solid ${theme.palette.grey.borders}`,
    boxShadow: "0 2px 4px rgba(0,0,0,0.5)"
  },
  scopeSelector: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    padding: theme.spacing(2)
  },
}));

const ScopeSelector = ({ show, getScope, currentScope }) => {
  const classes = useStyles();

  if (show === false) return null;

  const scopeSelector = (
    <Sidepanel className={classes.container} in={show} width="27vw" timeout={300}>
      <div className={classes.scopeSelector}>
        <TreeView rootId="Global" getScope={getScope} />
      </div>
    </Sidepanel>
  );

  return scopeSelector;
};

export default ScopeSelector;