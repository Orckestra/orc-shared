import { getToastColor } from "./toastHelper";

describe("getToastColor", () => {
	const theme = {
		palette: {
			error: {
				main: "#FF0000",
			},
			warning: {
				main: "#FFA500",
			},
			success: {
				main: "#00FF00",
			},
		},
	};

	it("should return error color", () => {
		const toastColor = getToastColor(theme, "error");

		return expect(toastColor, "to be", "#FF0000");
	});

	it("should return warning color", () => {
		const toastColor = getToastColor(theme, "warn");

		return expect(toastColor, "to be", "#FFA500");
	});

	it("should return success color", () => {
		const toastColor = getToastColor(theme, "confirm");

		return expect(toastColor, "to be", "#00FF00");
	});

	it("should return default color", () => {
		const toastColor = getToastColor(theme, "test");

		return expect(toastColor, "to be", "red");
	});
});
