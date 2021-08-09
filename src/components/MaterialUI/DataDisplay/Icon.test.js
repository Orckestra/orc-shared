import React from "react";
import { mount } from "enzyme";
import Icon from "./Icon";

describe("Icon", () => {
	it("Renders icon", () => {
		const component = <Icon id="test" />;

		const mountedComponent = mount(component);

		const expected = (
			<svg>
				<use href="#icon-test" />
			</svg>
		);

		expect(mountedComponent.containsMatchingElement(expected), "to be true");
	});
});
