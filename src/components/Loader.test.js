import React from "react";
import LoadingIcon from "./LoadingIcon";
import ErrorPlaceholder from "./ErrorPlaceholder";
import { Loading } from "./Loader";

describe("Loader placeholder", () => {
	it("renders null if no props set", () =>
		expect(
			<div>
				<Loading />
			</div>,
			"when mounted",
			"to satisfy",
			<div />,
		));

	it("renders a load spinner is pastDelay flag set", () =>
		expect(
			<Loading pastDelay />,
			"when mounted",
			"to satisfy",
			<LoadingIcon />,
		));

	it("renders an error placeholder if error set", () => {
		const error = new Error("This is a test");
		const retry = () => {};
		return expect(
			<Loading {...{ error, retry }} />,
			"when mounted",
			"to satisfy",
			<ErrorPlaceholder message="This is a test" onClick={retry} />,
		);
	});
});
