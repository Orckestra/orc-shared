import React from "react";
import sinon from "sinon";
import { Ignore } from "unexpected-reaction";
import { PropStruct, TestWrapper } from "../../utils/testUtils";
import Node, { RootNode, LeafNode, TreeContext } from "./Node";
import { Branch } from "./Branch";
import { Leaf, Root } from "./Leaf";
import { BeforeIndicator, Indicator, NonIndicator, Label } from "./Label";
import { createMuiTheme } from "../../utils/testUtils";

const theme = createMuiTheme();

describe("RootNode", () => {
	let contextValue, Wrap;
	beforeEach(() => {
		contextValue = {
			Content: PropStruct,
			otherProps: { foo: true, bar: false },
		};
		Wrap = props => <TreeContext.Provider value={contextValue}>{props.children}</TreeContext.Provider>;
	});

	it("renders a root node", () =>
		expect(
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<Wrap>
					<RootNode thing="stuff" />
				</Wrap>
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<Root>
					<Label>
						<PropStruct thing="stuff" foo={true} bar={false} />
					</Label>
				</Root>
			</TestWrapper>,
		));

	it("renders a selected root node", () =>
		expect(
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<Wrap>
					<RootNode thing="stuff" isSelectedNode={true} />
				</Wrap>
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<Root>
					<Label isSelectedNode={true}>
						<PropStruct thing="stuff" foo={true} bar={false} />
					</Label>
				</Root>
			</TestWrapper>,
		));
});

describe("LeafNode", () => {
	let contextValue, Wrap, updater;
	beforeEach(() => {
		updater = sinon.spy().named("updater");
		contextValue = {
			Content: PropStruct,
			openAll: false,
			nodeState: { otherNode: false },
			updateNodeState: updater,
			otherProps: { foo: true, bar: false },
		};
		Wrap = props => <TreeContext.Provider value={contextValue}>{props.children}</TreeContext.Provider>;
	});

	it("renders a closed node with children", () =>
		expect(
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<Wrap>
					<LeafNode thing="stuff" id="testNode" children={["foo"]} />
				</Wrap>
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<Leaf>
					<BeforeIndicator />
					<Indicator open={undefined} onClick={expect.it("to be a function")} />
					<Label>
						<PropStruct thing="stuff" id="testNode" foo={true} bar={false} />
					</Label>
				</Leaf>
			</TestWrapper>,
		));

	it("renders a closed node with children", () =>
		expect(
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<Wrap>
					<LeafNode open thing="stuff" id="testNode" children={["foo"]} />
				</Wrap>
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<Leaf>
					<BeforeIndicator />
					<Indicator open={true} onClick={expect.it("to be a function")} />
					<Label>
						<PropStruct open={true} thing="stuff" id="testNode" foo={true} bar={false} />
					</Label>
				</Leaf>
			</TestWrapper>,
		));

	it("renders a node with no children", () =>
		expect(
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<Wrap>
					<LeafNode thing="stuff" id="testNode" />
				</Wrap>
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<Leaf>
					<NonIndicator />
					<Label>
						<PropStruct thing="stuff" id="testNode" foo={true} bar={false} />
					</Label>
				</Leaf>
			</TestWrapper>,
		));

	it("renders a selected node", () =>
		expect(
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<Wrap>
					<LeafNode thing="stuff" id="testNode" isSelectedNode={true} />
				</Wrap>
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<Leaf>
					<NonIndicator />
					<Label isSelectedNode={true}>
						<PropStruct thing="stuff" id="testNode" foo={true} bar={false} />
					</Label>
				</Leaf>
			</TestWrapper>,
		));

	it("updates nodeState on click on the indicator, opening if closed", () =>
		expect(
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<Wrap>
					<LeafNode thing="stuff" id="testNode" children={["foo"]} />
				</Wrap>
			</TestWrapper>,
			"when mounted",
			"with event",
			{ type: "click", target: '[data-qa="indicator"]' },
		).then(() => expect(updater, "to have calls satisfying", [{ args: [{ otherNode: false, testNode: true }] }])));

	it("updates nodeState on click on the indicator, closing if open", () =>
		expect(
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<Wrap>
					<LeafNode open thing="stuff" id="testNode" children={["foo"]} />
				</Wrap>
			</TestWrapper>,
			"when mounted",
			"with event",
			{ type: "click", target: '[data-qa="indicator"]' },
		).then(() => expect(updater, "to have calls satisfying", [{ args: [{ otherNode: false, testNode: false }] }])));
});

describe("Node", () => {
	let contextValue, Wrap, nodes;
	beforeEach(() => {
		nodes = {
			exists: { id: "exists", other: "data" },
			hasKids: { id: "hasKids", children: ["exists"], other: "info" },
			isClosed: { id: "isClosed", children: ["hasKids"], other: "stuff" },
		};
		contextValue = {
			Content: PropStruct,
			openAll: false,
			getNode: id => nodes[id],
			nodeState: { hasKids: true },
			updateNodeState: () => {},
			otherProps: { foo: true, bar: false },
		};
		Wrap = props => (
			<div>
				<TreeContext.Provider value={contextValue}>{props.children}</TreeContext.Provider>
			</div>
		);
	});

	it("renders a nonexistent node as nothing", () =>
		expect(
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<Wrap>
					<Node id="nonExistent" />
				</Wrap>
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			expect.it("not to contain", <Leaf />).and("not to contain", <Branch />),
		));

	it("renders a childless node as only the leaf", () =>
		expect(
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<Wrap>
					<Node id="exists" />
				</Wrap>
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			expect
				.it(
					"to satisfy",
					<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
						<div>
							<Leaf>
								<NonIndicator />
								<Ignore />
							</Leaf>
						</div>
					</TestWrapper>,
				)
				.and(
					"queried for first",
					"#exists",
					"to satisfy",
					<PropStruct id="exists" other="data" open={false} foo={true} bar={false} />,
				)
				.and("not to contain", <Branch />),
		));

	it("renders a childless root node as only the leaf", () =>
		expect(
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<Wrap>
					<Node root id="exists" />
				</Wrap>
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			expect
				.it(
					"to satisfy",
					<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
						<div>
							<Root>
								<Ignore />
							</Root>
						</div>
					</TestWrapper>,
				)
				.and(
					"queried for first",
					"#exists",
					"to satisfy",
					<PropStruct id="exists" other="data" foo={true} bar={false} />,
				)
				.and("not to contain", <Branch />),
		));

	it("renders a node with children as leaf and branch", () =>
		expect(
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<Wrap>
					<Node id="hasKids" />
				</Wrap>
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			expect
				.it(
					"to satisfy",
					<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
						<div>
							<Leaf>
								<BeforeIndicator />
								<Indicator open />
								<Label>
									<Ignore />
								</Label>
							</Leaf>
							<Branch>
								<Leaf>
									<Ignore />
									<Ignore />
								</Leaf>
							</Branch>
						</div>
					</TestWrapper>,
				)
				.and(
					"queried for first",
					"#hasKids",
					"to satisfy",
					<PropStruct id="hasKids" other="info" open={true} foo={true} bar={false} />,
				)
				.and(
					"queried for first",
					"[data-qa='branch']",
					"to contain",
					<PropStruct id="exists" other="data" open={false} foo={true} bar={false} />,
				),
		));

	it("renders a selected node", () => {
		contextValue.selectedNodeId = "hasKids";
		expect(
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<Wrap>
					<Node id="hasKids" />
				</Wrap>
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			expect.it(
				"to satisfy",
				<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
					<div>
						<Leaf>
							<BeforeIndicator />
							<Indicator open />
							<Label isSelectedNode={true}>
								<Ignore />
							</Label>
						</Leaf>
						<Branch>
							<Leaf>
								<Ignore />
								<Ignore />
							</Leaf>
						</Branch>
					</div>
				</TestWrapper>,
			),
		);
	});

	it("renders a closed node with children as only the leaf", () =>
		expect(
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<Wrap>
					<Node id="isClosed" />
				</Wrap>
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			expect
				.it(
					"to satisfy",
					<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
						<div>
							<Leaf>
								<BeforeIndicator />
								<Indicator />
								<Label>
									<Ignore />
								</Label>
							</Leaf>
						</div>
					</TestWrapper>,
				)
				.and(
					"queried for first",
					"#isClosed",
					"to satisfy",
					<PropStruct id="isClosed" other="stuff" open={false} foo={true} bar={false} />,
				)
				.and("not to contain elements matching", "#hasKids"),
		));

	it("renders a selected root node", () => {
		contextValue.selectedNodeId = "isClosed";
		expect(
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<Wrap>
					<Node root id="isClosed" />
				</Wrap>
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			expect.it(
				"to satisfy",
				<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
					<div>
						<Root>
							<Label isSelectedNode={true}>
								<Ignore />
							</Label>
						</Root>
						<Branch>
							<Leaf>
								<Ignore />
								<Ignore />
								<Ignore />
							</Leaf>
							<Branch>
								<Ignore />
							</Branch>
						</Branch>
					</div>
				</TestWrapper>,
			),
		);
	});

	it("renders a root node with children as leaf and branch", () =>
		expect(
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<Wrap>
					<Node root id="isClosed" />
				</Wrap>
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			expect
				.it(
					"to satisfy",
					<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
						<div>
							<Root>
								<Label>
									<Ignore />
								</Label>
							</Root>
							<Branch>
								<Leaf>
									<Ignore />
									<Ignore />
									<Ignore />
								</Leaf>
								<Branch>
									<Ignore />
								</Branch>
							</Branch>
						</div>
					</TestWrapper>,
				)
				.and(
					"queried for first",
					"#isClosed",
					"to satisfy",
					<PropStruct id="isClosed" other="stuff" foo={true} bar={false} />,
				)
				.and("to contain", <PropStruct id="hasKids" other="info" open={true} foo={true} bar={false} />),
		));

	describe("with openAll set", () => {
		beforeEach(() => {
			contextValue.openAll = true;
		});

		it("renders a node with children as leaf and branch", () =>
			expect(
				<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
					<Wrap>
						<Node id="hasKids" />
					</Wrap>
				</TestWrapper>,
				"when mounted",
				"to satisfy",
				expect
					.it(
						"to satisfy",
						<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
							<div>
								<Leaf>
									<BeforeIndicator />
									<Indicator open />
									<Label>
										<Ignore />
									</Label>
								</Leaf>
								<Branch>
									<Leaf>
										<Ignore />
										<Ignore />
									</Leaf>
								</Branch>
							</div>
						</TestWrapper>,
					)
					.and(
						"queried for first",
						"#hasKids",
						"to satisfy",
						<PropStruct id="hasKids" other="info" open={true} foo={true} bar={false} />,
					)
					.and(
						"queried for first",
						"[data-qa='branch']",
						"to contain",
						<PropStruct id="exists" other="data" open={true} foo={true} bar={false} />,
					),
			));

		it("renders a closed node with children as if open", () =>
			expect(
				<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
					<Wrap>
						<Node id="isClosed" />
					</Wrap>
				</TestWrapper>,
				"when mounted",
				"to satisfy",
				expect
					.it(
						"to satisfy",
						<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
							<div>
								<Leaf>
									<BeforeIndicator />
									<Indicator open />
									<Label>
										<Ignore />
									</Label>
								</Leaf>
								<Branch>
									<Leaf>
										<Ignore />
										<Ignore />
										<Ignore />
									</Leaf>
									<Branch>
										<Ignore />
									</Branch>
								</Branch>
							</div>
						</TestWrapper>,
					)
					.and(
						"queried for first",
						"#isClosed",
						"to satisfy",
						<PropStruct id="isClosed" other="stuff" open={true} foo={true} bar={false} />,
					)
					.and(
						"queried for first",
						"[data-qa='branch']",
						"to contain",
						<PropStruct id="hasKids" other="info" open={true} foo={true} bar={false} />,
					),
			));
	});
});
