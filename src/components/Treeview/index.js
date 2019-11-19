import React from "react";
import { compose, mapProps } from "recompose";
import withViewState from "../../hocs/withViewState";
import { Wrapper } from "./Branch";
import Node, { TreeContext } from "./Node";

export const withNodeState = compose(
	withViewState,
	/* istanbul ignore next */
	mapProps(({ name, viewState, updateViewState, ...props }) => ({
		nodeState: viewState.nodeState,
		updateNodeState: update => updateViewState("nodeState", update),
		...props,
	})),
);

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
