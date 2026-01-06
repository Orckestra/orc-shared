import React from "react";
import Immutable from "immutable";
import sinon from "sinon";
import { spyOnConsole, TestWrapper } from "../../utils/testUtils";
import Treeview from "./index";
import { Branch, Wrapper } from "./Branch";
import { Leaf, Root } from "./Leaf";
import { Label, Indicator, BeforeIndicator, NonIndicator } from "./Label";
import { createMuiTheme } from "../../utils/testUtils";

const theme = createMuiTheme();

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
				<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }} memoryRouter={{}}>
					<Treeview {...testProps} />
				</TestWrapper>,
				"when mounted",
				"to satisfy",
				<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }}>
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
					</Wrapper>
				</TestWrapper>,
			).then(() => expect(console.warn, "was called"));
		});

		it("renders an empty wrapper if missing getNode", () => {
			delete testProps.getNode;
			return expect(
				<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }} memoryRouter={{}}>
					<Treeview {...testProps} />
				</TestWrapper>,
				"when mounted",
				"to satisfy",
				<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }} memoryRouter={{}}>
					<Wrapper />
				</TestWrapper>,
			).then(() => expect(console.warn, "was called"));
		});
	});

	it("shows a tree root and first level of child nodes", () =>
		expect(
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }} memoryRouter={{}}>
				<Treeview {...testProps} />
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }} memoryRouter={{}}>
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
				</Wrapper>
			</TestWrapper>,
		));

	it("shows open nodes according to a default state", () =>
		expect(
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }} memoryRouter={{}}>
				<Treeview {...testProps} defaultNodeState={{ testNode1: true }} />
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }} memoryRouter={{}}>
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
				</Wrapper>
			</TestWrapper>,
		));

	it("shows an open branch according to view state", () => {
		state = state.setIn(["view", "testTree", "nodeState", "testNode1"], true);
		return expect(
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }} memoryRouter={{}}>
				<Treeview {...testProps} />
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }} memoryRouter={{}}>
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
				</Wrapper>
			</TestWrapper>,
		);
	});

	it("shows a selected node", () => {
		state = state.setIn(["view", "testTree", "nodeState", "testNode1"], true);
		testProps.selectedNodeId = "testNode1";
		return expect(
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }} memoryRouter={{}}>
				<Treeview {...testProps} />
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }} memoryRouter={{}}>
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
							<Label isSelectedNode={true}>
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
				</Wrapper>
			</TestWrapper>,
		);
	});

	it("overrides default node state with view state", () => {
		state = state.setIn(["view", "testTree", "nodeState", "testNode1"], false);
		return expect(
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }} memoryRouter={{}}>
				<Treeview {...testProps} defaultNodeState={{ testNode1: true }} />
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }} memoryRouter={{}}>
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
				</Wrapper>
			</TestWrapper>,
		);
	});

	it("updates view state on indicator click", () => {
		state = state.setIn(["view", "testTree", "nodeState", "testNode3"], true);
		return expect(
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }} memoryRouter={{}}>
				<Treeview {...testProps} />
			</TestWrapper>,
			"when mounted",
			"with event",
			{
				type: "click",
				target: '[data-qa="branch"]' + " " + '[data-qa="leaf"]' + " " + '[data-qa="indicator"]',
			},
			"to satisfy",
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }} memoryRouter={{}}>
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
				</Wrapper>
			</TestWrapper>,
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
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }} memoryRouter={{}}>
				<Treeview {...testProps} openAll />
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }} memoryRouter={{}}>
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
				</Wrapper>
			</TestWrapper>,
		));

	it("passes unknown props to all nodes", () =>
		expect(
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }} memoryRouter={{}}>
				<Treeview {...testProps} openAll data-test-info="A test data variable" />
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }} memoryRouter={{}}>
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
				</Wrapper>
			</TestWrapper>,
		));
});
