import React from "react";
import sinon from "sinon";
import { IntlProvider } from "react-intl";
import Text from "../Text";
import FieldElements from "./FieldElements";
import Field from "./Field";
import InputField from "./InputField";
import SmallButton, { RoundButton } from "./Inputs/SmallButton";
import { TextInput, FormInput } from "./Inputs/Text";
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
			<FieldList
				name="testlistminfixed"
				rowField={{ type: "TextInput", name: "data" }}
				getUpdater={getUpdater}
				rowCount={1}
				values={{}}
			/>,
			"renders elements", // render through withRowGetter
			"renders elements", // render through withListUpdater
			"when rendered",
			"to have rendered",
			<List>
				<FieldElements
					fields={[{ type: "TextInput", name: "data" }]}
					labelOnly
				/>
				<FieldElements
					fields={[{ type: "TextInput", name: "data" }]}
					values={{
						id: expect.it("to be a number"),
					}}
				/>
			</List>,
		);
	});

	it("renders an empty fixed-length list", () => {
		const update = sinon.spy().named("update");
		const getUpdater = name => value => update(name, value);
		return expect(
			<FieldList
				name="testlistminfixed"
				rowField={{ type: "TextInput", name: "data" }}
				getUpdater={getUpdater}
				rowCount={0}
				values={{}}
			/>,
			"renders elements", // render through withRowGetter
			"renders elements", // render through withListUpdater
			"when rendered",
			"to have rendered",
			<List>
				<FieldElements
					fields={[{ type: "TextInput", name: "data" }]}
					labelOnly
				/>
			</List>,
		);
	});

	it("renders a fixed-length list with static values", () => {
		const update = sinon.spy().named("update");
		const getUpdater = name => value => update(name, value);
		return expect(
			<FieldList
				name="testlistfixedstat"
				rowField={{ type: "TextInput", name: "data" }}
				getUpdater={getUpdater}
				rowCount={3}
				staticValues={[{ stat: true }, { stat: false }, { stat: true }]}
				values={{
					testlistfixedstat: [{ id: 4, data: "foo" }, { id: 5, data: "bar" }],
				}}
			/>,
			"renders elements", // render through withRowGetter
			"renders elements", // render through withListUpdater
			"when rendered",
			"to have rendered",
			<List>
				<FieldElements
					fields={[{ type: "TextInput", name: "data" }]}
					labelOnly
				/>
				<FieldElements
					fields={[{ type: "TextInput", name: "data" }]}
					listIndex={0}
					values={{ id: 4, data: "foo", stat: true }}
				/>
				<FieldElements
					fields={[{ type: "TextInput", name: "data" }]}
					listIndex={1}
					values={{ id: 5, data: "bar", stat: false }}
				/>
				<FieldElements
					fields={[{ type: "TextInput", name: "data" }]}
					listIndex={2}
					values={{
						id: expect.it("to be a number").and("to be greater than", 5),
						stat: true,
					}}
				/>
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
			"when deeply rendered",
			"queried for",
			<FieldElements values={{ id: 5 }} />,
			"queried for",
			<InputField type="TextInput" />,
			"queried for",
			<TextInput />,
			"with event",
			"change",
			{ target: { value: "New Value" } },
			"on",
			<FormInput />,
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
			<FieldList
				name="testlistminvar"
				rowField={{ type: "TextInput", name: "data" }}
				getUpdater={getUpdater}
				values={{}}
			/>,
			"renders elements", // render through withRowGetter
			"renders elements", // render through withListUpdater
			"when rendered",
			"to have rendered",
			<List>
				<FieldElements
					fields={[
						{
							type: "Combination",
							name: "rowField",
							proportions: ["340px", "30px"],
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
			</List>,
		);
	});

	it("renders a variable-length list, with values and row addition", () => {
		const update = sinon.spy().named("update");
		const getUpdater = name => value => update(name, value);
		return expect(
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
			/>,
			"renders elements", // render through withRowGetter
			"renders elements", // render through withListUpdater
			"when rendered",
		).then(render =>
			expect(
				render,
				"to have rendered",
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
									},
								],
							},
						]}
						labelOnly
					/>
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
									},
								],
							},
						]}
						values={{ id: 101, data: "foo", num: 55 }}
					/>
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
				</List>,
			)
				.and("with event click", "on", <ListControlButton />)
				.then(() =>
					expect(update, "to have calls satisfying", [
						{
							args: [
								"testlistvaradd",
								[
									{ id: 101, data: "foo", num: 55 },
									{ id: 102, data: "bar", num: 81 },
									{
										id: expect
											.it("to be a number")
											.and("to be greater than", 2),
									},
								],
							],
						},
					]),
				),
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
						testlistrowdel: [{ id: 8, data: "bar" }, { id: 9, data: "foo" }],
					}}
				/>
			</IntlProvider>,
			"when deeply rendered",
			"queried for",
			<FieldElements values={{ id: 9 }} />,
			"queried for",
			<InputField type="SmallButton" />,
			"queried for",
			<SmallButton />,
			"with event",
			"click",
			"on",
			<RoundButton />,
		)
			.then(() => clock.tick(1))
			.then(() =>
				expect(update, "to have calls satisfying", [
					{
						args: ["testlistrowdel", [{ id: 8, data: "bar" }]],
					},
				]),
			);
	});

	it("will not render inside another list", () =>
		expect(
			<FieldList listIndex={0} />,
			"to deeply render as",
			<span>Cannot render list inside list</span>,
		));
});
