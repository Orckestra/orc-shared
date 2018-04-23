import React from "react";
import Header, { Icon, Label, Wrapper } from "./Header";

describe("Header", () => {
	let application, toggle;
	beforeEach(() => {
		application = {
			label: "Test label",
			src: "/test/url",
		};
		toggle = () => {};
	});

	it("renders an icon and label", () =>
		expect(
			<Header open={true} application={application} toggle={toggle} />,
			"to render as",
			<Wrapper onClick={toggle}>
				<Icon src="/test/url" />
				<Label open={true}>Test label</Label>
			</Wrapper>,
		));

	describe("Label", () => {
		it("sets full opacity with open flag", () =>
			expect(
				<Label open />,
				"to render style rules",
				"to contain",
				"opacity: 1;",
			));

		it("sets zero opacity without open flag", () =>
			expect(<Label />, "to render style rules", "to contain", "opacity: 0;"));
	});
});
