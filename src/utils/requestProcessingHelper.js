import { requestStates } from "./../constants";

export const computeFinalRequestProcessingState = function () {
	const states = arguments;
	let idleCount = 0;

	for (let i = 0; i < states.length; i++) {
		switch (states[i]) {
			case requestStates.fail:
				return requestStates.fail;
			case requestStates.processing:
				return requestStates.processing;
			case requestStates.idle:
				idleCount++;
				continue;
			case requestStates.success:
				continue;
			default:
				throw Error("You have to pass just requestStates type");
		}
	}

	return idleCount === states.length ? requestStates.idle : requestStates.success;
};

export default computeFinalRequestProcessingState;
