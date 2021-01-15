import { isScrollVisible } from "./domHelper";

describe("isScrollVisible", () => {
	it("Retrieves true when scroll width is greater than client width", () => {
		const result = isScrollVisible({
			clientWidth: 300,
			scrollWidth: 400,
		});

		expect(result, "to be true");
	});

	it("Retrieves false when scroll width is equal to client width", () => {
		const result = isScrollVisible({
			clientWidth: 300,
			scrollWidth: 300,
		});

		expect(result, "to be false");
	});
});
