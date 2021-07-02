import React from "react";
import { TestWrapper } from "./../utils/testUtils";
import Immutable from "immutable";
import sinon from "sinon";
import { mount } from "enzyme";
import { useFullEntityEditState } from "./useFullEntityEditState";
import * as useDispatchWithModulesDataMock from "./useDispatchWithModulesData";
import { setFullEntityEditModel } from "../actions/view";

describe("useFullEntityEditState", () => {
	let store, state, useDispatchWithModulesDataSpy, useDispatchWithModulesDataStub;
	const moduleName = "thing";
	const sectionName = "mySection";
	const entityId = "entityId";

	const getFullEntityModelProperties = context => {
		return {
			section1: {
				field1_S1: {
					keys: ["field1_S1"],
					initialValue: "val1",
					newValue: "val1",
				},
				field2_S1: {
					keys: ["field2_S1"],
					initialValue: "old_custom",
					errorTypes: ["customRule"],
					newValue: context?.field2_S1_value ?? "not_custom",
				},
			},
			section2: {
				field1_S2: {
					keys: ["id_S2", "field1_S2"],
					initialValue: { a: 1, b: "F1_S2" },
					newValue: { a: 1, b: "F1_S2_MODIFIED" },
				},
				field2_S2: {
					keys: ["field2_S2"],
					initialValue: 5,
					newValue: 5,
				},
				field3_S2: {
					keys: ["field3_S2"],
					initialValue: "init",
					newValue: "new",
				},
			},
		};
	};

	const field2_S1_WithError = {
		value: "not_custom",
		wasModified: true,
		error: "customRule",
	};

	const field2_S1_WithDependencyError = {
		value: "custom",
		wasModified: true,
		error: "customRule",
	};

	const moduleStateAfterInit = {
		[entityId]: {
			section1: {
				model: {
					field1_S1: {
						value: "val1",
						wasModified: false,
					},
					field2_S1: {
						value: "not_custom",
						wasModified: true,
					},
				},
			},
			section2: {
				model: {
					id_S2: {
						field1_S2: {
							value: { a: 1, b: "F1_S2_MODIFIED" },
							wasModified: true,
						},
					},
					field2_S2: {
						value: 5,
						wasModified: false,
					},
					field3_S2: {
						value: "new",
						wasModified: true,
					},
				},
			},
		},
	};

	const validationRules = {
		customRule: (value, dependencies = { valid: true }) => value === "custom" && dependencies.valid,
	};

	beforeEach(() => {
		state = Immutable.fromJS({
			navigation: {
				route: { match: { path: `/:scope/${moduleName}/id/${sectionName}` } },
				config: { prependPath: "/:scope/", prependHref: "/scope/" },
			},
			view: {
				edit: {},
			},
		});

		useDispatchWithModulesDataSpy = sinon.spy();
		useDispatchWithModulesDataStub = sinon
			.stub(useDispatchWithModulesDataMock, "useDispatchWithModulesData")
			.returns(useDispatchWithModulesDataSpy);

		store = {
			subscribe: () => {},
			dispatch: () => sinon.spy(),
			getState: () => state,
		};
	});

	afterEach(() => {
		useDispatchWithModulesDataStub.restore();
	});

	const TestComp = ({ context, validationRules, dependencies }) => {
		const initialization = useFullEntityEditState(
			entityId,
			getFullEntityModelProperties,
			validationRules,
			dependencies,
		);

		return (
			<div>
				<div id="initialize" onClick={() => initialization(context)} />
			</div>
		);
	};

	it("Initialize properly the full entity edit state", () => {
		const component = (
			<TestWrapper provider={{ store }}>
				<TestComp />
			</TestWrapper>
		);

		const mountedComponent = mount(component);

		const fieldComponent = mountedComponent.find("#initialize");

		fieldComponent.invoke("onClick")();

		expect(useDispatchWithModulesDataSpy, "to have calls satisfying", [
			{
				args: [setFullEntityEditModel, [Immutable.fromJS(moduleStateAfterInit)]],
			},
		]);
	});

	it("Initialize properly the full entity edit state with validations", () => {
		const component = (
			<TestWrapper provider={{ store }}>
				<TestComp validationRules={validationRules} />
			</TestWrapper>
		);

		moduleStateAfterInit[entityId].section1.model.field2_S1 = field2_S1_WithError;

		const mountedComponent = mount(component);

		const fieldComponent = mountedComponent.find("#initialize");

		fieldComponent.invoke("onClick")();

		expect(useDispatchWithModulesDataSpy, "to have calls satisfying", [
			{
				args: [setFullEntityEditModel, [Immutable.fromJS(moduleStateAfterInit)]],
			},
		]);
	});

	it("Initialize properly the full entity edit state with validations and dependencies", () => {
		const component = (
			<TestWrapper provider={{ store }}>
				<TestComp
					context={{ field2_S1_value: "custom" }}
					validationRules={validationRules}
					dependencies={{ valid: false }}
				/>
			</TestWrapper>
		);

		moduleStateAfterInit[entityId].section1.model.field2_S1 = field2_S1_WithDependencyError;

		const mountedComponent = mount(component);

		const fieldComponent = mountedComponent.find("#initialize");

		fieldComponent.invoke("onClick")();

		expect(useDispatchWithModulesDataSpy, "to have calls satisfying", [
			{
				args: [setFullEntityEditModel, [Immutable.fromJS(moduleStateAfterInit)]],
			},
		]);
	});
});
