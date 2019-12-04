import React from "react";
import { IntlProvider } from "react-intl";
import Text from "./Text";
import IconButton from "./IconButton";
import {
	Bar,
	ToolGroup,
	ToolbarButton,
	ToolbarInput,
	Separator,
	Spacer,
	ToolbarLabel,
	toolComponents,
	Toolbar,
} from "./Toolbar";

const {
	input: ToolInput,
	button: ToolButton,
	group: Group,
	spacer: ToolSpacer,
	separator: ToolSeparator,
	label: ToolLabel,
} = toolComponents;

describe("Toolbar", () => {
	let toolList;
	beforeEach(() => {
		toolList = [
			{
				type: "input",
				subType: "search",
				key: 0,
				onChange: () => {},
				value: "search",
			},
			{
				type: "button",
				key: 1,
				label: { icon: "funnel" },
				onClick: () => {},
			},
			{ type: "spacer", key: 2 },
			{
				type: "group",
				key: 3,
				tools: [
					{
						type: "button",
						key: 0,
						label: { text: "Button" },
						onClick: () => {},
					},
					{
						type: "input",
						key: 1,
						onChange: e => {},
						placeholder: "Text",
					},
					{
						type: "button",
						key: 2,
						label: { text: "Button" },
						onClick: () => {},
					},
				],
			},
			{
				type: "button",
				key: 4,
				label: { icon: "eye", text: "Button" },
				onClick: () => {},
				primary: true,
			},
			{ type: "separator", key: 5 },
			{
				type: "label",
				key: 6,
				label: { id: "toolbar.label", defaultMessage: "Label message" },
			},
			{
				type: "button",
				key: 7,
				label: { text: { id: "toolbar.button", defaultMessage: "Button" } },
				onClick: () => {},
			},
			{
				type: "label",
				key: 8,
				label: "Label message",
			},
		];
	});

	it("renders a toolbar", () =>
		expect(
			<IntlProvider locale="en">
				<Toolbar tools={[]} />
			</IntlProvider>,
			"when mounted",
			"to satisfy",
			<Bar />,
		).then(() => expect(console.error, "was not called")));

	it("renders tools according to its configuration", () =>
		expect(
			<IntlProvider locale="en">
				<Toolbar tools={toolList} />
			</IntlProvider>,
			"when mounted",
			"to satisfy",
			<IntlProvider locale="en">
				<Bar>
					<ToolInput
						type="search"
						onChange={toolList[0].onChange}
						value="search"
					/>
					<ToolButton
						onClick={toolList[1].onClick}
						label={{ icon: "funnel" }}
					/>
					<ToolSpacer />
					<Group
						tools={[
							{
								type: "button",
								key: 0,
								label: { text: "Button" },
								onClick: toolList[3].tools[0].onClick,
							},
							{
								type: "input",
								key: 1,
								onChange: toolList[3].tools[1].onChange,
								placeholder: "Text",
							},
							{
								type: "button",
								key: 2,
								label: { text: "Button" },
								onClick: toolList[3].tools[2].onClick,
							},
						]}
					/>
					<ToolButton
						onClick={toolList[4].onClick}
						label={{ icon: "eye", text: "Button" }}
						primary
					/>
					<ToolSeparator />
					<ToolLabel
						label={{ id: "toolbar.label", defaultMessage: "Label message" }}
					/>
					<ToolButton
						onClick={toolList[7].onClick}
						label={{ text: { id: "toolbar.button", defaultMessage: "Button" } }}
					/>
					<ToolLabel label="Label message" />
				</Bar>
			</IntlProvider>,
		).then(() => expect(console.error, "was not called")));
});

describe("toolComponents.input", () => {
	it("renders a styled input", () =>
		expect(
			<IntlProvider locale="en">
				<ToolInput
					random={4}
					oddProp="Test"
					onChange={console.log}
					things={{ stuff: "nonsense" }}
				/>
			</IntlProvider>,
			"when mounted",
			"to satisfy",
			<IntlProvider locale="en">
				<ToolbarInput
					random={4}
					oddProp="Test"
					onChange={console.log}
					things={{ stuff: "nonsense" }}
				/>
			</IntlProvider>,
		));
});

describe("toolComponents.button", () => {
	it("renders a styled empty button", () =>
		expect(
			<ToolButton random={4} />,
			"when mounted",
			"to satisfy",
			<ToolbarButton random={4} />,
		));

	it("renders a styled button with icon", () =>
		expect(
			<ToolButton oddProp="Test" label={{ icon: "test" }} />,
			"when mounted",
			"to satisfy",
			<ToolbarButton oddProp="Test" icon="test" />,
		));

	it("renders a styled button with text", () =>
		expect(
			<ToolButton onClick={console.log} label={{ text: "A label" }} />,
			"when mounted",
			"to satisfy",
			<ToolbarButton onClick={console.log} label="A label" />,
		));

	it("renders a styled button with text and icon", () =>
		expect(
			<ToolButton
				things={{ stuff: "nonsense" }}
				label={{ icon: "test", text: "A label" }}
			/>,
			"when mounted",
			"to satisfy",
			<ToolbarButton
				things={{ stuff: "nonsense" }}
				icon="test"
				label="A label"
			/>,
		));

	describe("ToolbarButton", () => {
		it("renders an IconButton", () =>
			expect(
				<ToolbarButton
					things={{ stuff: "nonsense" }}
					icon="test"
					label="A label"
				/>,
				"when mounted",
				"to satisfy",
				<IconButton
					things={{ stuff: "nonsense" }}
					icon="test"
					label="A label"
				/>,
			));
	});
});

describe("toolComponents.group", () => {
	let tools;
	beforeEach(() => {
		tools = [
			{
				type: "button",
				key: 0,
				label: { text: "Button" },
				onClick: () => {},
			},
			{
				type: "input",
				key: 1,
				onChange: e => {},
				placeholder: "Text",
			},
			{
				type: "button",
				key: 2,
				label: { text: "Button" },
				onClick: () => {},
			},
		];
	});

	it("renders a styled group", () =>
		expect(
			<IntlProvider locale="en">
				<Group tools={tools} />
			</IntlProvider>,
			"when mounted",
			"to satisfy",
			<ToolGroup>
				<ToolButton label={{ text: "Button" }} onClick={tools[0].onClick} />
				<IntlProvider locale="en">
					<ToolInput onChange={tools[1].onChange} placeholder="Text" />
				</IntlProvider>
				<ToolButton label={{ text: "Button" }} onClick={tools[2].onClick} />
			</ToolGroup>,
		));
});

describe("toolComponents.spacer", () => {
	it("renders a styled spacer", () =>
		expect(<ToolSpacer />, "when mounted", "to satisfy", <Spacer />));
});

describe("toolComponents.separator", () => {
	it("renders a styled separator", () =>
		expect(<ToolSeparator />, "when mounted", "to satisfy", <Separator />));
});

describe("toolComponents.label", () => {
	it("renders a styled label", () =>
		expect(
			<ToolLabel label={{ id: "toolbar.label", defaultMessage: "A label" }} />,
			"when mounted",
			"to satisfy",
			<ToolbarLabel>
				<Text message={{ id: "toolbar.label", defaultMessage: "A label" }} />
			</ToolbarLabel>,
		));
});
