import React from "react";
import { mount } from "enzyme";
import { IntlProvider } from "react-intl";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import InformationItem from "./InformationItem";
import MultipleLinesText from "../TooltippedElements/MultipleLinesText";
import { stringifyWithoutQuotes } from "./../../../../utils/parseHelper";
import sharedMessages from "./../../../../sharedMessages";
import { extractMessages } from "./../../../../utils/testUtils";

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
			<Grid item>
				<Typography children={label} />
				<MultipleLinesText>{value}</MultipleLinesText>
			</Grid>
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
			<Grid item>
				<Typography children={label} />
				<MultipleLinesText>{""}</MultipleLinesText>
			</Grid>
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
				<Grid item>
					<Typography children={label} />
					<MultipleLinesText>{stringifyWithoutQuotes(messages["orc-shared.notAvailable"])}</MultipleLinesText>
				</Grid>
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
			<Grid item>
				<Typography children={label} />
				{value}
			</Grid>
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

		const expected = <Grid item>{value}</Grid>;

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
			<Grid item>
				<Typography children={label.defaultMessage} />
				{value}
			</Grid>
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
});
