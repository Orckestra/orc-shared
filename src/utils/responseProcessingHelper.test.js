import { extractStandardErrorMessagesFromResponse } from "./responseProcessingHelper";

describe("extractStandardErrorMessagesFromResponse", () => {
	it("Returns success when response is null", () => {
		const response = null;
		const extractedMessages = extractStandardErrorMessagesFromResponse(response, "fallback module", "fallback name");
		expect(extractedMessages, "to equal", {
			hasErrors: false,
			messages: [],
		});
	});

	it("Returns success when response is empty", () => {
		const response = {};
		const extractedMessages = extractStandardErrorMessagesFromResponse(response, "fallback module", "fallback name");

		expect(extractedMessages, "to equal", {
			hasErrors: false,
			messages: [],
		});
	});

	it("Returns success when response is not on error", () => {
		const response = {
			error: false,
		};
		const extractedMessages = extractStandardErrorMessagesFromResponse(response, "fallback module", "fallback name");

		expect(extractedMessages, "to equal", {
			hasErrors: false,
			messages: [],
		});
	});

	it("Returns error with empty messages with 422 error", () => {
		const response = {
			error: true,
			payload: {
				status: 422,
			},
		};
		const extractedMessages = extractStandardErrorMessagesFromResponse(response, "fallback module", "fallback name");

		expect(extractedMessages, "to equal", {
			hasErrors: true,
			messages: [],
		});
	});

	it("Returns error with empty messages with 422 error because empty failures", () => {
		const response = {
			error: true,
			payload: {
				status: 422,
				failures: [],
			},
		};
		const extractedMessages = extractStandardErrorMessagesFromResponse(response, "fallback module", "fallback name");

		expect(extractedMessages, "to equal", {
			hasErrors: true,
			messages: [],
		});
	});

	it("Returns error with empty messages with 422 errors", () => {
		const response = {
			error: true,
			payload: {
				status: 422,
				response: {
					failures: [
						{ invalid: "format" },
						{ errorCode: "code1", errorMessage: "msg1" },
						{ errorCode: "code2", errorMessage: "msg2" },
					],
				},
			},
		};
		const extractedMessages = extractStandardErrorMessagesFromResponse(response, "fallback module", "fallback name");

		expect(extractedMessages, "to equal", {
			hasErrors: true,
			messages: [
				{ message: "msg1", lookupModule: "fallback module", lookupName: "fallback name", lookupKey: "code1" },
				{ message: "msg2", lookupModule: "fallback module", lookupName: "fallback name", lookupKey: "code2" },
			],
		});
	});

	it("Returns error with empty messages with 422 errors", () => {
		const response = {
			error: true,
			payload: {
				status: 422,
				response: {
					failures: [
						{ invalid: "format" },
						{ errorCode: "code1", errorMessage: "msg1" },
						{ errorCode: "code2", errorMessage: "msg2" },
					],
				},
			},
		};
		const extractedMessages = extractStandardErrorMessagesFromResponse(response, "fallback module", "fallback name");

		expect(extractedMessages, "to equal", {
			hasErrors: true,
			messages: [
				{ message: "msg1", lookupModule: "fallback module", lookupName: "fallback name", lookupKey: "code1" },
				{ message: "msg2", lookupModule: "fallback module", lookupName: "fallback name", lookupKey: "code2" },
			],
		});
	});

	it("Returns error with empty messages with 500 status but no messages", () => {
		const response = {
			error: true,
			payload: {
				status: 500,
			},
		};
		const extractedMessages = extractStandardErrorMessagesFromResponse(response, "fallback module", "fallback name");

		expect(extractedMessages, "to equal", {
			hasErrors: true,
			messages: [],
		});
	});

	it("Returns error with empty messages with 500 status without payload", () => {
		const response = {
			error: true,
		};
		const extractedMessages = extractStandardErrorMessagesFromResponse(response, "fallback module", "fallback name");

		expect(extractedMessages, "to equal", {
			hasErrors: true,
			messages: [],
		});
	});

	it("Returns error with empty messages with 500 with empty messages", () => {
		const response = {
			error: true,
			payload: {
				status: 500,
				errors: [],
			},
		};
		const extractedMessages = extractStandardErrorMessagesFromResponse(response, "fallback module", "fallback name");

		expect(extractedMessages, "to equal", {
			hasErrors: true,
			messages: [],
		});
	});

	it("Returns error with empty messages with 500 with messages", () => {
		const response = {
			error: true,
			payload: {
				status: 500,
				response: {
					errors: [
						{ message: "msg1", lookupModule: "mod2", lookupName: "name3", lookupKey: "key4" },
						{ message: "", lookupModule: "mod5", lookupName: "name5", lookupKey: "key5" },
					],
				},
			},
		};
		const extractedMessages = extractStandardErrorMessagesFromResponse(response, "fallback module", "fallback name");

		expect(extractedMessages, "to equal", {
			hasErrors: true,
			messages: [
				{ message: "msg1", lookupModule: "mod2", lookupName: "name3", lookupKey: "key4" },
				{ message: "", lookupModule: "mod5", lookupName: "name5", lookupKey: "key5" },
			],
		});
	});

	it("Returns error with empty messages with 500 with messages containing arguments", () => {
		const response = {
			error: true,
			payload: {
				status: 500,
				response: {
					errors: [
						{
							message: "msg1",
							lookupModule: "mod2",
							lookupName: "name3",
							lookupKey: "key4",
							lookupReplacementValues: { key: "val" },
						},
						{ message: "", lookupModule: "mod5", lookupName: "name5", lookupKey: "key5" },
					],
				},
			},
		};
		const extractedMessages = extractStandardErrorMessagesFromResponse(response, "fallback module", "fallback name");

		expect(extractedMessages, "to equal", {
			hasErrors: true,
			messages: [
				{
					message: "msg1",
					lookupModule: "mod2",
					lookupName: "name3",
					lookupKey: "key4",
					lookupReplacementValues: { key: "val" },
				},
				{ message: "", lookupModule: "mod5", lookupName: "name5", lookupKey: "key5" },
			],
		});
	});
});
