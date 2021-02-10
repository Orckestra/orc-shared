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

	it("Retrieves true if field has value and error", () => {
		const show = showError({ value: "someValue", error: "someError" });

		expect(show, "to be true");
	});

	it("Retrieves false if field has no error", () => {
		const show = showError({ value: "something" });

		expect(show, "to be false");
	});

	it("Retrieves false if field has no value", () => {
		const show = showError({ error: "something" });

		expect(show, "to be false");
	});

	it("Retrieves false if field has no value or error", () => {
		const show = showError({});

		expect(show, "to be false");
	});
});

describe("hasValidationErrors", () => {
	it("Retrieves true if any field has error", () => {
		const model = {
			field1: {
				value: "something",
			},
			field2: {
				value: "another",
				error: "someError",
			},
		};

		const show = hasValidationErrors(model);

		expect(show, "to be true");
	});

	it("Retrieves false if none of fields has an error", () => {
		const model = {
			field1: {
				value: "something",
			},
			field2: {
				value: "another",
			},
		};

		const show = hasValidationErrors(model);

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
