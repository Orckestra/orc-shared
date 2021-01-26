import React from "react";
import { mount } from "enzyme";
import Badge from "./Badge";
import BadgeMui from "@material-ui/core/Badge";

describe("Badge", () => {
	it("Renders Badge when children was passed", () => {
		const badge = 10;
		const children = <p>Hello</p>;

		const component = <Badge badge={badge} children={children} />;

		const mountedComponent = mount(component);

		const expected = <BadgeMui badgeContent={badge}>{children}</BadgeMui>;

		expect(mountedComponent.containsMatchingElement(expected), "to be true");
	});

	it("Renders Badge when was not passed", () => {
		const badge = 10;

		const component = <Badge badge={badge} />;

		const mountedComponent = mount(component);

		const expected = <BadgeMui badgeContent={badge} />;

		expect(mountedComponent.containsMatchingElement(expected), "to be true");
	});
});
