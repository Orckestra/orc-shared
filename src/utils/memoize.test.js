import sinon from "sinon";
import memoize from "./memoize";

describe("memoize", () => {
	let func;
	beforeEach(() => {
		func = sinon.spy(x => x + 1).named("testFunc");
	});

	it("returns a function", () =>
		expect(memoize, "when called with", [func], "to be a function"));

	it("returns correct results but only calls the function if new params given", () =>
		expect(memoize, "when called with", [func])
			.then(memoizedFunc =>
				expect(memoizedFunc, "called with", [1], "to be", 2)
					.and("called with", [1], "to be", 2)
					.and("called with", [2], "to be", 3)
					.and("called with", [1], "to be", 2)
					.and("called with", [1], "to be", 2)
					.and("called with", [5], "to be", 6)
					.and("called with", [2], "to be", 3)
					.and("called with", [3], "to be", 4)
					.and("called with", [3], "to be", 4)
					.and("called with", [1], "to be", 2)
					.and("called with", [2], "to be", 3)
					.and("called with", [3], "to be", 4)
					.and("called with", [4], "to be", 5)
					.and("called with", [5], "to be", 6),
			)
			.then(() =>
				expect(func, "to have calls satisfying", [
					{ args: [1] },
					{ args: [2] },
					{ args: [5] },
					{ args: [3] },
					{ args: [4] },
				]),
			));
});
