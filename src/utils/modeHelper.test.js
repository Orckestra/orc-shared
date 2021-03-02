import { isReadMode, isEditMode, isCreateMode, isMutationMode } from "./modeHelper";
import { mode } from "./../constants";

describe("isReadMode", () => {
	it("Returns true if mode is read", () => {
		const result = isReadMode(mode.read);

		expect(result, "to be true");
	});

	it("Returns false if mode is not read", () => {
		const result = isReadMode("something else");

		expect(result, "to be false");
	});
});

describe("isEditMode", () => {
	it("Returns true if mode is edit", () => {
		const result = isEditMode(mode.edit);

		expect(result, "to be true");
	});

	it("Returns false if mode is not edit", () => {
		const result = isEditMode("something else");

		expect(result, "to be false");
	});
});

describe("isCreateMode", () => {
	it("Returns true if mode is create", () => {
		const result = isCreateMode(mode.create);

		expect(result, "to be true");
	});

	it("Returns false if mode is not create", () => {
		const result = isCreateMode("something else");

		expect(result, "to be false");
	});
});

describe("isMutationMode", () => {
	it("Returns true if mode is edit", () => {
		const result = isMutationMode(mode.edit);

		expect(result, "to be true");
	});

	it("Returns true if mode is create", () => {
		const result = isMutationMode(mode.create);

		expect(result, "to be true");
	});

	it("Returns false if mode is not create or edit", () => {
		const result = isMutationMode("something else");

		expect(result, "to be false");
	});
});
