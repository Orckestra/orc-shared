import { getValueFromUrlByKey, tryGetNewEntityIdKey } from "./urlHelper";

describe("getEntityIdFromUrl", () => {
	it("Retrieves entity id from url", () => {
		const url = "/prependPath/module/entityId/section";

		const path = "/:scope/module/:entityId/section";

		const entityId = getValueFromUrlByKey(url, path, ":entityId");

		expect(entityId, "to equal", "entityId");
	});
});

describe("getEntityIdFromUrl (path to regex)", () => {
	it("Retrieves entity id from url", () => {
		const url = "/prependPath/module/entityId123/section";

		const path = "/:scope/module/:entityId(.*\\d{3})/section";

		const entityId = getValueFromUrlByKey(url, path, ":entityId");

		expect(entityId, "to equal", "entityId123");
	});
});

describe("tryGetNewEntityIdKey", () => {
	it("should return undefined when new without / at begin", () => {
		let url = "new";
		let newEntityId = tryGetNewEntityIdKey(url);

		return expect(newEntityId, "to be", undefined);
	});

	it("Should return new when url like /new", () => {
		let url = "/new";
		let newEntityId = tryGetNewEntityIdKey(url);
		let expected = "new";

		return expect(newEntityId, "to be", expected);
	});

	it("Should return new when url like /new/section", () => {
		let url = "/new/somesection";
		let newEntityId = tryGetNewEntityIdKey(url);
		let expected = "new";

		return expect(newEntityId, "to be", expected);
	});

	it("Should return new when url like /scope/module/new", () => {
		let url = "/Global/somemodule/new";
		let newEntityId = tryGetNewEntityIdKey(url);
		let expected = "new";

		return expect(newEntityId, "to be", expected);
	});

	it("Should return new when url like /scope/module/new/section", () => {
		let url = "/Global/somemodule/new/somesection";
		let newEntityId = tryGetNewEntityIdKey(url);
		let expected = "new";

		return expect(newEntityId, "to be", expected);
	});

	it("shoud return new{number} when url like /new{number}", () => {
		let url = "/new1";
		let newEntityId = tryGetNewEntityIdKey(url);
		let expected = "new1";

		return expect(newEntityId, "to be", expected);
	});

	it("shoud return new{number} when url like /new{number}/section", () => {
		let url = "/new1/section";
		let newEntityId = tryGetNewEntityIdKey(url);
		let expected = "new1";

		return expect(newEntityId, "to be", expected);
	});

	it("shoud return undefined when url like /new{not_number}", () => {
		let url = "/newsomething";
		let newEntityId = tryGetNewEntityIdKey(url);

		return expect(newEntityId, "to be", undefined);
	});

	it("shoud return undefined when url like /new{not_number}/section", () => {
		let url = "/newsomething/section";
		let newEntityId = tryGetNewEntityIdKey(url);

		return expect(newEntityId, "to be", undefined);
	});

	it("shoud return undefined when url like /new{number}{not_number}/section", () => {
		let url = "/new123something/section";
		let newEntityId = tryGetNewEntityIdKey(url);

		return expect(newEntityId, "to be", undefined);
	});

	it("shoud return undefined when url like /{string}new", () => {
		let url = "/somethingnew";
		let newEntityId = tryGetNewEntityIdKey(url);

		return expect(newEntityId, "to be", undefined);
	});

	it("shoud return undefined when url like /{string}new/section", () => {
		let url = "/somethingnew/section";
		let newEntityId = tryGetNewEntityIdKey(url);

		return expect(newEntityId, "to be", undefined);
	});
});
