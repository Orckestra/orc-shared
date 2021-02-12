import React from "react";
import TreeViewMui from "@material-ui/lab/TreeView";
import TreeItem from "./TreeItem";
import { scopeTypes } from "./../../../constants";

const TreeView = ({ rootId, getScope, selectedScope, closeSelector, multipleSelect, redirectOnSelect }) => {
	const [expanded, setExpanded] = React.useState(selectedScope.scopePath);
	const [selected, setSelected] = React.useState(multipleSelect ? [selectedScope.id] : selectedScope.id);

	const handleToggle = (_, nodeIds) => {
		setExpanded(nodeIds);
	};

	const onScopeSelect = (_, nodeId) => {
		const newSelected = !Array.isArray(selected)
			? nodeId
			: selected.includes(nodeId)
			? selected.filter(id => id !== nodeId)
			: [nodeId, ...selected];

		setSelected(newSelected);
		closeSelector(_, newSelected);
	};

	const renderTree = scopeId => {
		const currentScope = getScope(scopeId);
		if (currentScope == null) return null;

		return (
			<TreeItem
				key={`ScopeSelector-${currentScope.id}`}
				scope={currentScope}
				rootId={rootId}
				onScopeSelect={onScopeSelect}
				redirectOnSelect={redirectOnSelect}
			>
				{currentScope.children.map(child => renderTree(child))}
			</TreeItem>
		);
	};

	return (
		<TreeViewMui expanded={expanded} selected={selected} onNodeToggle={handleToggle}>
			{renderTree(rootId)}
		</TreeViewMui>
	);
};

export default TreeView;
