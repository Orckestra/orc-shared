import React from "react";
import TreeViewMui from '@material-ui/lab/TreeView';
import TreeItem from "./TreeItem";
import { safeGet, stripKey } from "./../../../utils";
import TreeItemMui from '@material-ui/lab/TreeItem';
import Icon from "./../DataDisplay/Icon";


const TreeView = ({ rootId, getScope }) => {
  const renderTree = (scopeId) => {
    const currentScope = getScope(scopeId);

    return (
      <TreeItem key={`ScopeSelector-${currentScope.id}`} scope={currentScope} rootId={rootId}>
        {currentScope.children.map(child =>
          renderTree(child)
        )}
      </TreeItem>
    );
  };

  const treeView = (
    <TreeViewMui
      defaultExpanded={[rootId]}
    >
      {renderTree(rootId)}
    </TreeViewMui>
  );

  return treeView;
};

export default TreeView;