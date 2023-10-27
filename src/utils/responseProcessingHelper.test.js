import { extractStandardErrorMessagesFromResponse } from "./responseProcessingHelper";
import sinon from "sinon";

describe("extractStandardErrorMessagesFromResponse", () => {
	let formatMessage, formatDate, formatTime;
	beforeEach(() => {
		formatMessage = sinon.stub().named("formatMessage").returns("fm");
		formatDate = sinon.stub().named("formatDate").returns("fd");
		formatTime = sinon.stub().named("formatTime").returns("ft");
	});

	it("Returns success when response is null", () => {
		const response = null;
		const extractedMessages = extractStandardErrorMessagesFromResponse(
			response,
			"fallback module",
			"fallback name",
			formatMessage,
			formatDate,
			formatTime,
		);
		expect(extractedMessages, "to equal", {
			hasErrors: false,
			messages: [],
		});
	});

	it("Returns success when response is empty", () => {
		const response = {};
		const extractedMessages = extractStandardErrorMessagesFromResponse(
			response,
			"fallback module",
			"fallback name",
			formatMessage,
			formatDate,
			formatTime,
		);

		expect(extractedMessages, "to equal", {
			hasErrors: false,
			messages: [],
		});
	});

	it("Returns success when response is not on error", () => {
		const response = {
			error: false,
		};
		const extractedMessages = extractStandardErrorMessagesFromResponse(
			response,
			"fallback module",
			"fallback name",
			formatMessage,
			formatDate,
			formatTime,
		);

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
		const extractedMessages = extractStandardErrorMessagesFromResponse(
			response,
			"fallback module",
			"fallback name",
			formatMessage,
			formatDate,
			formatTime,
		);

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
		const extractedMessages = extractStandardErrorMessagesFromResponse(
			response,
			"fallback module",
			"fallback name",
			formatMessage,
			formatDate,
			formatTime,
		);

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
		const extractedMessages = extractStandardErrorMessagesFromResponse(
			response,
			"fallback module",
			"fallback name",
			formatMessage,
			formatDate,
			formatTime,
		);

		expect(extractedMessages, "to equal", {
			hasErrors: true,
			messages: [
				{ message: "msg1", lookupModule: "fallback module", lookupName: "fallback name", lookupKey: "code1" },
				{ message: "msg2", lookupModule: "fallback module", lookupName: "fallback name", lookupKey: "code2" },
			],
		});
	});

	it("Returns error with empty messages with 422 errors and transformed lookupKey", () => {
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
		const extractedMessages = extractStandardErrorMessagesFromResponse(
			response,
			"fallback module",
			"fallback name",
			formatMessage,
			formatDate,
			formatTime,
			key => key.replace("code", "rep"),
		);

		expect(extractedMessages, "to equal", {
			hasErrors: true,
			messages: [
				{ message: "msg1", lookupModule: "fallback module", lookupName: "fallback name", lookupKey: "rep1" },
				{ message: "msg2", lookupModule: "fallback module", lookupName: "fallback name", lookupKey: "rep2" },
			],
		});
	});

	it("Returns error with empty messages with 422 with message containing replacement values", () => {
		const response = {
			error: true,
			payload: {
				status: 422,
				response: {
					failures: [
						{ invalid: "format" },
						{
							errorCode: "code1",
							errorMessage: "msg1 {A}, {B}, {C}, {D} {InventoryLocationId}, {Sku}",
							context: {
								InventoryLocationId: {
									__type:
										"Orckestra.Overture.Entities.ValueContainer`1[[System.String, mscorlib]], Orckestra.Overture.Entities",
									value: "BRC-411",
								},
								Sku: {
									__type:
										"Orckestra.Overture.Entities.ValueContainer`1[[System.String, mscorlib]], Orckestra.Overture.Entities",
									value: "85948533",
								},
								A: {
									__type:
										"Orckestra.Overture.Entities.ValueContainer`1[[System.Int32, mscorlib]], Orckestra.Overture.Entities",
									value: 123,
								},
								B: {
									__type:
										"Orckestra.Overture.Entities.ValueContainer`1[[System.String, mscorlib]], Orckestra.Overture.Entities",
									value: "B",
								},
								C: {
									__type:
										"Orckestra.Overture.Entities.ValueContainer`1[[System.Boolean, mscorlib]], Orckestra.Overture.Entities",
									value: true,
								},
								D: {
									__type:
										"Orckestra.Overture.Entities.ValueContainer`1[[System.DateTime, mscorlib]], Orckestra.Overture.Entities",
									value: "2023-10-27T15:40:49.9783715Z",
								},
								E: {
									__type:
										"Orckestra.Overture.Entities.ValueContainer`1[[System.String, mscorlib]], Orckestra.Overture.Entities",
									value: "C",
								},
							},
						},
						{ errorCode: "code2", errorMessage: "msg2" },
					],
				},
			},
		};
		const extractedMessages = extractStandardErrorMessagesFromResponse(
			response,
			"fallback module",
			"fallback name",
			formatMessage,
			formatDate,
			formatTime,
			key => key.replace("code", "rep"),
		);

		expect(extractedMessages, "to equal", {
			hasErrors: true,
			messages: [
				{
					message: "msg1 {A}, {B}, {C}, {D} {InventoryLocationId}, {Sku}",
					lookupModule: "fallback module",
					lookupName: "fallback name",
					lookupKey: "rep1",
					lookupReplacementValues: {
						A: "123",
						B: "B",
						C: "fm",
						D: "fd ft",
						E: "C",
						InventoryLocationId: "BRC-411",
						Sku: "85948533",
					},
				},
				{ message: "msg2", lookupModule: "fallback module", lookupName: "fallback name", lookupKey: "rep2" },
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
		const extractedMessages = extractStandardErrorMessagesFromResponse(
			response,
			"fallback module",
			"fallback name",
			formatMessage,
			formatDate,
			formatTime,
		);

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
		const extractedMessages = extractStandardErrorMessagesFromResponse(
			response,
			"fallback module",
			"fallback name",
			formatMessage,
			formatDate,
			formatTime,
		);

		expect(extractedMessages, "to equal", {
			hasErrors: true,
			messages: [],
		});
	});

	it("Returns error with empty messages with 500 status without payload", () => {
		const response = {
			error: true,
		};
		const extractedMessages = extractStandardErrorMessagesFromResponse(
			response,
			"fallback module",
			"fallback name",
			formatMessage,
			formatDate,
			formatTime,
		);

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
		const extractedMessages = extractStandardErrorMessagesFromResponse(
			response,
			"fallback module",
			"fallback name",
			formatMessage,
			formatDate,
			formatTime,
		);

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
		const extractedMessages = extractStandardErrorMessagesFromResponse(
			response,
			"fallback module",
			"fallback name",
			formatMessage,
			formatDate,
			formatTime,
		);

		expect(extractedMessages, "to equal", {
			hasErrors: true,
			messages: [
				{ message: "msg1", lookupModule: "mod2", lookupName: "name3", lookupKey: "key4" },
				{ message: "", lookupModule: "mod5", lookupName: "name5", lookupKey: "key5" },
			],
		});
	});

	it("Returns error with empty messages with 500 with messages and transformed lookupKey", () => {
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
		const extractedMessages = extractStandardErrorMessagesFromResponse(
			response,
			"fallback module",
			"fallback name",
			formatMessage,
			formatDate,
			formatTime,
			key => key.replace("key", "rep"),
		);

		expect(extractedMessages, "to equal", {
			hasErrors: true,
			messages: [
				{ message: "msg1", lookupModule: "mod2", lookupName: "name3", lookupKey: "rep4" },
				{ message: "", lookupModule: "mod5", lookupName: "name5", lookupKey: "rep5" },
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
		const extractedMessages = extractStandardErrorMessagesFromResponse(
			response,
			"fallback module",
			"fallback name",
			formatMessage,
			formatDate,
			formatTime,
		);

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
