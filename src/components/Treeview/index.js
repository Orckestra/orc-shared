import React from "react";
import { mapProps } from "recompose";
import useViewState from "../../hooks/useViewState";
import { Wrapper } from "./Branch";
import Node, { TreeContext } from "./Node";

export const withNodeState =
	/* istanbul ignore next */
	mapProps(({ name, defaultNodeState = {}, ...props }) => {
		const [viewState, updateViewState] = useViewState(name);
		return {
			nodeState: { ...defaultNodeState, ...viewState.nodeState },
			updateNodeState: update => updateViewState("nodeState", update),
			...props,
		};
	});

/* istanbul ignore next */
export const Treeview = ({
	dark,
	Content = () => null,
	rootId,
	getNode = () => null,
	openAll,
	nodeState = {},
	updateNodeState = () => {},
	...otherProps
}) => (
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

export default withNodeState(Treeview);
