import React from "react";
import sinon from "sinon";
import Node, { RootNode, LeafNode, TreeContext } from "./Node";
import { Branch } from "./Branch";
import { Leaf, Root } from "./Leaf";
import { Indicator, NonIndicator, Label } from "./Label";

const TestComp = () => <div />;

describe("RootNode", () => {
	let contextValue, Wrap;
	beforeEach(() => {
		contextValue = {
			Content: TestComp,
			otherProps: { foo: true, bar: false },
		};
		Wrap = props => (
			<TreeContext.Provider value={contextValue}>
				{props.children}
			</TreeContext.Provider>
		);
	});

	it("renders a root node", () =>
		expect(
			<Wrap>
				<RootNode thing="stuff" />
			</Wrap>,
			"to deeply render as",
			<Root>
				<Label>
					<TestComp thing="stuff" foo={true} bar={false} />
				</Label>
			</Root>,
		));
});

describe("LeafNode", () => {
	let contextValue, Wrap, updater;
	beforeEach(() => {
		updater = sinon.spy().named("updater");
		contextValue = {
			Content: TestComp,
			openAll: false,
			nodeState: { otherNode: false },
			updateNodeState: updater,
			otherProps: { foo: true, bar: false },
		};
		Wrap = props => (
			<TreeContext.Provider value={contextValue}>
				{props.children}
			</TreeContext.Provider>
		);
	});

	it("renders a closed node with children", () =>
		expect(
			<Wrap>
				<LeafNode thing="stuff" id="testNode" children={["foo"]} />
			</Wrap>,
			"to deeply render as",
			<Leaf>
				<Indicator open={undefined} onClick={expect.it("to be a function")} />
				<Label>
					<TestComp thing="stuff" foo={true} bar={false} />
				</Label>
			</Leaf>,
		));

	it("renders a closed node with children", () =>
		expect(
			<Wrap>
				<LeafNode open thing="stuff" id="testNode" children={["foo"]} />
			</Wrap>,
			"to deeply render as",
			<Leaf>
				<Indicator open={true} onClick={expect.it("to be a function")} />
				<Label>
					<TestComp thing="stuff" foo={true} bar={false} />
				</Label>
			</Leaf>,
		));

	it("renders a node with no children", () =>
		expect(
			<Wrap>
				<LeafNode thing="stuff" id="testNode" />
			</Wrap>,
			"to deeply render as",
			<Leaf>
				<NonIndicator />
				<Label>
					<TestComp thing="stuff" foo={true} bar={false} />
				</Label>
			</Leaf>,
		));

	it("updates nodeState on click on the indicator, opening if closed", () =>
		expect(
			<Wrap>
				<LeafNode thing="stuff" id="testNode" children={["foo"]} />
			</Wrap>,
			"when deeply rendered",
			"with event click",
			"on",
			<Indicator />,
		).then(() =>
			expect(updater, "to have calls satisfying", [
				{ args: [{ otherNode: false, testNode: true }] },
			]),
		));

	it("updates nodeState on click on the indicator, closing if open", () =>
		expect(
			<Wrap>
				<LeafNode open thing="stuff" id="testNode" children={["foo"]} />
			</Wrap>,
			"when deeply rendered",
			"with event click",
			"on",
			<Indicator />,
		).then(() =>
			expect(updater, "to have calls satisfying", [
				{ args: [{ otherNode: false, testNode: false }] },
			]),
		));
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
			Content: TestComp,
			openAll: false,
			getNode: id => nodes[id],
			nodeState: { hasKids: true },
			updateNodeState: () => {},
			otherProps: { foo: true, bar: false },
		};
		Wrap = props => (
			<TreeContext.Provider value={contextValue}>
				{props.children}
			</TreeContext.Provider>
		);
	});

	it("renders a nonexistent node as nothing", () =>
		expect(
			<Wrap>
				<Node id="nonExistent" />
			</Wrap>,
			"when deeply rendered",
		).then(render =>
			expect(render, "not to contain", <LeafNode />).and(
				"not to contain",
				<Branch />,
			),
		));

	it("renders a childless node as only the leaf", () =>
		expect(
			<Wrap>
				<Node id="exists" />
			</Wrap>,
			"when deeply rendered",
		).then(render =>
			expect(
				render,
				"queried for",
				<LeafNode />,
				"to have rendered with all attributes",
				<LeafNode id="exists" other="data" open={false} />,
			).and("not to contain", <Branch />),
		));

	it("renders a childless root node as only the leaf", () =>
		expect(
			<Wrap>
				<Node root id="exists" />
			</Wrap>,
			"when deeply rendered",
		).then(render =>
			expect(
				render,
				"queried for",
				<RootNode />,
				"to have rendered with all attributes",
				<RootNode id="exists" other="data" />,
			).and("not to contain", <Branch />),
		));

	it("renders a node with children as leaf and branch", () =>
		expect(
			<Wrap>
				<Node id="hasKids" />
			</Wrap>,
			"when deeply rendered",
		).then(render =>
			expect(
				render,
				"queried for",
				<LeafNode />,
				"to have rendered with all attributes",
				<LeafNode id="hasKids" other="info" open={true} />,
			).and(
				"queried for",
				<Branch />,
				"to have rendered",
				<Branch>
					<Node id="exists" />
				</Branch>,
			),
		));

	it("renders a closed node with children as only the leaf", () =>
		expect(
			<Wrap>
				<Node id="isClosed" />
			</Wrap>,
			"when deeply rendered",
		).then(render =>
			expect(
				render,
				"queried for",
				<LeafNode />,
				"to have rendered with all attributes",
				<LeafNode id="isClosed" other="stuff" open={false} />,
			).and("not to contain", <Branch />),
		));

	it("renders a root node with children as leaf and branch", () =>
		expect(
			<Wrap>
				<Node root id="isClosed" />
			</Wrap>,
			"when deeply rendered",
		).then(render =>
			expect(
				render,
				"queried for",
				<RootNode />,
				"to have rendered with all attributes",
				<RootNode id="isClosed" other="stuff" />,
			).and(
				"queried for",
				<Branch />,
				"to have rendered",
				<Branch>
					<Node id="hasKids" />
				</Branch>,
			),
		));

	describe("with openAll set", () => {
		beforeEach(() => {
			contextValue.openAll = true;
		});

		it("renders a node with children as leaf and branch", () =>
			expect(
				<Wrap>
					<Node id="hasKids" />
				</Wrap>,
				"when deeply rendered",
			).then(render =>
				expect(
					render,
					"queried for",
					<LeafNode />,
					"to have rendered with all attributes",
					<LeafNode id="hasKids" other="info" open={true} />,
				).and(
					"queried for",
					<Branch />,
					"to have rendered",
					<Branch>
						<Node id="exists" />
					</Branch>,
				),
			));

		it("renders a closed node with children as if open", () =>
			expect(
				<Wrap>
					<Node id="isClosed" />
				</Wrap>,
				"when deeply rendered",
			).then(render =>
				expect(
					render,
					"queried for",
					<LeafNode />,
					"to have rendered with all attributes",
					<LeafNode id="isClosed" other="stuff" open={true} />,
				).and(
					"queried for",
					<Branch />,
					"to have rendered",
					<Branch>
						<Node id="hasKids" />
					</Branch>,
				),
			));
	});
});
