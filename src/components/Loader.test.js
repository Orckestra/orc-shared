import React from "react";
import LoadingIcon from "./LoadingIcon";
import ErrorPlaceholder from "./ErrorPlaceholder";
import { Loading } from "./Loader";

describe("Loader placeholder", () => {
	it("renders null if no props set", () =>
		expect(<Loading />, "renders elements", "to be null"));

	it("renders a load spinner is pastDelay flag set", () =>
		expect(<Loading pastDelay />, "to render as", <LoadingIcon />));

	it("renders an error placeholder if error set", () => {
		const error = new Error("This is a test");
		const retry = () => {};
		return expect(
			<Loading {...{ error, retry }} />,
			"to render as",
			<ErrorPlaceholder message="This is a test" onClick={retry} />,
		);
	});
});
