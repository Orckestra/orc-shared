import React from "react";
import { mount, shallow } from "enzyme";
import MultipleLinesText from "./MultipleLinesText";
import TextProps from "./textProps";
import TextClamp from "react-multi-clamp";
import { ignoreConsoleError } from "./../../utils/testUtils";

describe("MultipleLinesText", () => {
	const text =
		"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec egestas purus non augue tempor.";

	it("Renders text", () => {
		const lineCount = 2;
		const multipleLinesTextProps = new TextProps();
		multipleLinesTextProps.set(TextProps.propNames.lineCount, lineCount);

		const component = (
			<MultipleLinesText textProps={multipleLinesTextProps}>{text}</MultipleLinesText>
		);

		const mountedComponent = mount(component);
		const expected = (
			<TextClamp disableCssClamp={true} clamp={lineCount}>
				{text}
			</TextClamp>
		);

		expect(mountedComponent.containsMatchingElement(expected), "to be truthy");
	});

	it("Use style passed to component", () => {
		const multipleLinesTextProps = new TextProps();
		const test = "testRoot";
		multipleLinesTextProps.set(TextProps.propNames.classes, test);
		const component = (
			<MultipleLinesText textProps={multipleLinesTextProps}>{text}</MultipleLinesText>
		);

		const mountedComponent = mount(component);

		expect(mountedComponent.exists(".testRoot"), "to be true");
	});

	it("Shoud not throw an error if lineCount is not passed and use fallback value", () => {
		const component = <MultipleLinesText>{text}</MultipleLinesText>;
		const mountedComponent = shallow(component);

		expect(mountedComponent.find(TextClamp).get(0).props.clamp, "to equal", "auto");
	});

	it("Fails if textProps has wrong type", () => {
		ignoreConsoleError(() => {
			const component = (
				<MultipleLinesText textProps="Wrong Type">{text}</MultipleLinesText>
			);
			expect(() => mount(component), "to throw a", TypeError);
		});
	});
});
