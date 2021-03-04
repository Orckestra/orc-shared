import { validationErrorTypes } from "../constants";
import { validationRules, showError, hasValidationErrors } from "./modelValidationHelper";

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
});
