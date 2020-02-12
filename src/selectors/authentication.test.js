import Immutable from "immutable";
import { selectCurrentUsername } from "./authentication";

describe("selectCurrentUsername", () => {
	it("gets the logged in username", () =>
		expect(
			selectCurrentUsername,
			"called with",
			[
				Immutable.fromJS({
					authentication: { name: "alfred@example.com" },
				}),
			],
			"to equal",
			"alfred@example.com",
		));
});
