import sinon from "sinon";
import addSpawner, { spawnerMiddleware } from "./spawnerMiddleware";

describe("spawnerMiddleware", () => {
	let fakeStore, dispatch;
	beforeEach(() => {
		fakeStore = {}; // Not needed for this middleware
		dispatch = sinon.spy().named("dispatch");
	});

	it("is a Redux middleware", () =>
		expect(
			spawnerMiddleware,
			"called with",
			[fakeStore],
			"called with",
			[dispatch],
			"called with",
			[{ type: "TEST_ACTION_1" }],
		).then(() =>
			expect(dispatch, "to have calls satisfying", [
				{ args: [{ type: "TEST_ACTION_1" }] },
			]),
		));

	describe("adding action spawners", () => {
		let dispatcher, spawnerFunc, nonSpawnerFunc;
		beforeEach(() => {
			dispatcher = spawnerMiddleware(fakeStore)(dispatch);
			spawnerFunc = sinon
				.spy(action => ({ type: "SPAWNED_ACTION", from: action.type }))
				.named("spawner");
			nonSpawnerFunc = sinon.spy(action => {}).named("non-spawner");
		});

		it("can spawn actions in response to specific actions", () =>
			expect(() => addSpawner("TEST_ACTION_2", spawnerFunc), "not to throw")
				.then(() =>
					expect(() => dispatcher({ type: "TEST_ACTION_2" }), "not to throw"),
				)
				.then(() =>
					expect(() => dispatcher({ type: "OTHER_ACTION" }), "not to throw"),
				)
				.then(() => expect(spawnerFunc, "was called once"))
				.then(() =>
					expect(dispatch, "to have calls satisfying", [
						{ args: [{ type: "SPAWNED_ACTION", from: "TEST_ACTION_2" }] },
						{ args: [{ type: "TEST_ACTION_2" }] },
						{ args: [{ type: "OTHER_ACTION" }] },
					]),
				));

		it("handles if spawner does not return an action", () =>
			expect(() => addSpawner("TEST_ACTION_4", nonSpawnerFunc), "not to throw")
				.then(() =>
					expect(() => dispatcher({ type: "TEST_ACTION_4" }), "not to throw"),
				)
				.then(() =>
					expect(() => dispatcher({ type: "OTHER_ACTION" }), "not to throw"),
				)
				.then(() =>
					expect(nonSpawnerFunc, "to have calls satisfying", [
						{ args: [{ type: "TEST_ACTION_4" }] },
					]),
				)
				.then(() =>
					expect(dispatch, "to have calls satisfying", [
						{ args: [{ type: "TEST_ACTION_4" }] },
						{ args: [{ type: "OTHER_ACTION" }] },
					]),
				));

		it("throws error if a spawner is overwritten", () =>
			expect(
				() => addSpawner("TEST_ACTION_5", spawnerFunc),
				"not to throw",
			).then(() =>
				expect(
					() => addSpawner("TEST_ACTION_5", nonSpawnerFunc),
					"to throw",
					"Action spawner for type TEST_ACTION_5 was attempted overwritten.",
				),
			));
	});
});
