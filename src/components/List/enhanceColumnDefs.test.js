import sinon from "sinon";
import enhanceColumnDefs from "./enhanceColumnDefs";

describe("enhanceColumnDefs", () => {
	let sorting,
		selection,
		updateViewState,
		columnDefs,
		mockEvent,
		stopPropagations;
	beforeEach(() => {
		sorting = {};
		selection = [];
		updateViewState = sinon.spy().named("updateViewState");
		columnDefs = [{ fieldName: "a" }];
		stopPropagations = {};
		mockEvent = id => {
			stopPropagations[id] = sinon.spy().named("stopPropagation:" + id);
			return {
				target: { dataset: { rowId: id } },
				stopPropagation: stopPropagations[id],
			};
		};
	});

	it("does not change column definitions without cause", () =>
		expect(
			enhanceColumnDefs,
			"called with",
			[sorting, selection, updateViewState, columnDefs],
			"to satisfy",
			[
				{
					fieldName: "a",
				},
			],
		));

	describe("column selection", () => {
		beforeEach(() => {
			columnDefs = [{ type: "select" }, { fieldName: "a" }];
			selection = ["selectedRow"];
		});

		it("adds field name and onChange to select columns", () =>
			expect(
				enhanceColumnDefs,
				"called with",
				[sorting, selection, updateViewState, columnDefs],
				"to exhaustively satisfy",
				[
					{
						type: "select",
						fieldName: "selection",
						onChange: expect
							.it("to be a function")
							// Add name to selection
							.and("called with", [mockEvent("myRow")])
							// remove name from selection
							.and("called with", [mockEvent("selectedRow")])
							// Replace selection
							.and("called with", [["list", "of", "row", "ids"]]),
					},
					{ fieldName: "a" },
				],
			).then(() => {
				expect(stopPropagations["myRow"], "was called");
				expect(stopPropagations["selectedRow"], "was called");
				expect(updateViewState, "to have calls satisfying", [
					{
						args: [
							// Add name to selection
							"selection",
							["selectedRow", "myRow"],
						],
					},
					{
						args: [
							// remove name from selection
							"selection",
							[],
						],
					},
					{
						args: [
							// Replace selection
							"selection",
							["list", "of", "row", "ids"],
						],
					},
				]);
			}));

		it("handles missing selection", () =>
			expect(
				enhanceColumnDefs,
				"called with",
				[sorting, [], updateViewState, columnDefs],
				"to exhaustively satisfy",
				[
					{
						type: "select",
						fieldName: "selection",
						onChange: expect.it("to be a function"),
					},
					{ fieldName: "a" },
				],
			));
	});

	describe("column sorting", () => {
		let sorterSpies;
		beforeEach(() => {
			sorting = { column: "b", direction: "asc" };
			sorterSpies = [
				sinon.spy().named("sorter-a"),
				sinon.spy().named("sorter-b"),
				sinon.spy().named("sorter-c"),
			];
			columnDefs = [
				{
					fieldName: "a",
					sort: sorterSpies[0],
					type: "currency",
					onChange: () => {},
				},
				{ fieldName: "b", sort: sorterSpies[1], type: "date" },
				{ fieldName: "c", sort: sorterSpies[2], type: "switch" },
			];
		});

		it("wraps sort functions to set view state", () =>
			expect(
				enhanceColumnDefs,
				"called with",
				[sorting, selection, updateViewState, columnDefs],
				"to exhaustively satisfy",
				[
					{
						fieldName: "a",
						sort: expect.it("to be a function").and("called"),
						type: "currency",
						onChange: expect.it("to be a function"),
					},
					{
						fieldName: "b",
						sort: expect.it("to be a function"),
						type: "date",
						sortDirection: "asc",
					},
					{
						fieldName: "c",
						sort: expect.it("to be a function"),
						type: "switch",
					},
				],
			).then(() => {
				expect(sorterSpies, "to have calls satisfying", [
					{ spy: sorterSpies[0], args: [false, "a", "currency"] },
				]);
				expect(updateViewState, "to have calls satisfying", [
					{
						args: ["sorting", { column: "a", direction: "asc" }],
					},
				]);
			}));

		it("wraps sort functions to handle flipping sort direction", () =>
			expect(
				enhanceColumnDefs,
				"called with",
				[sorting, selection, updateViewState, columnDefs],
				"to exhaustively satisfy",
				[
					{
						fieldName: "a",
						sort: expect.it("to be a function"),
						type: "currency",
						onChange: expect.it("to be a function"),
					},
					{
						fieldName: "b",
						sort: expect.it("to be a function").and("called"),
						type: "date",
						sortDirection: "asc",
					},
					{
						fieldName: "c",
						sort: expect.it("to be a function"),
						type: "switch",
					},
				],
			).then(() => {
				expect(sorterSpies, "to have calls satisfying", [
					{ spy: sorterSpies[1], args: [true, "b", "date"] },
				]);
				expect(updateViewState, "to have calls satisfying", [
					{
						args: ["sorting", { column: "b", direction: "desc" }],
					},
				]);
			}));
	});
});
