import React from "react";
import TreeViewMui from "@material-ui/lab/TreeView";
import TreeItem from "./TreeItem";

export const BaseScopeTreeView = ({
	rootId,
	getScope,
	onSelected,
	initExpanded,
	selected,
	setSelected,
	redirectOnSelect,
	multipleSelect,
}) => {
	const [expanded, setExpanded] = React.useState(initExpanded);

	const handleToggle = (_, nodeIds) => {
		setExpanded(nodeIds);
	};

	const onScopeSelect = (event, nodeId) => {
		const newSelected = !multipleSelect
			? nodeId
			: selected.includes(nodeId)
			? selected.filter(id => id !== nodeId)
			: [nodeId, ...selected];

		setSelected(newSelected);
		onSelected(event, newSelected);
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

const ScopeTreeView = ({ rootId, getScope, selected, onSelected, multipleSelect, redirectOnSelect = true }) => {
	const initialSelected = Array.isArray(selected) ? selected.map(i => i.id) : selected ? [selected.id] : [];
	const initExpanded = (Array.isArray(selected) ? selected[0] : selected)?.scopePath;
	const [currentSelected, setCurrentSelected] = React.useState(initialSelected);

	return (
		<BaseScopeTreeView
			rootId={rootId}
			getScope={getScope}
			onSelected={onSelected}
			initExpanded={initExpanded}
			selected={currentSelected}
			setSelected={setCurrentSelected}
			redirectOnSelect={redirectOnSelect}
			multipleSelect={multipleSelect}
		/>
	);
};

export default ScopeTreeView;
