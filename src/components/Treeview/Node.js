import React from "react";
import { Branch } from "./Branch";
import { Leaf, Root } from "./Leaf";
import { Indicator, BeforeIndicator, NonIndicator, Label } from "./Label";
import { safeGet } from "../../utils";

export const TreeContext = React.createContext();

export const LeafNode = nodeData => (
	<Leaf>
		<TreeContext.Consumer>
			{({ Content, nodeState, updateNodeState, otherProps }) => {
				const toggle = () =>
					updateNodeState({ ...nodeState, [nodeData.id]: !nodeData.open });
				return (
					<React.Fragment>
						{safeGet(nodeData, "children", "length") ? (
							<>
								<BeforeIndicator />
								<Indicator open={nodeData.open} onClick={toggle} />
							</>
						) : (
							<NonIndicator />
						)}
						<Label>
							<Content {...nodeData} {...otherProps} />
						</Label>
					</React.Fragment>
				);
			}}
		</TreeContext.Consumer>
	</Leaf>
);
LeafNode.displayName = "LeafNode";

export const RootNode = nodeData => (
	<Root>
		<Label>
			<TreeContext.Consumer>
				{({ Content, otherProps }) => <Content {...nodeData} {...otherProps} />}
			</TreeContext.Consumer>
		</Label>
	</Root>
);
RootNode.displayName = "RootNode";

export const Node = ({ root, id }) => (
	<TreeContext.Consumer>
		{({ openAll, getNode, nodeState }) => {
			const nodeData = getNode(id);
			if (!nodeData) return null;
			const open = root || openAll || nodeState[id] || false;
			return (
				<React.Fragment>
					{root ? (
						<RootNode {...nodeData} />
					) : (
						<LeafNode {...nodeData} open={open} />
					)}
					{open && safeGet(nodeData, "children", "length") ? (
						<Branch>
							{nodeData.children.map(id => (
								<Node key={id} id={id} />
							))}
						</Branch>
					) : null}
				</React.Fragment>
			);
		}}
	</TreeContext.Consumer>
);
Node.displayName = "Node";

export default Node;
