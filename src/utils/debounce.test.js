import sinon from "sinon";
import debounce from "./debounce";

describe("debounce", () => {
	let handler, clock;
	beforeEach(() => {
		handler = sinon.spy().named("handler");
		clock = sinon.useFakeTimers();
	});
	afterEach(() => {
		clock.restore();
	});

	it("returns a function", () =>
		expect(debounce, "when called with", [handler, 10], "to be a function"));

	it("does not call the handler immediately", () =>
		expect(debounce, "called with", [handler, 10])
			.then(debouncedHandler => expect(debouncedHandler, "called"))
			.then(() => expect(handler, "was not called"))
			.then(() => clock.tick(10))
			.then(() => expect(handler, "was called")));

	it("calls the handler at the start of the timeout if immediate flag given", () =>
		expect(debounce, "called with", [handler, 10, true])
			.then(debouncedHandler =>
				expect(debouncedHandler, "called with", ["arg1", { arg2: 2 }]),
			)
			.then(() =>
				expect(handler, "to have calls satisfying", [{ args: ["arg1", { arg2: 2 }] }]),
			)
			.then(() => clock.tick(10))
			.then(() =>
				expect(handler, "to have calls satisfying", [{ args: ["arg1", { arg2: 2 }] }]),
			));

	it("delays calling until it has been long enough between calls", () =>
		expect(debounce, "called with", [handler, 10]).then(debouncedHandler =>
			expect(debouncedHandler, "called")
				.then(() => expect(handler, "was not called"))
				.then(() => {
					clock.tick(5);
					debouncedHandler();
				})
				.then(() => expect(handler, "was not called"))
				.then(() => {
					clock.tick(5);
					debouncedHandler();
				})
				.then(() => expect(handler, "was not called"))
				.then(() => {
					clock.tick(5);
					debouncedHandler();
				})
				.then(() => expect(handler, "was not called"))
				.then(() => clock.tick(10))
				.then(() => expect(handler, "was called")),
		));

	it("calls only with latest arguments if multiple calls made", () =>
		expect(debounce, "called with", [handler, 10]).then(debouncedHandler =>
			expect(debouncedHandler, "called with", 1)
				.then(() => expect(handler, "was not called"))
				.then(() => {
					clock.tick(1);
					debouncedHandler(2);
				})
				.then(() => expect(handler, "was not called"))
				.then(() => {
					clock.tick(1);
					debouncedHandler(3);
				})
				.then(() => expect(handler, "was not called"))
				.then(() => {
					clock.tick(1);
					debouncedHandler(4);
				})
				.then(() => expect(handler, "was not called"))
				.then(() => clock.tick(20))
				.then(() => expect(handler, "to have calls satisfying", [{ args: [4] }])),
		));

	it("only calls handler once during repeated calls immediate flag given", () =>
		expect(debounce, "called with", [handler, 10, true]).then(debouncedHandler =>
			expect(debouncedHandler, "called with", ["arg1", { arg2: 0 }])
				.then(() =>
					expect(handler, "to have calls satisfying", [{ args: ["arg1", { arg2: 0 }] }]),
				)
				.then(() => {
					clock.tick(5);
					debouncedHandler("arg1", { arg2: 1 });
				})
				.then(() =>
					expect(handler, "to have calls satisfying", [{ args: ["arg1", { arg2: 0 }] }]),
				)
				.then(() => {
					clock.tick(5);
					debouncedHandler("arg1", { arg2: 2 });
				})
				.then(() =>
					expect(handler, "to have calls satisfying", [{ args: ["arg1", { arg2: 0 }] }]),
				)
				.then(() => clock.tick(10))
				.then(() =>
					expect(handler, "to have calls satisfying", [{ args: ["arg1", { arg2: 0 }] }]),
				)
				.then(() => {
					debouncedHandler("arg1", { arg2: 3 });
				})
				.then(() =>
					expect(handler, "to have calls satisfying", [
						{ args: ["arg1", { arg2: 0 }] },
						{ args: ["arg1", { arg2: 3 }] },
					]),
				)
				.then(() => clock.tick(10))
				.then(() =>
					expect(handler, "to have calls satisfying", [
						{ args: ["arg1", { arg2: 0 }] },
						{ args: ["arg1", { arg2: 3 }] },
					]),
				),
		));
});
