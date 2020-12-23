import { getValueFromUrlByKey } from "./urlHelper";

describe("getEntityIdFromUrl", () => {
  it("Retrieves entity id from url", () => {
    const url = "/prependPath/module/entityId/section";

    const path = "/:scope/module/:entityId/section";

    const entityId = getValueFromUrlByKey(url, path, ":entityId");

    expect(entityId, "to equal", "entityId");
  });
});