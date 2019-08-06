import React from "react";
import Text from "./Text";
import {
	Bar,
	ToolGroup,
	ToolbarButton,
	ToolbarButtonIcon,
	ToolbarButtonText,
	ToolbarInput,
	Separator,
	Spacer,
	toolComponents,
	Toolbar,
} from "./Toolbar";

const {
	input: ToolInput,
	button: ToolButton,
	group: Group,
	spacer: ToolSpacer,
	separator: ToolSeparator,
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
				type: "button",
				key: 6,
				label: { text: { id: "toolbar.button", defaultMessage: "Button" } },
				onClick: () => {},
			},
		];
	});

	it("renders a toolbar", () =>
		expect(<Toolbar tools={[]} />, "to exactly render as", <Bar />).then(() =>
			expect(console.error, "was not called"),
		));

	it("renders tools according to its configuration", () =>
		expect(
			<Toolbar tools={toolList} />,
			"to exactly render as",
			<Bar>
				<ToolInput
					type="search"
					onChange={toolList[0].onChange}
					value="search"
				/>
				<ToolButton onClick={toolList[1].onClick} label={{ icon: "funnel" }} />
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
				<ToolButton
					onClick={toolList[6].onClick}
					label={{ text: { id: "toolbar.button", defaultMessage: "Button" } }}
				/>
			</Bar>,
		).then(() => expect(console.error, "was not called")));
});

describe("toolComponents.input", () => {
	it("renders a styled input", () =>
		expect(
			<ToolInput
				random={4}
				oddProp="Test"
				onChange={console.log}
				things={{ stuff: "nonsense" }}
			/>,
			"to render as",
			<ToolbarInput
				random={4}
				oddProp="Test"
				onChange={console.log}
				things={{ stuff: "nonsense" }}
			/>,
		));
});

describe("toolComponents.button", () => {
	it("renders a styled empty button", () =>
		expect(
			<ToolButton random={4} label={{}} />,
			"to exactly render as",
			<ToolbarButton random={4} />,
		));

	it("renders a styled button with icon", () =>
		expect(
			<ToolButton oddProp="Test" label={{ icon: "test" }} />,
			"to exactly render as",
			<ToolbarButton oddProp="Test">
				<ToolbarButtonIcon id="test" />
			</ToolbarButton>,
		));

	it("renders a styled button with text", () =>
		expect(
			<ToolButton onClick={console.log} label={{ text: "A label" }} />,
			"to exactly render as",
			<ToolbarButton onClick={console.log}>
				<ToolbarButtonText>
					<Text message="A label" />
				</ToolbarButtonText>
			</ToolbarButton>,
		));

	it("renders a styled button with text and icon", () =>
		expect(
			<ToolButton
				things={{ stuff: "nonsense" }}
				label={{ icon: "test", text: "A label" }}
			/>,
			"to exactly render as",
			<ToolbarButton things={{ stuff: "nonsense" }}>
				<ToolbarButtonIcon id="test" />
				<ToolbarButtonText>
					<Text message="A label" />
				</ToolbarButtonText>
			</ToolbarButton>,
		));
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
			<Group tools={tools} />,
			"to exactly render as",
			<ToolGroup>
				<ToolButton label={{ text: "Button" }} onClick={tools[0].onClick} />
				<ToolInput onChange={tools[1].onChange} placeholder="Text" />
				<ToolButton label={{ text: "Button" }} onClick={tools[2].onClick} />
			</ToolGroup>,
		));
});

describe("toolComponents.spacer", () => {
	it("renders a styled spacer", () =>
		expect(<ToolSpacer />, "to render as", <Spacer />));
});

describe("toolComponents.separator", () => {
	it("renders a styled separator", () =>
		expect(<ToolSeparator />, "to render as", <Separator />));
});
