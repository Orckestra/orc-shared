import React from "react";
import useViewState from "../../hooks/useViewState";
import { Wrapper } from "./Branch";
import Node, { TreeContext } from "./Node";

export const Treeview = ({
	dark,
	Content = () => {
		console.warn("Treeview is missing a Content prop, will render blank nodes");
		return null;
	},
	rootId,
	getNode = () => {
		console.warn("Treeview is missing a getNode prop, will render empty");
		return null;
	},
	openAll,
	name,
	defaultNodeState = {},
	...otherProps
}) => {
	const [viewState, updateViewState] = useViewState(name);
	const nodeState = { ...defaultNodeState, ...viewState.nodeState };
	const updateNodeState = update => updateViewState("nodeState", update);
	return (
		<Wrapper>
			<TreeContext.Provider
				value={{
					dark,
					Content,
					getNode,
					openAll,
					nodeState,
					updateNodeState,
					otherProps,
				}}
			>
				<Node id={rootId} root />
			</TreeContext.Provider>
		</Wrapper>
	);
};

export default Treeview;
