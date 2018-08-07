import React from "react";
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
				<FieldElements
					fields={[
						{
							type: "Something",
							name: "thing",
							someProp: 12.5,
						},
						{
							type: "Fieldset",
							name: "set",
							label: "A field set",
							fields: [
								{
									type: "Whatever",
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
								{ type: "AnotherThing", name: "item" },
								{ type: "EvenMore", name: "otheritem" },
							],
						},
						{
							type: "List",
							name: "list",
							rowCount: 15,
							someProp: "Is this way",
						},
					]}
					values={values}
					getUpdater={getUpdater}
				/>,
				"to render as",
				<React.Fragment>
					<InputField
						key="thing"
						type="Something"
						update={expect.it("when called", "to equal", "thing")}
						value="foo"
						someProp={12.5}
					/>
					<Fieldset label="A field set">
						<FieldElements
							fields={[
								{
									type: "Whatever",
									name: "stuff",
								},
							]}
							values={values}
							getUpdater={getUpdater}
						/>
					</Fieldset>
					<Combination label="Combined fields" proportions={["300px", 100]}>
						<FieldElements
							fields={[
								{ type: "AnotherThing", name: "item" },
								{ type: "EvenMore", name: "otheritem" },
							]}
							values={values}
							getUpdater={getUpdater}
						/>
					</Combination>
					<FieldList
						name="list"
						values={values}
						getUpdater={getUpdater}
						rowCount={15}
						someProp="Is this way"
					/>
				</React.Fragment>,
			),
	);

	it("handles absent update function and values", () =>
		expect(
			<FieldElements
				fields={[
					{
						type: "Something",
						name: "thing",
					},
				]}
			/>,
			"to render as",
			<React.Fragment>
				<InputField update={undefined} value={undefined} />
			</React.Fragment>,
		));
});
