import React from "react";
import { Branch } from "./Branch";
import { Leaf, Root } from "./Leaf";
import { Indicator, BeforeIndicator, NonIndicator, Label } from "./Label";
import { safeGet, stripKey } from "../../utils";

export const TreeContext = React.createContext();

export const LeafNode = ({ dark, isSelectedNode, labelClassName, leafClassName, ...nodeData }) => (
	<Leaf dark={dark} leafClassName={leafClassName}>
		<TreeContext.Consumer>
			{({ Content, nodeState, updateNodeState, dark, otherProps }) => {
				const toggle = () => updateNodeState({ ...nodeState, [nodeData.id]: !nodeData.open });
				return (
					<React.Fragment>
						{safeGet(nodeData, "children", "length") ? (
							[<BeforeIndicator key="a" />, <Indicator key="b" open={nodeData.open} onClick={toggle} dark={dark} />]
						) : (
							<NonIndicator />
						)}
						<Label isSelectedNode={isSelectedNode} labelClassName={labelClassName}>
							<Content {...stripKey("children", nodeData)} {...otherProps} />
						</Label>
					</React.Fragment>
				);
			}}
		</TreeContext.Consumer>
	</Leaf>
);
LeafNode.displayName = "LeafNode";

export const RootNode = ({ isSelectedNode, labelClassName, ...nodeData }) => (
	<Root>
		<Label isSelectedNode={isSelectedNode} labelClassName={labelClassName}>
			<TreeContext.Consumer>
				{({ Content, otherProps }) => <Content {...stripKey("children", nodeData)} {...otherProps} />}
			</TreeContext.Consumer>
		</Label>
	</Root>
);
RootNode.displayName = "RootNode";

export const Node = ({ root, id }) => (
	<TreeContext.Consumer>
		{({ openAll, getNode, selectedNodeId, nodeState, dark, labelClassName, leafClassName, branchClassName }) => {
			const nodeData = getNode(id);
			if (!nodeData) return null;
			const isSelectedNode = selectedNodeId === id;
			const open = root || openAll || nodeState[id] || false;

			return (
				<React.Fragment>
					{root ? (
						<RootNode {...nodeData} isSelectedNode={isSelectedNode} labelClassName={labelClassName} />
					) : (
						<LeafNode
							{...nodeData}
							open={open}
							dark={dark}
							isSelectedNode={isSelectedNode}
							labelClassName={labelClassName}
							leafClassName={leafClassName}
						/>
					)}
					{open && safeGet(nodeData, "children", "length") ? (
						<Branch dark={dark} branchClassName={branchClassName}>
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
