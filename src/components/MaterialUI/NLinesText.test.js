import React from "react";
import { mount } from "enzyme";
import NLinesText from "./NLinesText";
import TextProps from "./textProps";
import Typography from "@material-ui/core/Typography";

describe("NLineText", () => {
	it("Renders text", () => {
		const text =
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec egestas purus non augue tempor.";
		const component = <NLinesText lineCount="2">{text}</NLinesText>;

		const mountedComponent = mount(component);
		const expected = <Typography>{text}</Typography>;

		expect(mountedComponent.containsMatchingElement(expected), "to be truthy");
	});
	it("Add style", () => {
		const nLinesTextProps = new TextProps();
		const test = "test";
		nLinesTextProps.setStyle(TextProps.ruleNames.body1, test);
		const text =
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec egestas purus non augue tempor.";
		const component = (
			<NLinesText lineCount="2" textProps={nLinesTextProps}>
				{text}
			</NLinesText>
		);

		const mountedComponent = mount(component);

		expect(mountedComponent.exists(".test"), "to be true");
	});
});
