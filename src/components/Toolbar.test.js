import React from "react";
import { Provider } from "react-redux";
import { IntlProvider } from "react-intl";
import { spyOnConsole } from "../utils/testUtils";
import IconButton from "./IconButton";
import RadioProps from "./MaterialUI/Inputs/RadioProps";
import {
	Bar,
	ToolGroup,
	ToolbarButton,
	ToolbarInput,
	Separator,
	Spacer,
	ToolbarLabel,
	ToolbarRadio,
	ToolbarRadioWrapper,
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
	radio: ToolRadio,
} = toolComponents;

describe("Toolbar", () => {
	spyOnConsole();
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
			{
				type: "radio",
				key: 9,
				name: "aRadioName",
				label: "aRadioLabel",
				value: "option1",
				defaultVal: "option1",
				update: () => {},
				radios: [
					{ label: "Option 1", value: "option1" },
					{ label: "Option 2", value: "option2" },
					{ label: "Option 3", value: "option3" },
				],
				row: true,
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
			<Provider
				store={{
					subscribe: () => {},
					dispatch: () => {},
					getState: () => ({}),
				}}
			>
				<IntlProvider locale="en">
					<Toolbar tools={toolList} />
				</IntlProvider>
			</Provider>,
			"when mounted",
			"to satisfy",
			<Provider
				store={{
					subscribe: () => {},
					dispatch: () => {},
					getState: () => ({}),
				}}
			>
				<IntlProvider locale="en">
					<Bar>
						<ToolInput type="search" onChange={toolList[0].onChange} value="search" />
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
						<ToolButton onClick={toolList[4].onClick} label={{ icon: "eye", text: "Button" }} primary />
						<ToolSeparator />
						<ToolLabel label={{ id: "toolbar.label", defaultMessage: "Label message" }} />
						<ToolButton
							onClick={toolList[7].onClick}
							label={{
								text: { id: "toolbar.button", defaultMessage: "Button" },
							}}
						/>
						<ToolLabel label="Label message" />
						<ToolRadio
							name="aRadioName"
							label="aRadioLabel"
							value="option1"
							defaultVal="option1"
							update={toolList[9].update}
							radios={[
								{ label: "Option 1", value: "option1" },
								{ label: "Option 2", value: "option2" },
								{ label: "Option 3", value: "option3" },
							]}
							row={true}
						/>
					</Bar>
				</IntlProvider>
			</Provider>,
		).then(() => expect(console.error, "was not called")));
});

describe("toolComponents.input", () => {
	it("renders a styled input", () =>
		expect(
			<IntlProvider locale="en">
				<ToolInput random={4} oddProp="Test" onChange={jest.fn()} things={{ stuff: "nonsense" }} />
			</IntlProvider>,
			"when mounted",
			"to satisfy",
			<IntlProvider locale="en">
				<ToolbarInput random={4} oddProp="Test" onChange={jest.fn()} things={{ stuff: "nonsense" }} />
			</IntlProvider>,
		));
});

describe("toolComponents.button", () => {
	it("renders a styled empty button", () =>
		expect(
			<Provider
				store={{
					subscribe: () => {},
					dispatch: () => {},
					getState: () => ({}),
				}}
			>
				<ToolButton random={4} />
			</Provider>,
			"when mounted",
			"to satisfy",
			<Provider
				store={{
					subscribe: () => {},
					dispatch: () => {},
					getState: () => ({}),
				}}
			>
				<ToolbarButton random={4} />
			</Provider>,
		));

	it("renders a styled button with icon", () =>
		expect(
			<Provider
				store={{
					subscribe: () => {},
					dispatch: () => {},
					getState: () => ({}),
				}}
			>
				<ToolButton oddProp="Test" label={{ icon: "test" }} />
			</Provider>,
			"when mounted",
			"to satisfy",
			<Provider
				store={{
					subscribe: () => {},
					dispatch: () => {},
					getState: () => ({}),
				}}
			>
				<ToolbarButton oddProp="Test" icon="test" />
			</Provider>,
		));

	it("renders a styled button with text", () =>
		expect(
			<Provider
				store={{
					subscribe: () => {},
					dispatch: () => {},
					getState: () => ({}),
				}}
			>
				<ToolButton onClick={jest.fn()} label={{ text: "A label" }} />
			</Provider>,
			"when mounted",
			"to satisfy",
			<Provider
				store={{
					subscribe: () => {},
					dispatch: () => {},
					getState: () => ({}),
				}}
			>
				<ToolbarButton onClick={jest.fn()} label="A label" />
			</Provider>,
		));

	it("renders a styled button with text and icon", () =>
		expect(
			<Provider
				store={{
					subscribe: () => {},
					dispatch: () => {},
					getState: () => ({}),
				}}
			>
				<ToolButton things={{ stuff: "nonsense" }} label={{ icon: "test", text: "A label" }} />
			</Provider>,
			"when mounted",
			"to satisfy",
			<Provider
				store={{
					subscribe: () => {},
					dispatch: () => {},
					getState: () => ({}),
				}}
			>
				<ToolbarButton things={{ stuff: "nonsense" }} icon="test" label="A label" />
			</Provider>,
		));

	describe("ToolbarButton", () => {
		it("renders an IconButton", () =>
			expect(
				<Provider
					store={{
						subscribe: () => {},
						dispatch: () => {},
						getState: () => ({}),
					}}
				>
					<ToolbarButton things={{ stuff: "nonsense" }} icon="test" label="A label" />
				</Provider>,
				"when mounted",
				"to satisfy",
				<Provider
					store={{
						subscribe: () => {},
						dispatch: () => {},
						getState: () => ({}),
					}}
				>
					<IconButton things={{ stuff: "nonsense" }} icon="test" label="A label" />
				</Provider>,
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
			<Provider
				store={{
					subscribe: () => {},
					dispatch: () => {},
					getState: () => ({}),
				}}
			>
				<IntlProvider locale="en">
					<Group tools={tools} />
				</IntlProvider>
			</Provider>,
			"when mounted",
			"to satisfy",
			<Provider
				store={{
					subscribe: () => {},
					dispatch: () => {},
					getState: () => ({}),
				}}
			>
				<ToolGroup>
					<ToolButton label={{ text: "Button" }} onClick={tools[0].onClick} />
					<IntlProvider locale="en">
						<ToolInput onChange={tools[1].onChange} placeholder="Text" />
					</IntlProvider>
					<ToolButton label={{ text: "Button" }} onClick={tools[2].onClick} />
				</ToolGroup>
			</Provider>,
		));
});

describe("toolComponents.spacer", () => {
	it("renders a styled spacer", () => expect(<ToolSpacer />, "when mounted", "to satisfy", <Spacer />));
});

describe("toolComponents.separator", () => {
	it("renders a styled separator", () => expect(<ToolSeparator />, "when mounted", "to satisfy", <Separator />));
});

describe("toolComponents.label", () => {
	it("renders a styled label", () =>
		expect(
			<Provider
				store={{
					subscribe: () => {},
					dispatch: () => {},
					getState: () => ({}),
				}}
			>
				<IntlProvider locale="en">
					<ToolLabel label={{ id: "toolbar.label", defaultMessage: "A label" }} />
				</IntlProvider>
			</Provider>,
			"when mounted",
			"to satisfy",
			<ToolbarLabel>A label</ToolbarLabel>,
		));
});

describe("toolComponents.radio", () => {
	let radios, radioProps;
	beforeEach(() => {
		radios = [
			{ label: "Option 1", value: "option1" },
			{ label: "Option 2", value: "option2" },
			{ label: "Option 3", value: "option3" },
		];

		radioProps = new RadioProps();
		radioProps.set(RadioProps.propNames.name, "aRadioName");
		radioProps.set(RadioProps.propNames.label, "aRadioLabel");
		radioProps.set(RadioProps.propNames.defaultVal, "option1");
		radioProps.set(RadioProps.propNames.value, "option1");
		radioProps.set(RadioProps.propNames.update, jest.fn());
		radioProps.set(RadioProps.propNames.radios, radios);
		radioProps.set(RadioProps.propNames.row, true);
	});

	it("renders a styled radio", () =>
		expect(
			<Provider
				store={{
					subscribe: () => {},
					dispatch: () => {},
					getState: () => ({}),
				}}
			>
				<ToolRadio
					name="aRadioName"
					label="aRadioLabel"
					value="option1"
					defaultVal="option1"
					update={jest.fn()}
					radios={radios}
					row={true}
				/>
			</Provider>,
			"when mounted",
			"to satisfy",
			<ToolbarRadioWrapper>
				<ToolbarRadio radioProps={radioProps} />
			</ToolbarRadioWrapper>,
		));
});
