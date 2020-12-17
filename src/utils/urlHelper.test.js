import { getEntityIdFromUrl } from "./urlHelper";

describe("getEntityIdFromUrl", () => {
  it("Retrieves entity id from url", () => {
    const url = "/prependPath/module/entityId/section";

    const entityId = getEntityIdFromUrl(url, "/prependPath/");

    expect(entityId, "to equal", "entityId");
  });
});