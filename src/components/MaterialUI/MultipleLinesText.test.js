import React from "react";
import { mount } from "enzyme";
import MultipleLinesText from "./MultipleLinesText";
import TextClamp from "react-multi-clamp";

describe("MultipleLinesText", () => {
	const text =
		"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec egestas purus non augue tempor.";

	it("Renders text", () => {
		const lineCount = 2;
		const component = <MultipleLinesText lineCount={lineCount}>{text}</MultipleLinesText>;

		const mountedComponent = mount(component);
		const expected = (
			<TextClamp disableCssClamp={true} clamp={lineCount}>
				{text}
			</TextClamp>
		);

		expect(mountedComponent.containsMatchingElement(expected), "to be truthy");
	});

	it("Use style passed from component", () => {
		const test = "testBody1";
		const component = (
			<MultipleLinesText lineCount={2} className={test}>
				{text}
			</MultipleLinesText>
		);

		const mountedComponent = mount(component);

		expect(mountedComponent.exists(".testBody1"), "to be true");
	});
});
