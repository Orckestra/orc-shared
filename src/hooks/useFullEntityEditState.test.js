import React from "react";
import { TestWrapper } from "./../utils/testUtils";
import Immutable from "immutable";
import sinon from "sinon";
import { mount } from "enzyme";
import { useFullEntityEditState } from "./useFullEntityEditState";

describe("useFullEntityEditState", () => {
	let store, state;
	const moduleName = "thing";
	const sectionName = "mySection";
	const entityId = "entityId";
	const initialFieldValue = "initialValue";
	const model = {
		value: "fieldValue",
	};
	// const buildContext = (context) => {
	//     //const
	// };

	beforeEach(() => {
		state = Immutable.fromJS({
			navigation: {
				route: { match: { path: `/:scope/${moduleName}/id/${sectionName}` } },
				config: { prependPath: "/:scope/", prependHref: "/scope/" },
			},
			view: {
				edit: {
					[moduleName]: {
						[entityId]: {
							[sectionName]: {
								field: {
									model,
								},
							},
						},
					},
				},
			},
		});

		store = {
			subscribe: () => {},
			dispatch: () => sinon.spy(),
			getState: () => state,
		};
	});

	const TestComp = ({ context }) => {
		const initialization = useFullEntityEditState(
			entityId,
			sectionName,
			{ customRule: (value, dependencies = { valid: true }) => value === "custom" && dependencies.valid },
			{ dependency1: 1, dependency2: "two" },
		);

		initialization(context);

		return (
			<div>
				{/*<div id="field">{field.state.value}</div>*/}
				{/*<div id="fieldWithUndefinedInitialValue">{fieldWithUndefinedInitialValue.state.value}</div>*/}
				{/*<div id="fieldWithUndefinedError">{fieldWithUndefinedInitialValue.state.error}</div>*/}
				{/*<div id="update" onClick={e => field.update(e.target.value)} />*/}
				{/*<div id="updateWithDefaultValidation" onClick={e => field.update(e.target.value)} />*/}
				{/*<div id="updateWithDependencies" onClick={e => field.update(e.target.value, { valid: false})} />*/}
				{/*<div id="updateWithCustomValidation" onClick={e => field.update(e.target.value)} />*/}
				{/*<div id="reset" onClick={field.reset} />*/}
				{/*<div id="isValid" onClick={field.isValid} />*/}
				{/*<div id="fieldWithoutValidation" onClick={e => fieldWithoutVaidationRules.update(e.target.value)} />*/}
			</div>
		);
	};

	it("Provides an access to initial value in edit view", () => {
		const component = (
			<TestWrapper provider={{ store }}>
				<TestComp />
			</TestWrapper>
		);

		const mountedComponent = mount(component);

		const fieldValue = mountedComponent.find("#field").prop("children");

		expect(fieldValue, "to equal", initialFieldValue);
	});
});
