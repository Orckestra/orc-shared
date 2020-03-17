import React from "react";
import sinon from "sinon";
import { Ignore } from "unexpected-reaction";
import { getStyledClassSelector, PropStruct } from "../../utils/testUtils";
import Node, { RootNode, LeafNode, TreeContext } from "./Node";
import { Branch } from "./Branch";
import { Leaf, Root } from "./Leaf";
import { BeforeIndicator, Indicator, NonIndicator, Label } from "./Label";

describe("RootNode", () => {
	let contextValue, Wrap;
	beforeEach(() => {
		contextValue = {
			Content: PropStruct,
			otherProps: { foo: true, bar: false },
		};
		Wrap = props => (
			<TreeContext.Provider value={contextValue}>{props.children}</TreeContext.Provider>
		);
	});

	it("renders a root node", () =>
		expect(
			<Wrap>
				<RootNode thing="stuff" />
			</Wrap>,
			"when mounted",
			"to satisfy",
			<Root>
				<Label>
					<PropStruct thing="stuff" foo={true} bar={false} />
				</Label>
			</Root>,
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
		Wrap = props => (
			<TreeContext.Provider value={contextValue}>{props.children}</TreeContext.Provider>
		);
	});

	it("renders a closed node with children", () =>
		expect(
			<Wrap>
				<LeafNode thing="stuff" id="testNode" children={["foo"]} />
			</Wrap>,
			"when mounted",
			"to satisfy",
			<Leaf>
				<BeforeIndicator />
				<Indicator open={undefined} onClick={expect.it("to be a function")} />
				<Label>
					<PropStruct thing="stuff" id="testNode" foo={true} bar={false} />
				</Label>
			</Leaf>,
		));

	it("renders a closed node with children", () =>
		expect(
			<Wrap>
				<LeafNode open thing="stuff" id="testNode" children={["foo"]} />
			</Wrap>,
			"when mounted",
			"to satisfy",
			<Leaf>
				<BeforeIndicator />
				<Indicator open={true} onClick={expect.it("to be a function")} />
				<Label>
					<PropStruct open={true} thing="stuff" id="testNode" foo={true} bar={false} />
				</Label>
			</Leaf>,
		));

	it("renders a node with no children", () =>
		expect(
			<Wrap>
				<LeafNode thing="stuff" id="testNode" />
			</Wrap>,
			"when mounted",
			"to satisfy",
			<Leaf>
				<NonIndicator />
				<Label>
					<PropStruct thing="stuff" id="testNode" foo={true} bar={false} />
				</Label>
			</Leaf>,
		));

	it("updates nodeState on click on the indicator, opening if closed", () =>
		expect(
			<Wrap>
				<LeafNode thing="stuff" id="testNode" children={["foo"]} />
			</Wrap>,
			"when mounted",
			"with event",
			{ type: "click", target: getStyledClassSelector(<Indicator />) },
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
			"when mounted",
			"with event",
			{ type: "click", target: getStyledClassSelector(<Indicator />) },
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
			<Wrap>
				<Node id="nonExistent" />
			</Wrap>,
			"when mounted",
			"to satisfy",
			expect.it("not to contain", <Leaf />).and("not to contain", <Branch />),
		));

	it("renders a childless node as only the leaf", () =>
		expect(
			<Wrap>
				<Node id="exists" />
			</Wrap>,
			"when mounted",
			"to satisfy",
			expect
				.it(
					"to satisfy",
					<div>
						<Leaf>
							<NonIndicator />
							<Ignore />
						</Leaf>
					</div>,
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
			<Wrap>
				<Node root id="exists" />
			</Wrap>,
			"when mounted",
			"to satisfy",
			expect
				.it(
					"to satisfy",
					<div>
						<Root>
							<Ignore />
						</Root>
					</div>,
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
			<Wrap>
				<Node id="hasKids" />
			</Wrap>,
			"when mounted",
			"to satisfy",
			expect
				.it(
					"to satisfy",
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
					</div>,
				)
				.and(
					"queried for first",
					"#hasKids",
					"to satisfy",
					<PropStruct id="hasKids" other="info" open={true} foo={true} bar={false} />,
				)
				.and(
					"queried for first",
					getStyledClassSelector(<Branch />),
					"to contain",
					<PropStruct id="exists" other="data" open={false} foo={true} bar={false} />,
				),
		));

	it("renders a closed node with children as only the leaf", () =>
		expect(
			<Wrap>
				<Node id="isClosed" />
			</Wrap>,
			"when mounted",
			"to satisfy",
			expect
				.it(
					"to satisfy",
					<div>
						<Leaf>
							<BeforeIndicator />
							<Indicator />
							<Label>
								<Ignore />
							</Label>
						</Leaf>
					</div>,
				)
				.and(
					"queried for first",
					"#isClosed",
					"to satisfy",
					<PropStruct id="isClosed" other="stuff" open={false} foo={true} bar={false} />,
				)
				.and("not to contain elements matching", "#hasKids"),
		));

	it("renders a root node with children as leaf and branch", () =>
		expect(
			<Wrap>
				<Node root id="isClosed" />
			</Wrap>,
			"when mounted",
			"to satisfy",
			expect
				.it(
					"to satisfy",
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
					</div>,
				)
				.and(
					"queried for first",
					"#isClosed",
					"to satisfy",
					<PropStruct id="isClosed" other="stuff" foo={true} bar={false} />,
				)
				.and(
					"to contain",
					<PropStruct id="hasKids" other="info" open={true} foo={true} bar={false} />,
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
				"when mounted",
				"to satisfy",
				expect
					.it(
						"to satisfy",
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
						</div>,
					)
					.and(
						"queried for first",
						"#hasKids",
						"to satisfy",
						<PropStruct id="hasKids" other="info" open={true} foo={true} bar={false} />,
					)
					.and(
						"queried for first",
						getStyledClassSelector(<Branch />),
						"to contain",
						<PropStruct id="exists" other="data" open={true} foo={true} bar={false} />,
					),
			));

		it("renders a closed node with children as if open", () =>
			expect(
				<Wrap>
					<Node id="isClosed" />
				</Wrap>,
				"when mounted",
				"to satisfy",
				expect
					.it(
						"to satisfy",
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
						</div>,
					)
					.and(
						"queried for first",
						"#isClosed",
						"to satisfy",
						<PropStruct id="isClosed" other="stuff" open={true} foo={true} bar={false} />,
					)
					.and(
						"queried for first",
						getStyledClassSelector(<Branch />),
						"to contain",
						<PropStruct id="hasKids" other="info" open={true} foo={true} bar={false} />,
					),
			));
	});
});
