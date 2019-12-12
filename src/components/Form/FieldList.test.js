import React from "react";
import sinon from "sinon";
import { IntlProvider } from "react-intl";
import { getClassName } from "../../utils/testUtils";
import Text from "../Text";
import FieldElements from "./FieldElements";
import Field from "./Field";
import { RoundButton } from "./Inputs/SmallButton";
import { FormInput } from "./Inputs/Text";
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
				<FieldList
					name="testlistminfixed"
					rowField={{ type: "TextInput", name: "data" }}
					getUpdater={getUpdater}
					rowCount={1}
					values={{}}
				/>
			</IntlProvider>,
			"when mounted",
			"to satisfy",
			<List>
				<IntlProvider locale="en">
					<FieldElements
						fields={[{ type: "TextInput", name: "data" }]}
						labelOnly
					/>
				</IntlProvider>
				<IntlProvider locale="en">
					<FieldElements
						fields={[{ type: "TextInput", name: "data[0]" }]}
						values={{
							id: expect.it("to be a number"),
						}}
					/>
				</IntlProvider>
			</List>,
		);
	});

	it("renders an empty fixed-length list", () => {
		const update = sinon.spy().named("update");
		const getUpdater = name => value => update(name, value);
		return expect(
			<IntlProvider locale="en">
				<FieldList
					name="testlistminfixed"
					rowField={{ type: "TextInput", name: "data" }}
					getUpdater={getUpdater}
					rowCount={0}
					values={{}}
				/>
			</IntlProvider>,
			"when mounted",
			"to satisfy",
			<List>
				<IntlProvider locale="en">
					<FieldElements
						fields={[{ type: "TextInput", name: "data" }]}
						labelOnly
					/>
				</IntlProvider>
			</List>,
		);
	});

	it("renders a fixed-length list with static values", () => {
		const update = sinon.spy().named("update");
		const getUpdater = name => value => update(name, value);
		return expect(
			<IntlProvider locale="en">
				<FieldList
					name="testlistfixedstat"
					rowField={{ type: "TextInput", name: "data", label: "A label" }}
					getUpdater={getUpdater}
					rowCount={3}
					staticValues={[{ stat: true }, { stat: false }, { stat: true }]}
					values={{
						testlistfixedstat: [
							{ id: 4, data: "foo" },
							{ id: 5, data: "bar" },
						],
					}}
				/>
			</IntlProvider>,
			"when mounted",
			"to satisfy",
			<List>
				<IntlProvider locale="en">
					<FieldElements
						fields={[{ type: "TextInput", name: "data", label: "A label" }]}
						labelOnly
					/>
				</IntlProvider>
				<IntlProvider locale="en">
					<FieldElements
						fields={[{ type: "TextInput", name: "data" }]}
						listIndex={0}
						values={{ id: 4, data: "foo", stat: true }}
					/>
				</IntlProvider>
				<IntlProvider locale="en">
					<FieldElements
						fields={[{ type: "TextInput", name: "data" }]}
						listIndex={1}
						values={{ id: 5, data: "bar", stat: false }}
					/>
				</IntlProvider>
				<IntlProvider locale="en">
					<FieldElements
						fields={[{ type: "TextInput", name: "data" }]}
						listIndex={2}
						values={{
							id: expect.it("to be a number").and("to be greater than", 5),
							stat: true,
						}}
					/>
				</IntlProvider>
			</List>,
		);
	});

	it("renders a fixed-length list with tall rows", () => {
		const update = sinon.spy().named("update");
		const getUpdater = name => value => update(name, value);
		return expect(
			<IntlProvider locale="en">
				<FieldList
					name="testlisttallrows"
					rowField={{ type: "TextInput", name: "data", label: "A label" }}
					getUpdater={getUpdater}
					rowCount={3}
					tallRows
					staticValues={[{ stat: true }, { stat: false }, { stat: true }]}
					values={{
						testlisttallrows: [
							{ id: 4, data: "foo" },
							{ id: 5, data: "bar" },
						],
					}}
				/>
			</IntlProvider>,
			"when mounted",
			"to satisfy",
			<List tallRows>
				<IntlProvider locale="en">
					<FieldElements
						fields={[{ type: "TextInput", name: "data", label: "A label" }]}
						listIndex={0}
						values={{ id: 4, data: "foo", stat: true }}
					/>
				</IntlProvider>
				<IntlProvider locale="en">
					<FieldElements
						fields={[{ type: "TextInput", name: "data", label: "A label" }]}
						listIndex={1}
						values={{ id: 5, data: "bar", stat: false }}
					/>
				</IntlProvider>
				<IntlProvider locale="en">
					<FieldElements
						fields={[{ type: "TextInput", name: "data", label: "A label" }]}
						listIndex={2}
						values={{
							id: expect.it("to be a number").and("to be greater than", 5),
							stat: true,
						}}
					/>
				</IntlProvider>
			</List>,
		);
	});

	it("can edit values", () => {
		const update = sinon.spy().named("update");
		const getUpdater = name => value => update(name, value);
		return expect(
			<IntlProvider locale="en">
				<FieldList
					name="testlistedit"
					rowField={{ type: "TextInput", name: "data" }}
					getUpdater={getUpdater}
					rowCount={3}
					staticValues={[{ stat: true }, { stat: false }, { stat: true }]}
					values={{
						testlistedit: [
							{ id: 4, data: "foo" },
							{ id: 5, data: "bar" },
							{ id: 6, data: "feep" },
						],
					}}
				/>
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
			<IntlProvider locale="en">
				<FieldList
					name="testlistminvar"
					rowField={{ type: "TextInput", name: "data" }}
					getUpdater={getUpdater}
					values={{}}
				/>
			</IntlProvider>,
			"when mounted",
			"to satisfy",
			<IntlProvider locale="en">
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
						<ListControlButton>
							<Text message="[add]" />
						</ListControlButton>
					</Field>
				</List>
			</IntlProvider>,
		);
	});

	it("renders a variable-length list, with values and row addition", () => {
		const update = sinon.spy().named("update");
		const getUpdater = name => value => update(name, value);
		return expect(
			<IntlProvider locale="en">
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
					values={{
						testlistvaradd: [
							{ id: 101, data: "foo", num: 55 },
							{ id: 102, data: "bar", num: 81 },
						],
					}}
				/>
			</IntlProvider>,
			"when mounted",
			expect
				.it(
					"to satisfy",
					<IntlProvider locale="en">
						<List>
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
							<FieldElements
								listIndex={0}
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
								values={{ id: 101, data: "foo", num: 55 }}
							/>
							<FieldElements
								listIndex={1}
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
								values={{ id: 102, data: "bar", num: 81 }}
							/>
							<Field>
								<ListControlButton>
									<Text message="[add]" />
								</ListControlButton>
							</Field>
						</List>
					</IntlProvider>,
				)
				.and("with event", {
					type: "click",
					target: "." + getClassName(<ListControlButton />),
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
			<IntlProvider locale="en">
				<FieldList
					name="testlistrowdel"
					rowField={{ type: "TextInput", name: "data" }}
					getUpdater={getUpdater}
					values={{
						testlistrowdel: [
							{ id: 8, data: "bar" },
							{ id: 9, data: "foo" },
						],
					}}
				/>
			</IntlProvider>,
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
			<FieldList listIndex={0} />,
			"when mounted",
			"to satisfy",
			<span>Cannot render list inside list</span>,
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
