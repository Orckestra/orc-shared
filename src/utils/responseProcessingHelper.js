export const extractStandardErrorMessagesFromResponse = (response, validationLookupModule, validationLookupName) => {
	let hasErrors = false;
	const messages = [];

	if (response?.error) {
		hasErrors = true;

		if (response.payload?.status === 422) {
			if (response.payload?.response?.failures) {
				// uses structure from our .Net ValidationFailuresExceptionHandler
				response.payload.response.failures.forEach(failure => {
					if (failure.errorCode) {
						messages.push({
							message: failure.errorMessage,
							lookupModule: validationLookupModule,
							lookupName: validationLookupName,
							lookupKey: failure.errorCode,
						});
					}
				});
			}
		} else if (response.payload?.status === 500) {
			if (response.payload?.response?.errors) {
				// uses structure from our .Net OrckestraExceptionErrorHandler
				response.payload.response.errors.forEach(err => {
					messages.push({
						message: err.message,
						lookupModule: err.lookupModule,
						lookupName: err.lookupName,
						lookupKey: err.lookupKey,
						lookupReplacementValues: err.lookupReplacementValues,
					});
				});
			}
		}
	}

	return {
		hasErrors,
		messages,
	};
};
