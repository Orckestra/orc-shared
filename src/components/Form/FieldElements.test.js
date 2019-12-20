import React from "react";
import { IntlProvider } from "react-intl";
import { mount } from "react-dom-testing";
import Fieldset from "./Fieldset";
import Combination from "./Combination";
import FieldList from "./FieldList";
import InputField from "./InputField";
import FieldElements from "./FieldElements";

describe("FieldElements", () => {
	let getUpdater, values;
	beforeEach(() => {
		getUpdater = name => () => name;
		values = {
			thing: "foo",
			stuff: "bar",
			item: 32,
			otherItem: "45",
		};
	});

	it(
		"renders a list of field elements, handling fieldsets, " +
			"combination fields, and lists",
		() =>
			expect(
				mount(
					<IntlProvider locale="en">
						<FieldElements
							fields={[
								{
									type: "ReadOnly",
									name: "thing",
									someProp: 12.5,
								},
								{
									type: "Fieldset",
									name: "set",
									label: "A field set",
									fields: [
										{
											type: "NumberInput",
											name: "stuff",
										},
									],
								},
								{
									type: "Combination",
									name: "combo",
									label: "Combined fields",
									proportions: ["300px", 100],
									fields: [
										{ type: "CheckboxInput", name: "item" },
										{ type: "EmailInput", name: "otheritem" },
									],
								},
								{
									type: "List",
									name: "list",
									rowCount: 15,
									someProp: "Is this way",
									rowField: { name: "listStuff", type: "TextInput" },
								},
							]}
							values={values}
							getUpdater={getUpdater}
						/>
					</IntlProvider>,
				).childNodes,
				"to satisfy",
				[
					<IntlProvider locale="en">
						<InputField
							key="thing"
							name="thing"
							type="ReadOnly"
							update={expect.it("when called", "to equal", "thing")}
							value="foo"
							someProp={12.5}
						/>
					</IntlProvider>,
					<IntlProvider locale="en">
						<Fieldset label="A field set">
							<FieldElements
								fields={[
									{
										type: "NumberInput",
										name: "stuff",
									},
								]}
								values={values}
								getUpdater={getUpdater}
							/>
						</Fieldset>
					</IntlProvider>,
					<IntlProvider locale="en">
						<Combination label="Combined fields" proportions={["300px", 100]}>
							<FieldElements
								fields={[
									{ type: "CheckboxInput", name: "item" },
									{ type: "EmailInput", name: "otheritem" },
								]}
								values={values}
								getUpdater={getUpdater}
							/>
						</Combination>
					</IntlProvider>,
					<IntlProvider locale="en">
						<FieldList
							name="list"
							values={values}
							rowField={{ name: "listStuff", type: "TextInput" }}
							getUpdater={getUpdater}
							rowCount={15}
							someProp="Is this way"
						/>
					</IntlProvider>,
				],
			),
	);

	it("handles absent update function and values", () =>
		expect(
			<IntlProvider locale="en">
				<FieldElements
					fields={[
						{
							type: "ReadOnly",
							name: "thing",
						},
					]}
				/>
			</IntlProvider>,
			"when mounted",
			"to satisfy",
			<IntlProvider locale="en">
				<React.Fragment>
					<InputField update={undefined} value={undefined} type="ReadOnly" />
				</React.Fragment>
			</IntlProvider>,
		));
});
