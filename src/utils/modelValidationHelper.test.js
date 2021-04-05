import { validationErrorTypes } from "../constants";
import {
	validationRules,
	showError,
	hasValidationErrors,
	hasMultipleFieldValidationErrors,
} from "./modelValidationHelper";

describe("validationRules", () => {
	it("validates fieldIsRequired rule correctly when its value is empty", () => {
		const isValid = validationRules[validationErrorTypes.fieldIsRequired](undefined);

		expect(isValid, "to be false");
	});

	it("validates fieldIsRequired rule correctly when its value is not empty", () => {
		const isValid = validationRules[validationErrorTypes.fieldIsRequired]("something");

		expect(isValid, "to be true");
	});
});

describe("showError", () => {
	it("Retrieves false if field is null", () => {
		const show = showError(null);

		expect(show, "to be false");
	});

	it("Retrieves true if field has error", () => {
		const show = showError({ error: "someError" });

		expect(show, "to be true");
	});

	it("Retrieves false if field has no error", () => {
		const show = showError({ value: "something" });

		expect(show, "to be false");
	});
});

describe("hasValidationErrors", () => {
	it("Retrieves true if any field has error", () => {
		const editState = {
			field1: {
				state: {
					value: "something",
				},
				isValid: () => false,
			},
			field2: {
				state: {
					value: "another",
				},
				isValid: () => true,
			},
		};

		const show = hasValidationErrors(editState);

		expect(show, "to be true");
	});

	it("Retrieves false if none of fields has an error", () => {
		const editState = {
			field1: {
				state: {
					value: "something",
				},
				isValid: () => true,
			},
			field2: {
				state: {
					value: "another",
				},
				isValid: () => true,
			},
		};

		const show = hasValidationErrors(editState);

		expect(show, "to be false");
	});

	it("Retrieves true if model is empty", () => {
		const show = hasValidationErrors({});

		expect(show, "to be true");
	});

	it("Retrieves true if model is not defined", () => {
		const show = hasValidationErrors();

		expect(show, "to be true");
	});

	it("Retrieves false if model with specified validation map rules is valid", () => {
		const editState = {
			field1: {
				state: {
					value: "something",
				},
				isValid: () => true,
			},
			field2: {
				state: {
					field3: {
						b: {
							c: {
								p4: {
									value: "qwe4",
								},
								p6: {
									i1: {
										value: "xzc1",
									},
									i2: {
										value: "zxc2",
									},
								},
							},
						},
						d: {
							e: {
								value: "123",
							},
						},
					},
				},
				isValid: (_, path, __) => true,
			},
		};

		const validationMap = {
			field2: {
				map: [
					{
						path: "field3.b.c",
						elements: [
							{
								path: "p4",
								errorTypes: ["firstSpecificErrorType"],
							},
							{
								path: "p6.pi1",
								errorTypes: ["thirdSpecificErrorType"],
							},
							{
								path: "p6.pi2",
								errorTypes: ["fourthSpecificErrorType"],
							},
						],
						errorTypes: ["secondGeneralErrorType"],
					},
					{
						path: "field3.d.e",
						errorTypes: ["thirdGeneralErrorType"],
					},
				],
				errorTypes: ["globalErrorType"],
			},
		};

		const hasErrors = hasValidationErrors(editState, validationMap);

		expect(hasErrors, "to be false");
	});

	it("Retrieves true if model with specified validation map rules is not valid for one of nested paths", () => {
		const generalIsValid = (_, path, __) => {
			if (path === "field2.field3.d.e") {
				return false;
			} else {
				return true;
			}
		};

		const editState = {
			field1: {
				state: {
					value: "something",
				},
				isValid: () => true,
			},
			field2: {
				state: {
					field3: {
						b: {
							c: {
								p4: {
									value: "qwe4",
								},
								p6: {
									i1: {
										value: "xzc1",
									},
									i2: {
										value: "zxc2",
									},
								},
							},
						},
						d: {
							e: {
								value: "123",
							},
						},
					},
				},
				isValid: (_, path, __) => {
					if (path === "field2.field3.b.c.p6.pi2") {
						return false;
					} else {
						return true;
					}
				},
			},
		};

		const validationMap = {
			field2: {
				map: [
					{
						path: "field3.b.c",
						elements: [
							{
								path: "p4",
								errorTypes: ["firstSpecificErrorType"],
							},
							{
								path: "p6.pi1",
								errorTypes: ["thirdSpecificErrorType"],
							},
							{
								path: "p6.pi2",
								errorTypes: ["fourthSpecificErrorType"],
							},
						],
						errorTypes: ["secondGeneralErrorType"],
					},
					{
						path: "field3.d.e",
						errorTypes: ["thirdGeneralErrorType"],
					},
				],
				errorTypes: ["globalErrorType"],
			},
		};

		const hasErrors = hasValidationErrors(editState, validationMap);

		expect(hasErrors, "to be true");
	});

	it("Retrieves true if model with specified validation map rules is not valid", () => {
		const editState = {
			field1: {
				state: {
					value: "something",
				},
				isValid: () => true,
			},
			field2: {
				state: {
					field3: {
						b: {
							c: {
								p4: {
									value: "qwe4",
								},
								p6: {
									i1: {
										value: "xzc1",
									},
									i2: {
										value: "zxc2",
									},
								},
							},
						},
						d: {
							e: {
								value: "123",
							},
						},
					},
				},
				isValid: (_, path, __) => {
					if (path === "field2.field3.d.e") {
						return false;
					} else {
						return true;
					}
				},
			},
		};

		const validationMap = {
			field2: {
				map: [
					{
						path: "field3.b.c",
						elements: [
							{
								path: "p4",
								errorTypes: ["firstSpecificErrorType"],
							},
							{
								path: "p6.pi1",
								errorTypes: ["thirdSpecificErrorType"],
							},
							{
								path: "p6.pi2",
								errorTypes: ["fourthSpecificErrorType"],
							},
						],
						errorTypes: ["secondGeneralErrorType"],
					},
					{
						path: "field3.d.e",
						errorTypes: ["thirdGeneralErrorType"],
					},
				],
				errorTypes: ["globalErrorType"],
			},
		};

		const hasErrors = hasValidationErrors(editState, validationMap);

		expect(hasErrors, "to be true");
	});
});

describe("hasMultipleFieldValidationErrors", () => {
	it("Retrieves false if model is empty", function () {
		const result = hasMultipleFieldValidationErrors({});
		expect(result, "to be false");
	});

	it("Retrieves false if model is not defined", function () {
		const result = hasMultipleFieldValidationErrors(undefined);
		expect(result, "to be false");
	});

	it("Retrieves false if model is null", function () {
		const result = hasMultipleFieldValidationErrors(null);
		expect(result, "to be false");
	});

	it("Retrieves false if model is valid", function () {
		const editStates = {
			group: {
				field1: {
					state: {
						value: "something",
					},
					isValid: () => true,
				},
				field2: {
					state: {
						value: "another",
					},
					isValid: () => true,
				},
			},
		};
		const result = hasMultipleFieldValidationErrors(editStates);
		expect(result, "to be false");
	});

	it("Retrieves true if model is invalid", function () {
		const editStates = {
			group: {
				field1: {
					state: {
						value: "something",
					},
					isValid: () => true,
				},
				field2: {
					state: {
						value: "another",
					},
					isValid: () => false,
				},
			},
		};
		const result = hasMultipleFieldValidationErrors(editStates);
		expect(result, "to be true");
	});
});
