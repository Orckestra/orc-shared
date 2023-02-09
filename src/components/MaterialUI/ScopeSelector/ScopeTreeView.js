import React from "react";
import TreeViewMui from "@mui/lab/TreeView";
import TreeItem from "./TreeItem";

export const BaseScopeTreeView = ({
	rootId,
	getScope,
	onSelected,
	initExpanded = [],
	selected,
	setSelected,
	multipleSelect,
	isScopeSelectable,
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
				isScopeSelectable={isScopeSelectable}
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

const ScopeTreeView = ({ rootId, getScope, selected, expanded, onSelected, multipleSelect, isScopeSelectable }) => {
	const initialSelected = Array.isArray(selected) ? selected : selected ? [selected] : [];
	const [currentSelected, setCurrentSelected] = React.useState(initialSelected);

	return (
		<BaseScopeTreeView
			rootId={rootId}
			getScope={getScope}
			onSelected={onSelected}
			initExpanded={expanded}
			selected={currentSelected}
			setSelected={setCurrentSelected}
			multipleSelect={multipleSelect}
			isScopeSelectable={isScopeSelectable}
		/>
	);
};

export default ScopeTreeView;
