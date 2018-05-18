import React from "react";
import { Wrapper } from "./Branch";
import Node, { TreeContext } from "./Node";

/* istanbul ignore next */
const Treeview = ({
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

export default Treeview;
