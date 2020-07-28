import React from "react";
import { useTableSelection } from "./useTableSelection";

const TestComp = ({ elements }) => {
	const [selectedNumber, tableSelectionStatus, selectionMethods] = useTableSelection(
		elements,
	);

	const onClick = evt => {
		selectionMethods.selectionHandler({ target: { checked: evt.value } }, evt.element);
	};

	const selectedOnes = elements
		.filter(x => selectionMethods.isSelected(x.key))
		.map(x => x.key)
		.join();

	return (
		<div onClick={onClick}>
			<div>{selectedNumber}</div>
			<div>{tableSelectionStatus}</div>
			<div>{selectedOnes}</div>
		</div>
	);
};

describe("useTableSelection", () => {
	let elements;
	beforeEach(() => {
		elements = [{ key: "a" }, { key: "b" }, { key: "c" }, { key: "d" }];
	});

	it("selection handlers initialize correctly", () => {
		expect(
			<TestComp elements={elements} />,
			"when mounted",
			"to satisfy",
			<div>
				<div>0</div>
				<div>1</div>
				<div />
			</div>,
		);
	});

	it("selection handlers works successfully", () => {
		expect(
			<TestComp elements={elements} />,
			"when mounted",
			"with event",
			{ type: "click", data: { element: "a", value: true } },
			"to satisfy",
			<div>
				<div>1</div>
				<div>2</div>
				<div>a</div>
			</div>,
		);
	});

	it("selection handlers works successfully when all is selected one by one", () => {
		expect(
			<TestComp elements={elements} />,
			"when mounted",
			"with event",
			{ type: "click", data: { element: "a", value: true } },
			"with event",
			{ type: "click", data: { element: "b", value: true } },
			"with event",
			{ type: "click", data: { element: "c", value: true } },
			"with event",
			{ type: "click", data: { element: "d", value: true } },
			"to satisfy",
			<div>
				<div>4</div>
				<div>3</div>
				<div>a,b,c,d</div>
			</div>,
		);
	});

	it("selection handlers works successfully when unselecting some", () => {
		expect(
			<TestComp elements={elements} />,
			"when mounted",
			"with event",
			{ type: "click", data: { element: null, value: true } },
			"with event",
			{ type: "click", data: { element: "b", value: false } },
			"with event",
			{ type: "click", data: { element: "c", value: false } },
			"to satisfy",
			<div>
				<div>2</div>
				<div>2</div>
				<div>a,d</div>
			</div>,
		);
	});

	it("selection handlers works successfully when unselecting all", () => {
		expect(
			<TestComp elements={elements} />,
			"when mounted",
			"with event",
			{ type: "click", data: { element: "a", value: true } },
			"with event",
			{ type: "click", data: { element: "b", value: true } },
			"with event",
			{ type: "click", data: { element: "c", value: true } },
			"with event",
			{ type: "click", data: { element: "d", value: true } },
			"with event",
			{ type: "click", data: { element: null, value: false } },
			"to satisfy",
			<div>
				<div>0</div>
				<div>1</div>
				<div />
			</div>,
		);
	});

	it("selection handlers works successfully when selecting all", () => {
		expect(
			<TestComp elements={elements} />,
			"when mounted",
			"with event",
			{ type: "click", data: { element: null, value: true } },
			"to satisfy",
			<div>
				<div>4</div>
				<div>3</div>
				<div>a,b,c,d</div>
			</div>,
		);
	});
});
