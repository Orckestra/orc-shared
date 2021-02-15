import React from "react";
import TreeViewMui from "@material-ui/lab/TreeView";
import TreeItem from "./TreeItem";
import { scopeTypes } from "./../../../constants";

export const BaseTreeView = ({
	rootId,
	getScope,
	closeSelector,
	initExpanded,
	selected,
	setSelected,
	redirectOnSelect,
}) => {
	const [expanded, setExpanded] = React.useState(initExpanded);

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

const TreeView = ({ rootId, getScope, selectedScope, closeSelector, multipleSelect, redirectOnSelect = true }) => {
	const [selected, setSelected] = React.useState(multipleSelect ? [selectedScope.id] : selectedScope.id);

	return (
		<BaseTreeView
			rootId={rootId}
			getScope={getScope}
			closeSelector={closeSelector}
			initExpanded={selectedScope.scopePath}
			selected={selected}
			setSelected={setSelected}
			redirectOnSelect={redirectOnSelect}
		/>
	);
};

export default TreeView;
