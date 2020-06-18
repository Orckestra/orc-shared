import React from "react";
import { mount } from "enzyme";
import MultipleLinesText from "./MultipleLinesText";
import TextProps from "./textProps";
import Typography from "@material-ui/core/Typography";
import { ignoreConsoleError } from "./../../utils/testUtils";

describe("MultipleLinesText", () => {
	const text =
		"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec egestas purus non augue tempor.";

	it("Renders text", () => {
		const component = <MultipleLinesText lineCount="2">{text}</MultipleLinesText>;

		const mountedComponent = mount(component);
		const expected = <Typography>{text}</Typography>;

		expect(mountedComponent.containsMatchingElement(expected), "to be truthy");
	});

	it("Add style to body1 ruleName", () => {
		const multipleLinesTextProps = new TextProps();
		const test = "testBody1";
		multipleLinesTextProps.setStyle(TextProps.ruleNames.body1, test);
		const component = (
			<MultipleLinesText lineCount="2" textProps={multipleLinesTextProps}>
				{text}
			</MultipleLinesText>
		);

		const mountedComponent = mount(component);

		expect(mountedComponent.exists(".testBody1"), "to be true");
	});

	it("Add style to root ruleName", () => {
		const multipleLinesTextProps = new TextProps();
		const test = "testRoot";
		multipleLinesTextProps.setStyle(TextProps.ruleNames.body1, test);
		const component = (
			<MultipleLinesText lineCount="2" textProps={multipleLinesTextProps}>
				{text}
			</MultipleLinesText>
		);

		const mountedComponent = mount(component);

		expect(mountedComponent.exists(".testRoot"), "to be true");
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
