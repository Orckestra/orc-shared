import React from "react";
import Immutable from "immutable";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import sinon from "sinon";
import { getClassName, spyOnConsole } from "../../utils/testUtils";
import Treeview from "./index";
import { Branch, Wrapper } from "./Branch";
import { Leaf, Root } from "./Leaf";
import { Label, Indicator, BeforeIndicator, NonIndicator } from "./Label";

const TestNode = ({ id, updateNodeState, testVal, ...props }) => (
	<div {...props} id={id} onClick={() => updateNodeState(testVal)} />
);

describe("TreeView", () => {
	let getNode, nodes, store, state, testProps;
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
		testProps = {
			name: "testTree",
			rootId: "root1",
			Content: TestNode,
			getNode: getNode,
			openAll: false,
		};
		state = Immutable.fromJS({
			view: {
				testTree: {
					nodeState: {},
				},
			},
		});
		store = {
			getState: () => state,
			subscribe: () => {},
			dispatch: sinon.spy().named("dispatch"),
		};
	});

	describe("warning modes", () => {
		spyOnConsole(["warn"]);

		it("renders empty node contents if Content prop absent", () => {
			delete testProps.Content;
			expect(
				<Provider store={store}>
					<MemoryRouter>
						<Treeview {...testProps} />
					</MemoryRouter>
				</Provider>,
				"when mounted",
				"to satisfy",
				<Wrapper>
					<Root>
						<Label />
					</Root>
					<Branch>
						<Leaf>
							<BeforeIndicator />
							<Indicator />
							<Label />
						</Leaf>
						<Leaf>
							<NonIndicator />
							<Label />
						</Leaf>
					</Branch>
				</Wrapper>,
			).then(() => expect(console.warn, "was called"));
		});

		it("renders an empty wrapper if missing getNode", () => {
			delete testProps.getNode;
			return expect(
				<Provider store={store}>
					<MemoryRouter>
						<Treeview {...testProps} />
					</MemoryRouter>
				</Provider>,
				"when mounted",
				"to satisfy",
				<Wrapper />,
			).then(() => expect(console.warn, "was called"));
		});
	});

	it("shows a tree root and first level of child nodes", () =>
		expect(
			<Provider store={store}>
				<MemoryRouter>
					<Treeview {...testProps} />
				</MemoryRouter>
			</Provider>,
			"when mounted",
			"to satisfy",
			<Wrapper>
				<Root>
					<Label>
						<div id="root1" />
					</Label>
				</Root>
				<Branch>
					<Leaf>
						<BeforeIndicator />
						<Indicator />
						<Label>
							<div id="testNode1" />
						</Label>
					</Leaf>
					<Leaf>
						<NonIndicator />
						<Label>
							<div id="testNode2" />
						</Label>
					</Leaf>
				</Branch>
			</Wrapper>,
		));

	it("shows open nodes according to a default state", () =>
		expect(
			<Provider store={store}>
				<MemoryRouter>
					<Treeview {...testProps} defaultNodeState={{ testNode1: true }} />
				</MemoryRouter>
			</Provider>,
			"when mounted",
			"to satisfy",
			<Wrapper>
				<Root>
					<Label>
						<div id="root1" />
					</Label>
				</Root>
				<Branch>
					<Leaf>
						<BeforeIndicator />
						<Indicator open />
						<Label>
							<div id="testNode1" />
						</Label>
					</Leaf>
					<Branch>
						<Leaf>
							<BeforeIndicator />
							<Indicator />
							<Label>
								<div id="testNode3" />
							</Label>
						</Leaf>
						<Leaf>
							<NonIndicator />
							<Label>
								<div id="testNode4" />
							</Label>
						</Leaf>
					</Branch>
					<Leaf>
						<NonIndicator />
						<Label>
							<div id="testNode2" />
						</Label>
					</Leaf>
				</Branch>
			</Wrapper>,
		));

	it("shows an open branch according to view state", () => {
		state = state.setIn(["view", "testTree", "nodeState", "testNode1"], true);
		return expect(
			<Provider store={store}>
				<MemoryRouter>
					<Treeview {...testProps} />
				</MemoryRouter>
			</Provider>,
			"when mounted",
			"to satisfy",
			<Wrapper>
				<Root>
					<Label>
						<div id="root1" />
					</Label>
				</Root>
				<Branch>
					<Leaf>
						<BeforeIndicator />
						<Indicator open />
						<Label>
							<div id="testNode1" />
						</Label>
					</Leaf>
					<Branch>
						<Leaf>
							<BeforeIndicator />
							<Indicator />
							<Label>
								<div id="testNode3" />
							</Label>
						</Leaf>
						<Leaf>
							<NonIndicator />
							<Label>
								<div id="testNode4" />
							</Label>
						</Leaf>
					</Branch>
					<Leaf>
						<NonIndicator />
						<Label>
							<div id="testNode2" />
						</Label>
					</Leaf>
				</Branch>
			</Wrapper>,
		);
	});

	it("overrides view state with default node state", () => {
		state = state.setIn(["view", "testTree", "nodeState", "testNode1"], false);
		return expect(
			<Provider store={store}>
				<MemoryRouter>
					<Treeview {...testProps} defaultNodeState={{ testNode1: true }} />
				</MemoryRouter>
			</Provider>,
			"when mounted",
			"to satisfy",
			<Wrapper>
				<Root>
					<Label>
						<div id="root1" />
					</Label>
				</Root>
				<Branch>
					<Leaf>
						<BeforeIndicator />
						<Indicator open />
						<Label>
							<div id="testNode1" />
						</Label>
					</Leaf>
					<Branch>
						<Leaf>
							<BeforeIndicator />
							<Indicator />
							<Label>
								<div id="testNode3" />
							</Label>
						</Leaf>
						<Leaf>
							<NonIndicator />
							<Label>
								<div id="testNode4" />
							</Label>
						</Leaf>
					</Branch>
					<Leaf>
						<NonIndicator />
						<Label>
							<div id="testNode2" />
						</Label>
					</Leaf>
				</Branch>
			</Wrapper>,
		);
	});

	it("updates view state on indicator click", () => {
		state = state.setIn(["view", "testTree", "nodeState", "testNode3"], true);
		return expect(
			<Provider store={store}>
				<MemoryRouter>
					<Treeview {...testProps} />
				</MemoryRouter>
			</Provider>,
			"when mounted",
			"with event",
			{
				type: "click",
				target:
					"." +
					getClassName(<Branch />) +
					" ." +
					getClassName(<Leaf />) +
					" ." +
					getClassName(<Indicator />),
			},
			"to satisfy",
			<Wrapper>
				<Root>
					<Label>
						<div id="root1" />
					</Label>
				</Root>
				<Branch>
					<Leaf>
						<BeforeIndicator />
						<Indicator />
						<Label>
							<div id="testNode1" />
						</Label>
					</Leaf>
					<Leaf>
						<NonIndicator />
						<Label>
							<div id="testNode2" />
						</Label>
					</Leaf>
				</Branch>
			</Wrapper>,
		).then(() =>
			expect(store.dispatch, "to have calls satisfying", [
				{
					args: [
						{
							type: "VIEW_STATE_SET_FIELD",
							payload: {
								name: "testTree",
								field: "nodeState",
								value: expect.it("to equal", {
									testNode1: true,
									testNode3: true,
								}),
							},
						},
					],
				},
			]),
		);
	});

	it("shows all nodes if openAll flag is set", () =>
		expect(
			<Provider store={store}>
				<MemoryRouter>
					<Treeview {...testProps} openAll />
				</MemoryRouter>
			</Provider>,
			"when mounted",
			"to satisfy",
			<Wrapper>
				<Root>
					<Label>
						<div id="root1" />
					</Label>
				</Root>
				<Branch>
					<Leaf>
						<BeforeIndicator />
						<Indicator open />
						<Label>
							<div id="testNode1" />
						</Label>
					</Leaf>
					<Branch>
						<Leaf>
							<BeforeIndicator />
							<Indicator open />
							<Label>
								<div id="testNode3" />
							</Label>
						</Leaf>
						<Branch>
							<Leaf>
								<NonIndicator />
								<Label>
									<div id="testNode5" />
								</Label>
							</Leaf>
						</Branch>
						<Leaf>
							<NonIndicator />
							<Label>
								<div id="testNode4" />
							</Label>
						</Leaf>
					</Branch>
					<Leaf>
						<NonIndicator />
						<Label>
							<div id="testNode2" />
						</Label>
					</Leaf>
				</Branch>
			</Wrapper>,
		));

	it("passes unknown props to all nodes", () =>
		expect(
			<Provider store={store}>
				<MemoryRouter>
					<Treeview {...testProps} openAll data-test-info="A test data variable" />
				</MemoryRouter>
			</Provider>,
			"when mounted",
			"to satisfy",
			<Wrapper>
				<Root>
					<Label>
						<div id="root1" data-test-info="A test data variable" />
					</Label>
				</Root>
				<Branch>
					<Leaf>
						<BeforeIndicator />
						<Indicator open />
						<Label>
							<div id="testNode1" data-test-info="A test data variable" />
						</Label>
					</Leaf>
					<Branch>
						<Leaf>
							<BeforeIndicator />
							<Indicator open />
							<Label>
								<div id="testNode3" data-test-info="A test data variable" />
							</Label>
						</Leaf>
						<Branch>
							<Leaf>
								<NonIndicator />
								<Label>
									<div id="testNode5" data-test-info="A test data variable" />
								</Label>
							</Leaf>
						</Branch>
						<Leaf>
							<NonIndicator />
							<Label>
								<div id="testNode4" data-test-info="A test data variable" />
							</Label>
						</Leaf>
					</Branch>
					<Leaf>
						<NonIndicator />
						<Label>
							<div id="testNode2" data-test-info="A test data variable" />
						</Label>
					</Leaf>
				</Branch>
			</Wrapper>,
		));
});
