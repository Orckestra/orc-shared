import { computeFinalRequestProcessingState } from "./requestProcessingHelper";
import { requestStates } from "./../constants";
import { ignoreConsoleError } from "~/utils/testUtils";

describe("computeFinalRequestProcessingState", () => {
	it("Retrieves success if all the states has success value", () => {
		const states = [requestStates.success, requestStates.success, requestStates.success];
		const finalState = computeFinalRequestProcessingState(...states);

		expect(finalState, "to equal", requestStates.success);
	});

	it("Retrieves success if all the states has success or idle values", () => {
		const states = [requestStates.success, requestStates.idle, requestStates.success];
		const finalState = computeFinalRequestProcessingState(...states);

		expect(finalState, "to equal", requestStates.success);
	});

	it("Retrieves processing if at least one state has processing value", () => {
		const states = [
			requestStates.success,
			requestStates.idle,
			requestStates.success,
			requestStates.processing,
			requestStates.success,
		];
		const finalState = computeFinalRequestProcessingState(...states);

		expect(finalState, "to equal", requestStates.processing);
	});

	it("Retrieves processing if at least one state has fail value", () => {
		const states = [
			requestStates.success,
			requestStates.idle,
			requestStates.success,
			requestStates.fail,
			requestStates.success,
		];
		const finalState = computeFinalRequestProcessingState(...states);

		expect(finalState, "to equal", requestStates.fail);
	});

	it("Retrieves idle if all the states has idle values", () => {
		const states = [requestStates.idle, requestStates.idle, requestStates.idle, requestStates.idle, requestStates.idle];
		const finalState = computeFinalRequestProcessingState(...states);

		expect(finalState, "to equal", requestStates.idle);
	});

	it("Throws an error if one of passed values is not existing value in requestStates", () => {
		ignoreConsoleError(() => {
			const states = [requestStates.idle, "something else", requestStates.idle, requestStates.idle, requestStates.idle];
			const callFinalState = () => computeFinalRequestProcessingState(...states);

			expect(callFinalState, "to throw");
		});
	});
});
