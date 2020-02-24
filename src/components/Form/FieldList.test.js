import React from "react";
import { Provider } from "react-redux";
import sinon from "sinon";
import { IntlProvider } from "react-intl";
import { getClassName, getClassSelector } from "../../utils/testUtils";
import FieldElements from "./FieldElements";
import Field from "./Field";
import { RoundButton } from "./Inputs/SmallButton";
import { FormInput } from "./Inputs/Text";
import { FormContext } from "./Form";
import FieldList, { List, ListControlButton, REMOVE_ROW } from "./FieldList";

describe("FieldList", () => {
	let clock;
	beforeEach(() => {
		clock = sinon.useFakeTimers();
	});
	afterEach(() => {
		clock.restore();
	});

	it("renders a minimal fixed-length list", () => {
		const update = sinon.spy().named("update");
		const getUpdater = name => value => update(name, value);
		return expect(
			<IntlProvider locale="en">
				<FormContext.Provider value={{ values: {} }}>
					<FieldList
						name="testlistminfixed"
						rowField={{ type: "TextInput", name: "data" }}
						getUpdater={getUpdater}
						rowCount={1}
					/>
				</FormContext.Provider>
			</IntlProvider>,
			"when mounted",
			"to satisfy",
			<FormContext.Provider value={{ values: {} }}>
				<List>
					<IntlProvider locale="en">
						<FieldElements
							fields={[{ type: "TextInput", name: "data" }]}
							labelOnly
						/>
					</IntlProvider>
					<IntlProvider locale="en">
						<FieldElements fields={[{ type: "TextInput", name: "data[0]" }]} />
					</IntlProvider>
				</List>
			</FormContext.Provider>,
		);
	});

	it("renders an empty fixed-length list", () => {
		const update = sinon.spy().named("update");
		const getUpdater = name => value => update(name, value);
		return expect(
			<IntlProvider locale="en">
				<FormContext.Provider value={{ values: {} }}>
					<FieldList
						name="testlistminfixed"
						rowField={{ type: "TextInput", name: "data" }}
						getUpdater={getUpdater}
						rowCount={0}
						values={{}}
					/>
				</FormContext.Provider>
			</IntlProvider>,
			"when mounted",
			"to satisfy",
			<List>
				<IntlProvider locale="en">
					<FormContext.Provider value={{ values: {} }}>
						<FieldElements
							fields={[{ type: "TextInput", name: "data" }]}
							labelOnly
						/>
					</FormContext.Provider>
				</IntlProvider>
			</List>,
		);
	});

	it("renders a fixed-length list with static values", () => {
		const update = sinon.spy().named("update");
		const getUpdater = name => value => update(name, value);
		return expect(
			<Provider
				store={{
					subscribe: () => {},
					dispatch: () => {},
					getState: () => ({}),
				}}
			>
				<IntlProvider locale="en">
					<FormContext.Provider
						value={{
							values: {
								testlistfixedstat: [
									{ id: 4, data: "foo" },
									{ id: 5, data: "bar" },
								],
							},
						}}
					>
						<FieldList
							name="testlistfixedstat"
							rowField={{ type: "TextInput", name: "data", label: "A label" }}
							getUpdater={getUpdater}
							rowCount={3}
							staticValues={[{ stat: true }, { stat: false }, { stat: true }]}
						/>
					</FormContext.Provider>
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
				<List>
					<IntlProvider locale="en">
						<FormContext.Provider value={{ values: {} }}>
							<FieldElements
								fields={[{ type: "TextInput", name: "data", label: "A label" }]}
								labelOnly
							/>
						</FormContext.Provider>
					</IntlProvider>
					<IntlProvider locale="en">
						<FormContext.Provider
							value={{
								values: { id: 4, data: "foo", stat: true },
								listIndex: 0,
							}}
						>
							<FieldElements fields={[{ type: "TextInput", name: "data" }]} />
						</FormContext.Provider>
					</IntlProvider>
					<IntlProvider locale="en">
						<FormContext.Provider
							value={{
								values: { id: 5, data: "bar", stat: false },
								listIndex: 1,
							}}
						>
							<FieldElements fields={[{ type: "TextInput", name: "data" }]} />
						</FormContext.Provider>
					</IntlProvider>
					<IntlProvider locale="en">
						<FormContext.Provider
							value={{
								values: {
									id: expect.it("to be a number").and("to be greater than", 5),
									stat: true,
								},
								listIndex: 2,
							}}
						>
							<FieldElements fields={[{ type: "TextInput", name: "data" }]} />
						</FormContext.Provider>
					</IntlProvider>
				</List>
			</Provider>,
		);
	});

	it("renders a fixed-length list with tall rows", () => {
		const update = sinon.spy().named("update");
		const getUpdater = name => value => update(name, value);
		return expect(
			<Provider
				store={{
					subscribe: () => {},
					dispatch: () => {},
					getState: () => ({}),
				}}
			>
				<IntlProvider locale="en">
					<FormContext.Provider
						value={{
							values: {
								testlisttallrows: [
									{ id: 4, data: "foo" },
									{ id: 5, data: "bar" },
								],
							},
						}}
					>
						<FieldList
							name="testlisttallrows"
							rowField={{ type: "TextInput", name: "data", label: "A label" }}
							getUpdater={getUpdater}
							rowCount={3}
							tallRows
							staticValues={[{ stat: true }, { stat: false }, { stat: true }]}
						/>
					</FormContext.Provider>
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
				<List tallRows>
					<IntlProvider locale="en">
						<FormContext.Provider
							value={{
								values: { id: 4, data: "foo", stat: true },
								listIndex: 0,
							}}
						>
							<FieldElements
								fields={[{ type: "TextInput", name: "data", label: "A label" }]}
							/>
						</FormContext.Provider>
					</IntlProvider>
					<IntlProvider locale="en">
						<FormContext.Provider
							value={{
								values: { id: 5, data: "bar", stat: false },
								listIndex: 1,
							}}
						>
							<FieldElements
								fields={[{ type: "TextInput", name: "data", label: "A label" }]}
							/>
						</FormContext.Provider>
					</IntlProvider>
					<IntlProvider locale="en">
						<FormContext.Provider
							value={{
								values: {
									id: expect.it("to be a number").and("to be greater than", 5),
									stat: true,
								},
								listIndex: 2,
							}}
						>
							<FieldElements
								fields={[{ type: "TextInput", name: "data", label: "A label" }]}
							/>
						</FormContext.Provider>
					</IntlProvider>
				</List>
			</Provider>,
		);
	});

	it("can edit values", () => {
		const update = sinon.spy().named("update");
		const getUpdater = name => value => update(name, value);
		return expect(
			<IntlProvider locale="en">
				<FormContext.Provider
					value={{
						values: {
							testlistedit: [
								{ id: 4, data: "foo" },
								{ id: 5, data: "bar" },
								{ id: 6, data: "feep" },
							],
						},
					}}
				>
					<FieldList
						name="testlistedit"
						rowField={{ type: "TextInput", name: "data" }}
						getUpdater={getUpdater}
						rowCount={3}
						staticValues={[{ stat: true }, { stat: false }, { stat: true }]}
					/>
				</FormContext.Provider>
			</IntlProvider>,
			"when mounted",
			"with event",
			{
				type: "change",
				value: "New Value",
				target: `.${getClassName(<List />)} > :nth-child(3) .${getClassName(
					<IntlProvider locale="en">
						<FormInput />
					</IntlProvider>,
				)}`,
			},
		).then(() =>
			expect(update, "to have calls satisfying", [
				{
					args: [
						"testlistedit",
						[
							{ id: 4, data: "foo" },
							{ id: 5, data: "New Value" },
							{ id: 6, data: "feep" },
						],
					],
				},
			]),
		);
	});

	it("renders a minimal variable-length list", () => {
		const update = sinon.spy().named("update");
		const getUpdater = name => value => update(name, value);
		return expect(
			<Provider
				store={{
					subscribe: () => {},
					dispatch: () => {},
					getState: () => ({}),
				}}
			>
				<IntlProvider locale="en">
					<FormContext.Provider value={{ values: {} }}>
						<FieldList
							name="testlistminvar"
							rowField={{ type: "TextInput", name: "data" }}
							getUpdater={getUpdater}
							values={{}}
						/>
					</FormContext.Provider>
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
					<FormContext.Provider value={{ values: {} }}>
						<List>
							<FieldElements
								fields={[
									{
										type: "Combination",
										name: "rowField",
										proportions: [100, "30px"],
										fields: [
											{ type: "TextInput", name: "data" },
											{
												type: "SmallButton",
												name: REMOVE_ROW,
												primary: true,
												icon: "cross",
											},
										],
									},
								]}
								labelOnly
							/>
							<Field>
								<ListControlButton>[add]</ListControlButton>
							</Field>
						</List>
					</FormContext.Provider>
				</IntlProvider>
			</Provider>,
		);
	});

	it("renders a variable-length list, with values and row addition", () => {
		const update = sinon.spy().named("update");
		const getUpdater = name => value => update(name, value);
		return expect(
			<Provider
				store={{
					subscribe: () => {},
					dispatch: () => {},
					getState: () => ({}),
				}}
			>
				<IntlProvider locale="en">
					<FormContext.Provider
						value={{
							values: {
								testlistvaradd: [
									{ id: 101, data: "foo", num: 55 },
									{ id: 102, data: "bar", num: 81 },
								],
							},
						}}
					>
						<FieldList
							name="testlistvaradd"
							rowField={{
								type: "Combination",
								name: "rowField",
								proportions: [50, 50],
								fields: [
									{ type: "TextInput", name: "data" },
									{
										type: "NumberInput",
										name: "num",
									},
								],
							}}
							getUpdater={getUpdater}
						/>
					</FormContext.Provider>
				</IntlProvider>
			</Provider>,
			"when mounted",
			"to satisfy",
			expect
				.it(
					"to satisfy",
					<Provider
						store={{
							subscribe: () => {},
							dispatch: () => {},
							getState: () => ({}),
						}}
					>
						<IntlProvider locale="en">
							<List>
								<FormContext.Provider value={{ values: {} }}>
									<FieldElements
										fields={[
											{
												type: "Combination",
												name: "rowField",
												proportions: [50, 50, "30px"],
												fields: [
													{ type: "TextInput", name: "data" },
													{
														type: "NumberInput",
														name: "num",
													},
													{
														type: "SmallButton",
														name: REMOVE_ROW,
														primary: true,
														icon: "cross",
														altText: "[remove]",
													},
												],
											},
										]}
										labelOnly
									/>
								</FormContext.Provider>
								<FormContext.Provider
									value={{
										values: { id: 101, data: "foo", num: 55 },
										listIndex: 0,
									}}
								>
									<FieldElements
										fields={[
											{
												type: "Combination",
												name: "rowField",
												proportions: [50, 50, "30px"],
												fields: [
													{ type: "TextInput", name: "data" },
													{
														type: "NumberInput",
														name: "num",
													},
													{
														type: "SmallButton",
														name: REMOVE_ROW,
														primary: true,
														icon: "cross",
														altText: "[remove]",
													},
												],
											},
										]}
									/>
								</FormContext.Provider>
								<FormContext.Provider
									value={{
										values: { id: 102, data: "bar", num: 81 },
										listIndex: 1,
									}}
								>
									<FieldElements
										fields={[
											{
												type: "Combination",
												name: "rowField",
												proportions: [50, 50, "30px"],
												fields: [
													{ type: "TextInput", name: "data" },
													{
														type: "NumberInput",
														name: "num",
													},
													{
														type: "SmallButton",
														name: REMOVE_ROW,
														primary: true,
														icon: "cross",
														altText: "[remove]",
													},
												],
											},
										]}
									/>
								</FormContext.Provider>
								<Field>
									<ListControlButton>[add]</ListControlButton>
								</Field>
							</List>
						</IntlProvider>
					</Provider>,
				)
				.and("with event", {
					type: "click",
					target: getClassSelector(<ListControlButton />),
				}),
		).then(() =>
			expect(update, "to have calls satisfying", [
				{
					args: [
						"testlistvaradd",
						[
							{ id: 101, data: "foo", num: 55 },
							{ id: 102, data: "bar", num: 81 },
							{
								id: expect.it("to be a number").and("to be greater than", 2),
							},
						],
					],
				},
			]),
		);
	});

	it("can delete rows", () => {
		const update = sinon.spy().named("update");
		const getUpdater = name => value => update(name, value);
		return expect(
			<Provider
				store={{
					subscribe: () => {},
					dispatch: () => {},
					getState: () => ({}),
				}}
			>
				<IntlProvider locale="en">
					<FormContext.Provider
						value={{
							values: {
								testlistrowdel: [
									{ id: 8, data: "bar" },
									{ id: 9, data: "foo" },
								],
							},
						}}
					>
						<FieldList
							name="testlistrowdel"
							rowField={{ type: "TextInput", name: "data" }}
							getUpdater={getUpdater}
						/>
					</FormContext.Provider>
				</IntlProvider>
			</Provider>,
			"when mounted",
			"with event",
			{
				type: "click",
				target: `.${getClassName(<List />)} > :nth-child(2) .${getClassName(
					<RoundButton />,
				)}`,
			},
		)
			.then(() => clock.tick(1))
			.then(() =>
				expect(update, "to have calls satisfying", [
					{
						args: ["testlistrowdel", [{ id: 9, data: "foo" }]],
					},
				]),
			);
	});

	it("will not render inside another list", () =>
		expect(
			<FormContext.Provider value={{ values: {}, listIndex: 0 }}>
				<FieldList listIndex={0} getUpdater={() => () => {}} />
			</FormContext.Provider>,
			"when mounted",
			"to satisfy",
			"Cannot render list inside list",
		));
});

describe("List", () => {
	it("sets layout for fieldboxes under it", () =>
		expect(
			<List />,
			"when mounted",
			"to have style rules satisfying",
			expect
				.it("to contain", "> .Field__FieldBox")
				.and("to contain", "margin-top: 20px"),
		));

	it("sets layout for fieldboxes under it with tall rows", () =>
		expect(
			<List tallRows />,
			"when mounted",
			"to have style rules satisfying",
			expect
				.it("to contain", "> .Field__FieldBox")
				.and("to contain", "border-bottom: 1px solid"),
		));
});
