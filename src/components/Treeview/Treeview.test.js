import React from "react";
import Immutable from "immutable";
import sinon from "sinon";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { Treeview, withNodeState } from "./index";
import { Root } from "./Leaf";
import { Label } from "./Label";

const TestNode = ({ id, updateNodeState, testVal }) => (
	<div id={id} onClick={() => updateNodeState(testVal)} />
);

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
		nodeState = { testNode1: true, testNode3: false };
		updateNodeState = () => {};
		otherProps = { someProp: "A string", otherThing: { isObj: true } };
	});

	it("shows a tree root", () =>
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
			"when mounted",
			"to contain",
			<Root>
				<Label>
					<div id="root1" />
				</Label>
			</Root>,
		));
});

describe("withNodeState", () => {
	let store, state;
	beforeEach(() => {
		state = Immutable.fromJS({
			view: {
				test1: {
					nodeState: { node1: true, node2: false },
				},
			},
		});
		store = {
			getState: () => state,
			subscribe: () => {},
			dispatch: sinon.spy().named("dispatch"),
		};
	});

	it("maps view state to node state", () =>
		expect(withNodeState, "called with", [TestNode]).then(EnhNode =>
			expect(
				<Provider store={store}>
					<MemoryRouter>
						<EnhNode
							name="test1"
							foo="bar"
							defaultNodeState={{ node2: true, node3: true }}
						/>
					</MemoryRouter>
				</Provider>,
				"when mounted",
				"to satisfy",
				<TestNode
					nodeState={{ node1: true, node2: false, node3: true }}
					updateNodeState={expect.it("to be a function")}
					foo="bar"
				/>,
			),
		));

	it("can update node state", () =>
		expect(withNodeState, "called with", [TestNode])
			.then(EnhNode =>
				expect(
					<Provider store={store}>
						<MemoryRouter>
							<EnhNode
								name="test1"
								foo="bar"
								testVal={{ node1: true, node2: true }}
							/>
						</MemoryRouter>
					</Provider>,
					"when mounted",
					"with event",
					{ type: "click" },
				),
			)
			.then(() =>
				expect(store.dispatch, "to have calls satisfying", [
					{
						args: [
							{
								type: "VIEW_STATE_SET_FIELD",
								payload: {
									name: "test1",
									field: "nodeState",
									value: { node1: true, node2: true },
								},
							},
						],
					},
				]),
			));
});
