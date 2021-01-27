import React from "react";
import TreeViewMui from "@material-ui/lab/TreeView";
import TreeItem from "./TreeItem";
import { scopeTypes } from "./../../../constants";

const TreeView = ({ rootId, getScope, selectedScope, closeSelector }) => {
	const [expanded, setExpanded] = React.useState(selectedScope.scopePath);
	const [selected, setSelected] = React.useState(selectedScope.id);

	const virtualScopes = [];

	const handleToggle = (_, nodeIds) => {
		setExpanded(nodeIds);
	};

	const handleSelect = (_, nodeId) => {
		if (virtualScopes.includes(nodeId) === false) {
			setSelected(nodeId);
		}
	};

	const renderTree = scopeId => {
		const currentScope = getScope(scopeId);
		if (currentScope == null) return null;

		if (currentScope.type === scopeTypes.virtual) {
			virtualScopes.push(currentScope.id);
		}

		return (
			<TreeItem
				key={`ScopeSelector-${currentScope.id}`}
				scope={currentScope}
				rootId={rootId}
				closeSelector={closeSelector}
			>
				{currentScope.children.map(child => renderTree(child))}
			</TreeItem>
		);
	};

	const treeView = (
		<TreeViewMui expanded={expanded} selected={selected} onNodeToggle={handleToggle} onNodeSelect={handleSelect}>
			{renderTree(rootId)}
		</TreeViewMui>
	);

	return treeView;
};

export default TreeView;
