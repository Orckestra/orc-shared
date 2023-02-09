import React from "react";
import { mount } from "enzyme";
import { IntlProvider } from "react-intl";
import Typography from "@mui/material/Typography";
import InformationItem from "./InformationItem";
import MultipleLinesText from "../TooltippedElements/MultipleLinesText";
import { stringifyWithoutQuotes } from "./../../../../utils/parseHelper";
import sharedMessages from "./../../../../sharedMessages";
import { extractMessages } from "./../../../../utils/testUtils";
import TextProps from "../../textProps";

const messages = extractMessages(sharedMessages);

describe("Information Item", () => {
	it("Renders Information Item properly", () => {
		const label = "label";
		const value = "value";

		const component = (
			<IntlProvider locale="en-US">
				<InformationItem label={label}>{value}</InformationItem>
			</IntlProvider>
		);

		const expected = (
			<div>
				<Typography children={label} />
				<MultipleLinesText>{value}</MultipleLinesText>
			</div>
		);

		expect(component, "when mounted", "to satisfy", expected);
	});

	it("Renders Information Item with null value and showNotAvailable property is false", () => {
		const label = "label";
		const value = null;

		const component = (
			<IntlProvider locale="en-US">
				<InformationItem label={label}>{value}</InformationItem>
			</IntlProvider>
		);

		const expected = (
			<div>
				<Typography children={label} />
				<MultipleLinesText>{""}</MultipleLinesText>
			</div>
		);

		expect(component, "when mounted", "to satisfy", expected);
	});

	it("Renders Information Item with max line count", () => {
		const label = "label";
		const value = "value";

		const multipleLinesTextProps = new TextProps();
		multipleLinesTextProps.set(TextProps.propNames.lineCount, 2);

		const component = (
			<IntlProvider locale="en-US">
				<InformationItem label={label} isMaxLineCountEnabled={true}>
					{value}
				</InformationItem>
			</IntlProvider>
		);

		const expected = (
			<div>
				<Typography children={label} />
				<MultipleLinesText textProps={multipleLinesTextProps}>{value}</MultipleLinesText>
			</div>
		);

		expect(component, "when mounted", "to satisfy", expected);
	});

	it("Renders Information Item without max line count", () => {
		const label = "label";
		const value = "value";

		const multipleLinesTextProps = new TextProps();
		multipleLinesTextProps.set(TextProps.propNames.lineCount, 2);

		const component = (
			<IntlProvider locale="en-US">
				<InformationItem label={label}>{value}</InformationItem>
			</IntlProvider>
		);

		const expected = (
			<div>
				<Typography children={label} />
				<MultipleLinesText textProps={multipleLinesTextProps}>{value}</MultipleLinesText>
			</div>
		);

		expect(component, "when mounted", "to satisfy", expected);
	});

	it("Renders Information Item with max line count false", () => {
		const label = "label";
		const value = "value";

		const component = (
			<IntlProvider locale="en-US">
				<InformationItem label={label} isMaxLineCountEnabled={false}>
					{value}
				</InformationItem>
			</IntlProvider>
		);

		const expected = (
			<div>
				<Typography children={label} />
				<MultipleLinesText>{value}</MultipleLinesText>
			</div>
		);

		expect(component, "when mounted", "to satisfy", expected);
	});

	it("Renders Information Item with null max line count", () => {
		const label = "label";
		const value = "value";

		const multipleLinesTextProps = new TextProps();
		multipleLinesTextProps.set(TextProps.propNames.lineCount, 2);

		const component = (
			<IntlProvider locale="en-US">
				<InformationItem label={label} isMaxLineCountEnabled={null}>
					{value}
				</InformationItem>
			</IntlProvider>
		);

		const expected = (
			<div>
				<Typography children={label} />
				<MultipleLinesText textProps={multipleLinesTextProps}>{value}</MultipleLinesText>
			</div>
		);

		expect(component, "when mounted", "to satisfy", expected);
	});

	it("Renders Information Item with undefined max line count", () => {
		const label = "label";
		const value = "value";

		const multipleLinesTextProps = new TextProps();
		multipleLinesTextProps.set(TextProps.propNames.lineCount, 2);

		const component = (
			<IntlProvider locale="en-US">
				<InformationItem label={label} isMaxLineCountEnabled={undefined}>
					{value}
				</InformationItem>
			</IntlProvider>
		);

		const expected = (
			<div>
				<Typography children={label} />
				<MultipleLinesText textProps={multipleLinesTextProps}>{value}</MultipleLinesText>
			</div>
		);

		expect(component, "when mounted", "to satisfy", expected);
	});

	it("Renders Information Item with null value and showNotAvailable property is true", () => {
		const label = "label";
		const value = null;
		const notAvailable = true;

		const component = (
			<IntlProvider locale="en-US" messages={messages}>
				<InformationItem label={label} showNotAvailable={notAvailable}>
					{value}
				</InformationItem>
			</IntlProvider>
		);

		const expected = (
			<IntlProvider locale="en-US" messages={messages}>
				<div>
					<Typography children={label} />
					<MultipleLinesText>{stringifyWithoutQuotes(messages["orc-shared.notAvailable"])}</MultipleLinesText>
				</div>
			</IntlProvider>
		);

		expect(component, "when mounted", "to satisfy", expected);
	});

	it("Renders Information Item properly when value is a jsx element", () => {
		const label = "label";
		const value = <p>Value</p>;

		const component = (
			<IntlProvider locale="en-US">
				<InformationItem label={label}>{value}</InformationItem>
			</IntlProvider>
		);

		const expected = (
			<div>
				<Typography children={label} />
				{value}
			</div>
		);

		expect(component, "when mounted", "to satisfy", expected);
	});

	it("Renders Information Item without label", () => {
		const value = <p>Value</p>;

		const component = (
			<IntlProvider locale="en-US">
				<InformationItem>{value}</InformationItem>
			</IntlProvider>
		);

		const expected = <div>{value}</div>;

		expect(component, "when mounted", "to satisfy", expected);
	});

	it("Renders Information Item with localized label", () => {
		const label = { id: "label.name", defaultMessage: "a label" };
		const value = <p>Value</p>;

		const component = (
			<IntlProvider locale="en" messages={{ label }}>
				<InformationItem label={label} required={true}>
					{value}
				</InformationItem>
			</IntlProvider>
		);

		const expected = (
			<div>
				<Typography children={label.defaultMessage} />
				{value}
			</div>
		);

		expect(component, "when mounted", "to satisfy", expected);
	});

	it("Renders Information Item with error", () => {
		const label = "label";
		const value = "value";

		const component = mount(
			<IntlProvider locale="en-US">
				<InformationItem label={label} error={true}>
					{value}
				</InformationItem>
			</IntlProvider>,
		);

		const labelContainer = component.find("p").get(0);

		expect(labelContainer, "when mounted", "to have style rules satisfying", "to contain", "color: #f44336");
	});

	it("Renders Information Item with required", () => {
		const label = "label";
		const value = "value";

		const component = mount(
			<IntlProvider locale="en-US">
				<InformationItem label={label} required={true}>
					{value}
				</InformationItem>
			</IntlProvider>,
		);

		const labelContainer = component.find("p").get(0);

		expect(labelContainer, "when mounted", "to have style rules satisfying", "to contain", 'content: " *"');
	});

	it("Renders Information Item properly with a header icon", () => {
		const label = "label";
		const value = "value";

		const component = (
			<IntlProvider locale="en-US">
				<InformationItem label={label} headerIcon={<span>the header icon</span>}>
					{value}
				</InformationItem>
			</IntlProvider>
		);

		const expected = (
			<div>
				<div>
					<div>
						<Typography children={label} />
					</div>
					<div>
						<span>the header icon</span>
					</div>
				</div>
				<MultipleLinesText>{value}</MultipleLinesText>
			</div>
		);

		expect(component, "when mounted", "to satisfy", expected);
	});
});
