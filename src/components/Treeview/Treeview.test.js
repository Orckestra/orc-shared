import React from "react";
import Treeview from "./index";
import Node from "./Node";

const TestNode = ({ id }) => <div id={id} />;

describe("TreeView", () => {
	let getNode, nodes, rootId, openAll, nodeState, updateNodeState, otherProps;
	beforeEach(() => {
		nodes = {
			root1: {
				id: "root1",
				children: ["testNode1", "testNode2"],
			},
			testNode1: {
				id: "testNode1",
				children: ["testNode3", "testNode4"],
			},
			testNode2: { id: "testNode2", name: "Test Node 2" },
			testNode3: {
				id: "testNode3",
				children: ["testNode5"],
			},
			testNode4: { id: "testNode4" },
			testNode5: { id: "testNode5" },
		};
		getNode = name => nodes[name];
		rootId = "root1";
		openAll = false;
		nodeState = { testNode1: true };
		updateNodeState = () => {};
		otherProps = { someProp: "A string", otherThing: { isObj: true } };
	});

	it("shows a tree", () =>
		expect(
			<Treeview
				rootId={rootId}
				/* Below props are passed via context */
				Content={TestNode}
				getNode={getNode}
				openAll={openAll}
				nodeState={nodeState}
				updateNodeState={updateNodeState}
				{...otherProps}
			/>,
			"when rendered",
			"to contain with all attributes",
			<Node root id="root1" />,
		));
});
