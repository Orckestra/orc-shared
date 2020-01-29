import React from "react";
import Header, { MenuIcon, Wrapper } from "./Header";

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
			<Wrapper id="applicationSelectorAnchor" onClick={toggle}>
				<MenuIcon />
			</Wrapper>,
		));
});
