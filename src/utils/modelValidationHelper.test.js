import { validationErrorTypes } from "../constants";
import {
	validationRules,
	showError,
	hasValidationErrors,
	hasMultipleFieldValidationErrors,
} from "./modelValidationHelper";
import { isEqual } from "lodash";

describe("validationRules", () => {
	it("validates fieldIsRequired rule correctly when its value is empty", () => {
		const isValid = validationRules[validationErrorTypes.fieldIsRequired](undefined);

		expect(isValid, "to be false");
	});

	it("validates fieldIsRequired rule correctly when its value is not empty", () => {
		const isValid = validationRules[validationErrorTypes.fieldIsRequired]("something");

		expect(isValid, "to be true");
	});

	it("validates fieldIsRequired rule correctly when its value is Attribute and not empty", () => {
		const isValid = validationRules[validationErrorTypes.fieldIsRequired]({
			value: "something",
			__type: "ValueOfInt32",
		});

		expect(isValid, "to be true");
	});

	it("validates fieldMustBeValidEmail rule correctly when its value is wrong email", () => {
		const isValid = validationRules[validationErrorTypes.fieldMustBeValidEmail]("abc");

		expect(isValid, "to be false");
	});

	it("validates fieldMustBeValidEmail rule correctly when its value is correct email", () => {
		const isValid = validationRules[validationErrorTypes.fieldMustBeValidEmail]("test@example.com");

		expect(isValid, "to be true");
	});

	it("validates fieldMustBeValidEmail rule correctly when its value is empty", () => {
		const isValid = validationRules[validationErrorTypes.fieldMustBeValidEmail](undefined);

		expect(isValid, "to be true");
	});

	const testPhoneNumber = (phoneNumber, expected) => {
		it("validates fieldMustBeValidPhoneNumber rule correctly when its value is " + phoneNumber, () => {
			const isValid = validationRules[validationErrorTypes.fieldMustBeValidPhoneNumber](phoneNumber);

			expect(isValid, expected);
		});
	};

	testPhoneNumber("+001 111 222 3333", "to be true");
	testPhoneNumber("+0011112223333", "to be true");
	testPhoneNumber("+001-111-222-3333", "to be true");
	testPhoneNumber("111 222 3333", "to be true");
	testPhoneNumber("1112223333", "to be true");
	testPhoneNumber("111-222-3333", "to be true");
	testPhoneNumber(undefined, "to be true");

	testPhoneNumber("+OO1-111-222-3333", "to be false");
	testPhoneNumber("OO1-111-222-3333", "to be false");
	testPhoneNumber("OO11112223333", "to be false");
	testPhoneNumber("abracadabra", "to be false");
	testPhoneNumber("111 aaa 3333", "to be false");
	testPhoneNumber("111 AAA 3333", "to be false");
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
					if (isEqual(path, ["field3", "b", "c", "p6", "pi2"])) {
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
						path: ["field3", "b", "c"],
						elements: [
							{
								path: ["p4"],
								errorTypes: ["firstSpecificErrorType"],
							},
							{
								path: ["p6", "pi1"],
								errorTypes: ["thirdSpecificErrorType"],
							},
							{
								path: ["p6", "pi2"],
								errorTypes: ["fourthSpecificErrorType"],
							},
						],
						errorTypes: ["secondGeneralErrorType"],
					},
					{
						path: ["field3", "d", "e"],
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
					if (isEqual(path, ["field3", "b", "c", "p6", "pi1"])) {
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
						path: ["field3", "b", "c"],
						elements: [
							{
								path: ["p4"],
								errorTypes: ["firstSpecificErrorType"],
							},
							{
								path: ["p6", "pi1"],
								errorTypes: ["thirdSpecificErrorType"],
							},
							{
								path: ["p6", "pi2"],
								errorTypes: ["fourthSpecificErrorType"],
							},
						],
						errorTypes: ["secondGeneralErrorType"],
					},
					{
						path: ["field3", "d", "e"],
					},
				],
			},
		};

		const hasErrors = hasValidationErrors(editState, validationMap);

		expect(hasErrors, "to be true");
	});

	it("Retrieves true if model with specified validation map rules is not valid and ", () => {
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
					if (isEqual(path, ["field3", "d", "e"])) {
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
						path: ["field3", "b", "c"],
						elements: [
							{
								path: ["p4"],
								errorTypes: ["firstSpecificErrorType"],
							},
							{
								path: ["p6", "pi1"],
								errorTypes: ["thirdSpecificErrorType"],
							},
							{
								path: ["p6", "pi2"],
							},
						],
					},
					{
						path: ["field3", "d", "e"],
						errorTypes: ["thirdGeneralErrorType"],
					},
				],
				errorTypes: ["globalErrorType"],
			},
		};

		const hasErrors = hasValidationErrors(editState, validationMap);

		expect(hasErrors, "to be true");
	});

	it("Retrieves false if isValid property is not undefined", () => {
		const editState = {
			field1: {
				state: {
					value: "something",
				},
			},
		};

		const hasErrors = hasValidationErrors(editState);

		expect(hasErrors, "to be false");
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
