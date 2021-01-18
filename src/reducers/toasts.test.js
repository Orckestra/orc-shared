import Immutable from "immutable";
import reducer from "./toasts";
import { pushToast, shiftToast } from "../actions/toasts";

describe("toasts", () => {
	it("behaves as a reducer", () => expect(reducer, "to be a reducer with initial state", { queue: [] }));

	describe("push new toast to queue", () => {
		it("adds a toast to the end of the queue", () => {
			const oldState = Immutable.fromJS({
				queue: [{ key: 12, message: "Old message" }],
			});
			const action = pushToast("A message");
			const newState = reducer(oldState, action);
			return expect(newState, "not to be", oldState).and(
				"to satisfy",
				Immutable.fromJS({
					queue: [
						{ key: 12, message: "Old message" },
						{ key: 13, message: "A message", type: "confirm" },
					],
				}),
			);
		});

		it("adds a toast to an empty queue", () => {
			const oldState = Immutable.fromJS({
				queue: [],
			});
			const action = pushToast("A message");
			const newState = reducer(oldState, action);
			return expect(newState, "not to be", oldState).and(
				"to satisfy",
				Immutable.fromJS({
					queue: [{ key: 1, message: "A message", type: "confirm" }],
				}),
			);
		});

		it("keeps the type of toast", () => {
			const oldState = Immutable.fromJS({
				queue: [{ key: 5, message: "Old message" }],
			});
			const action = pushToast("A message", "warning");
			const newState = reducer(oldState, action);
			return expect(newState, "not to be", oldState).and(
				"to satisfy",
				Immutable.fromJS({
					queue: [
						{ key: 5, message: "Old message" },
						{ key: 6, message: "A message", type: "warning" },
					],
				}),
			);
		});
	});

	describe("shift toast off queue", () => {
		it("removes the first toast from the queue", () => {
			const oldState = Immutable.fromJS({
				queue: [{ message: "Message 1" }, { message: "Message 2" }],
			});
			const action = shiftToast();
			const newState = reducer(oldState, action);
			return expect(newState, "not to be", oldState).and(
				"to satisfy",
				Immutable.fromJS({
					queue: [{ message: "Message 2" }],
				}),
			);
		});
	});
});
