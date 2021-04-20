import React from "react";
import { useEditState, useDynamicEditState } from "./useEditState";
import { TestWrapper } from "./../utils/testUtils";
import Immutable from "immutable";
import sinon from "sinon";
import { mount } from "enzyme";
import * as useDispatchWithModulesDataMock from "./useDispatchWithModulesData";
import {
	setEditModelField,
	setEditModelFieldError,
	removeEditModel,
	removeEditModelFieldError,
} from "./../actions/view";
import { validationErrorTypes } from "./../constants";

describe("useEditState", () => {
	let store, state;
	const moduleName = "thing";
	const sectionName = "mySection";
	const entityId = "entityId";
	const initialFieldValue = "initialValue";
	const model = {
		value: "fieldValue",
	};

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

	const TestComp = ({ saveInitialValueToEditState = false }) => {
		const createEditState = useEditState(entityId, sectionName, { customRule: value => value === "custom" });
		const field = createEditState(
			["field"],
			initialFieldValue,
			[validationErrorTypes.fieldIsRequired, "customRule"],
			saveInitialValueToEditState,
		);
		const fieldWithUndefinedInitialValue = createEditState(["anotherField"]);

		const createEditStateWithoutCustomRules = useEditState(entityId, sectionName);
		const fieldWithoutVaidationRules = createEditStateWithoutCustomRules(["field"], initialFieldValue);

		return (
			<div>
				<div id="field">{field.state.value}</div>
				<div id="fieldWithUndefinedInitialValue">{fieldWithUndefinedInitialValue.state.value}</div>
				<div id="update" onClick={e => field.update(e.target.value)} />
				<div id="updateWithDefaultValidation" onClick={e => field.update(e.target.value)} />
				<div id="updateWithCustomValidation" onClick={e => field.update(e.target.value)} />
				<div id="reset" onClick={field.reset} />
				<div id="isValid" onClick={field.isValid} />
				<div id="fieldWithoutValidation" onClick={e => fieldWithoutVaidationRules.update(e.target.value)} />
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

	it("Provides an access to actual value in edit view", () => {
		store.getState = () => state.setIn(["view", "edit", moduleName, entityId, sectionName, "model", "field"], model);

		const component = (
			<TestWrapper provider={{ store }}>
				<TestComp />
			</TestWrapper>
		);

		const mountedComponent = mount(component);

		const fieldValue = mountedComponent.find("#field").prop("children");

		expect(fieldValue, "to equal", model.value);
	});

	it("Sets initial value to empty string as default value", () => {
		const component = (
			<TestWrapper provider={{ store }}>
				<TestComp />
			</TestWrapper>
		);

		const mountedComponent = mount(component);

		const fieldValue = mountedComponent.find("#fieldWithUndefinedInitialValue").prop("children");

		expect(fieldValue, "to equal", "");
	});

	it("Not saves initial value to edit state if saveInitialValueToEditState is false", () => {
		const component = (
			<TestWrapper provider={{ store }}>
				<TestComp />
			</TestWrapper>
		);

		const useDispatchWithModulesDataSpy = sinon.spy();
		const useDispatchWithModulesDataStub = sinon
			.stub(useDispatchWithModulesDataMock, "useDispatchWithModulesData")
			.returns(useDispatchWithModulesDataSpy);

		mount(component);

		expect(useDispatchWithModulesDataSpy, "not to have calls satisfying", {
			args: [setEditModelField, [["field"], initialFieldValue, initialFieldValue, entityId, sectionName]],
		});

		useDispatchWithModulesDataStub.restore();
	});

	it("Saves initial value to edit state if saveInitialValueToEditState is false", () => {
		const component = (
			<TestWrapper provider={{ store }}>
				<TestComp saveInitialValueToEditState />
			</TestWrapper>
		);

		const useDispatchWithModulesDataSpy = sinon.spy();
		const useDispatchWithModulesDataStub = sinon
			.stub(useDispatchWithModulesDataMock, "useDispatchWithModulesData")
			.returns(useDispatchWithModulesDataSpy);

		mount(component);

		expect(useDispatchWithModulesDataSpy, "to have a call satisfying", {
			args: [setEditModelField, [["field"], initialFieldValue, initialFieldValue, entityId, sectionName]],
		});

		useDispatchWithModulesDataStub.restore();
	});

	it("Updates edit view value correctly without validation", () => {
		const component = (
			<TestWrapper provider={{ store }}>
				<TestComp />
			</TestWrapper>
		);

		const useDispatchWithModulesDataSpy = sinon.spy();
		const useDispatchWithModulesDataStub = sinon
			.stub(useDispatchWithModulesDataMock, "useDispatchWithModulesData")
			.returns(useDispatchWithModulesDataSpy);

		const mountedComponent = mount(component);

		const fieldComponent = mountedComponent.find("#update");

		const event = {
			target: {
				value: "newValue",
			},
		};

		fieldComponent.invoke("onClick")(event);

		expect(useDispatchWithModulesDataSpy, "to have a call satisfying", {
			args: [setEditModelField, [["field"], "newValue", initialFieldValue, entityId, sectionName]],
		});

		useDispatchWithModulesDataStub.restore();
	});

	it("Updates edit view value correctly with default validation rules when validation was passed", () => {
		const component = (
			<TestWrapper provider={{ store }}>
				<TestComp />
			</TestWrapper>
		);

		const useDispatchWithModulesDataSpy = sinon.spy();
		const useDispatchWithModulesDataStub = sinon
			.stub(useDispatchWithModulesDataMock, "useDispatchWithModulesData")
			.returns(useDispatchWithModulesDataSpy);

		const mountedComponent = mount(component);

		const fieldComponent = mountedComponent.find("#updateWithDefaultValidation");

		const event = {
			target: {
				value: "newValue",
			},
		};

		fieldComponent.invoke("onClick")(event);

		expect(useDispatchWithModulesDataSpy, "to have a call satisfying", {
			args: [setEditModelField, [["field"], "newValue", initialFieldValue, entityId, sectionName]],
		});

		expect(useDispatchWithModulesDataSpy, "to have no calls satisfying", {
			args: [setEditModelFieldError, [["field"], validationErrorTypes.fieldIsRequired, entityId, sectionName]],
		});

		useDispatchWithModulesDataStub.restore();
	});

	it("Updates edit view value correctly when no validation rules are set", () => {
		const component = (
			<TestWrapper provider={{ store }}>
				<TestComp />
			</TestWrapper>
		);

		const useDispatchWithModulesDataSpy = sinon.spy();
		const useDispatchWithModulesDataStub = sinon
			.stub(useDispatchWithModulesDataMock, "useDispatchWithModulesData")
			.returns(useDispatchWithModulesDataSpy);

		const mountedComponent = mount(component);

		const fieldComponent = mountedComponent.find("#fieldWithoutValidation");

		const event = {
			target: {
				value: "newValue",
			},
		};

		fieldComponent.invoke("onClick")(event);

		expect(useDispatchWithModulesDataSpy, "to have a call satisfying", {
			args: [setEditModelField, [["field"], "newValue", initialFieldValue, entityId, sectionName]],
		});

		expect(useDispatchWithModulesDataSpy, "to have no calls satisfying", {
			args: [setEditModelFieldError, [["field"], validationErrorTypes.fieldIsRequired, entityId, sectionName]],
		});

		useDispatchWithModulesDataStub.restore();
	});

	it("Updates edit view value correctly with default validation rules when validation was not passed", () => {
		const component = (
			<TestWrapper provider={{ store }}>
				<TestComp />
			</TestWrapper>
		);

		const useDispatchWithModulesDataSpy = sinon.spy();
		const useDispatchWithModulesDataStub = sinon
			.stub(useDispatchWithModulesDataMock, "useDispatchWithModulesData")
			.returns(useDispatchWithModulesDataSpy);

		const mountedComponent = mount(component);

		const fieldComponent = mountedComponent.find("#updateWithDefaultValidation");

		const event = {
			target: {
				value: "",
			},
		};

		fieldComponent.invoke("onClick")(event);

		expect(useDispatchWithModulesDataSpy, "to have a call satisfying", {
			args: [setEditModelField, [["field"], "", initialFieldValue, entityId, sectionName]],
		});

		expect(useDispatchWithModulesDataSpy, "to have a call satisfying", {
			args: [setEditModelFieldError, [["field"], validationErrorTypes.fieldIsRequired, entityId, sectionName]],
		});

		useDispatchWithModulesDataStub.restore();
	});

	it("Updates edit view value correctly with custom validation rules when validation was passed", () => {
		const component = (
			<TestWrapper provider={{ store }}>
				<TestComp />
			</TestWrapper>
		);

		const useDispatchWithModulesDataSpy = sinon.spy();
		const useDispatchWithModulesDataStub = sinon
			.stub(useDispatchWithModulesDataMock, "useDispatchWithModulesData")
			.returns(useDispatchWithModulesDataSpy);

		const mountedComponent = mount(component);

		const fieldComponent = mountedComponent.find("#updateWithCustomValidation");

		const event = {
			target: {
				value: "custom",
			},
		};

		fieldComponent.invoke("onClick")(event);

		expect(useDispatchWithModulesDataSpy, "to have a call satisfying", {
			args: [setEditModelField, [["field"], "custom", initialFieldValue, entityId, sectionName]],
		});

		expect(useDispatchWithModulesDataSpy, "to have no calls satisfying", {
			args: [setEditModelFieldError, [["field"], "customRule", entityId, sectionName]],
		});

		useDispatchWithModulesDataStub.restore();
	});

	it("Updates edit view value correctly with custom validation rules when validation was not passed", () => {
		const component = (
			<TestWrapper provider={{ store }}>
				<TestComp />
			</TestWrapper>
		);

		const useDispatchWithModulesDataSpy = sinon.spy();
		const useDispatchWithModulesDataStub = sinon
			.stub(useDispatchWithModulesDataMock, "useDispatchWithModulesData")
			.returns(useDispatchWithModulesDataSpy);

		const mountedComponent = mount(component);

		const fieldComponent = mountedComponent.find("#updateWithCustomValidation");

		const event = {
			target: {
				value: "anotherValue",
			},
		};

		fieldComponent.invoke("onClick")(event);

		expect(useDispatchWithModulesDataSpy, "to have a call satisfying", {
			args: [setEditModelField, [["field"], "anotherValue", initialFieldValue, entityId, sectionName]],
		});

		expect(useDispatchWithModulesDataSpy, "to have a call satisfying", {
			args: [setEditModelFieldError, [["field"], "customRule", entityId, sectionName]],
		});

		useDispatchWithModulesDataStub.restore();
	});

	it("Resets correctly edit view field to the initial value", () => {
		const component = (
			<TestWrapper provider={{ store }}>
				<TestComp />
			</TestWrapper>
		);

		const useDispatchWithModulesDataSpy = sinon.spy();
		const useDispatchWithModulesDataStub = sinon
			.stub(useDispatchWithModulesDataMock, "useDispatchWithModulesData")
			.returns(useDispatchWithModulesDataSpy);

		const mountedComponent = mount(component);

		const fieldComponent = mountedComponent.find("#reset");

		fieldComponent.invoke("onClick")();

		expect(useDispatchWithModulesDataSpy, "to have a call satisfying", {
			args: [setEditModelField, [["field"], initialFieldValue, initialFieldValue, entityId, sectionName]],
		});

		useDispatchWithModulesDataStub.restore();
	});

	it("Validates edit state value correctly", () => {
		const component = (
			<TestWrapper provider={{ store }}>
				<TestComp />
			</TestWrapper>
		);

		const useDispatchWithModulesDataSpy = sinon.spy();
		const useDispatchWithModulesDataStub = sinon
			.stub(useDispatchWithModulesDataMock, "useDispatchWithModulesData")
			.returns(useDispatchWithModulesDataSpy);

		const mountedComponent = mount(component);

		const fieldComponent = mountedComponent.find("#isValid");

		fieldComponent.invoke("onClick")();

		expect(useDispatchWithModulesDataSpy, "to have a call satisfying", {
			args: [setEditModelFieldError, [["field"], "customRule", entityId, sectionName]],
		});

		useDispatchWithModulesDataStub.restore();
	});
});

describe("useDynamicEditState", () => {
	let store, state, stateWithModifications, storeWithModifications;
	const moduleName = "thing";
	const sectionName = "mySection";
	const entityId = "entityId";
	const initialFieldValue = {
		a: "initial",
		b: "value",
		c: {
			d: "dynamic",
			e: "object",
		},
	};
	const model = {
		value: {
			a: "model",
			b: "value",
			c: {
				d: "dynamic",
				e: "object",
			},
		},
	};

	const modelWithModifications = {
		a: "model",
		b: ["a", "b", "c"],
		c: {
			value: {
				d: {
					value: "dynamic",
					wasModified: true,
					error: "this is error",
				},
				e: "object",
				n: [
					{
						nProp: "test",
					},
				],
			},
			wasModified: true,
		},
	};

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
								model,
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

		stateWithModifications = Immutable.fromJS({
			navigation: {
				route: { match: { path: `/:scope/${moduleName}/id/${sectionName}` } },
				config: { prependPath: "/:scope/", prependHref: "/scope/" },
			},
			view: {
				edit: {
					[moduleName]: {
						[entityId]: {
							[sectionName]: {
								value: modelWithModifications,
							},
						},
					},
				},
			},
		});

		storeWithModifications = {
			subscribe: () => {},
			dispatch: () => sinon.spy(),
			getState: () => stateWithModifications,
		};
	});

	const TestComp = ({ saveInitialValueToEditState = false }) => {
		const createDynamicEditState = useDynamicEditState(entityId, sectionName, {
			customRule: value => value === "custom",
		});
		const field = createDynamicEditState(["field"], initialFieldValue, saveInitialValueToEditState);
		const fieldWithUndefinedInitialValue = createDynamicEditState(["anotherField"]);
		const fieldInStore = createDynamicEditState(["field"], model, true);
		const fieldWithModifications = createDynamicEditState(["field"], modelWithModifications, true);

		const createDynamicEditStateWithoutCustomRules = useDynamicEditState(entityId, sectionName);
		const fieldWithoutVaidationRules = createDynamicEditStateWithoutCustomRules(
			["fieldWithoutValidationRules"],
			initialFieldValue,
		);

		const createDynamicEditStateWithDependencies = useDynamicEditState(entityId, sectionName, {
			customRule: (value, dependencies) => value !== dependencies.value,
		});
		const fieldWithCustomRules = createDynamicEditStateWithDependencies(["field"], modelWithModifications, true);

		return (
			<div>
				<div id="field" val={field.getState()} />
				<div id="fieldWithPath" val={field.getState(["c", "d"])} />
				<div id="fieldInStore" val={fieldInStore.getState()} />
				<div id="fieldWithUndefinedInitialValue" val={fieldWithUndefinedInitialValue.getState()} />
				<div id="update" onClick={e => field.update(e.target.value, ["c", "d"])} />
				<div id="fieldWithPathWithModifications" val={fieldWithModifications.getState(["c", "d"])} />
				<div id="updateWithModifications" onClick={e => fieldWithModifications.update(e.target.value, ["c", "d"])} />
				<div id="updateWithDefaultPath" onClick={e => field.update(e.target.value)} />
				<div
					id="updateWithDefaultValidation"
					onClick={e => field.update(e.target.value, ["c", "d"], [validationErrorTypes.fieldIsRequired])}
				/>
				<div
					id="updateWithCustomValidation"
					onClick={e => field.update(e.target.value, ["c", "d"], [validationErrorTypes.fieldIsRequired, "customRule"])}
				/>
				<div id="reset" onClick={() => field.reset(["c", "d"])} />
				<div id="resetWithDefaultPath" onClick={field.reset} />
				<div id="isValid" onClick={e => field.isValid(e.target.value, ["c", "d"], ["customRule"])} />
				<div id="isValidWithDefaultPath" onClick={field.isValid} />
				<div
					id="fieldWithoutValidationRules"
					onClick={e =>
						fieldWithoutVaidationRules.update(e.target.value, ["c", "d"], validationErrorTypes.fieldIsRequired)
					}
				/>
				<div id="getError" val={fieldWithModifications.getError(["c", "d"])} />
				<div id="getErrorWithoutPath" val={fieldWithModifications.getError()} />
				<div
					id="updateWithCustomValidationAndDependencies"
					onClick={e => fieldWithCustomRules.update(e.target.value, ["c", "d"], ["customRule"], { value: "Test" })}
				/>
				<div
					id="isValidWhenValueNotObject"
					onClick={e => fieldWithCustomRules.isValid(e.target.value, ["c", "e"], ["customRule"], { value: "Test" })}
				/>
				<div
					id="isValidWhenValueIsArray"
					onClick={e => fieldWithCustomRules.isValid(null, ["b"], ["customRule"], { value: "Test" })}
				/>
				<div
					id="isValidWhenValueIsObject"
					onClick={e => fieldWithCustomRules.isValid(null, ["c", "d"], ["customRule"], { value: "Test" })}
				/>
				<div id="deleteElementByPath" onClick={e => fieldWithCustomRules.delete(["c", "e"])} />
				<div id="deleteElementByPathWhenObject" onClick={e => fieldWithCustomRules.delete(["c", "d"])} />
				<div id="deleteElementByPathWhenArray" onClick={e => fieldWithCustomRules.delete(["c", "n"])} />
				<div id="deleteElementWithNoPath" onClick={e => fieldWithCustomRules.delete()} />
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

		const fieldValue = mountedComponent.find("#field").prop("val");

		expect(fieldValue, "to equal", initialFieldValue);
	});

	it("Provides an access to value in edit view if has modifications", () => {
		const component = (
			<TestWrapper provider={{ store: storeWithModifications }}>
				<TestComp />
			</TestWrapper>
		);

		const mountedComponent = mount(component);

		const fieldValue = mountedComponent.find("#fieldWithPathWithModifications").prop("val");

		expect(fieldValue, "to equal", "dynamic");
	});

	it("Provides an access to field by path in edit view", () => {
		const component = (
			<TestWrapper provider={{ store }}>
				<TestComp />
			</TestWrapper>
		);

		const mountedComponent = mount(component);

		const fieldValue = mountedComponent.find("#fieldWithPath").prop("val");

		expect(fieldValue, "to equal", "dynamic");
	});

	it("Provides an access to actual value in edit view", () => {
		const component = (
			<TestWrapper provider={{ store }}>
				<TestComp />
			</TestWrapper>
		);

		const mountedComponent = mount(component);

		const fieldValue = mountedComponent.find("#fieldInStore").prop("val");

		expect(fieldValue, "to equal", model);
	});

	it("Sets initial value to empty string as default value", () => {
		const component = (
			<TestWrapper provider={{ store }}>
				<TestComp />
			</TestWrapper>
		);

		const mountedComponent = mount(component);

		const fieldValue = mountedComponent.find("#fieldWithUndefinedInitialValue").prop("val");

		expect(fieldValue, "to equal", "");
	});

	it("Not saves initial value to edit state if saveInitialValueToEditState is false", () => {
		const component = (
			<TestWrapper provider={{ store }}>
				<TestComp />
			</TestWrapper>
		);

		const useDispatchWithModulesDataSpy = sinon.spy();
		const useDispatchWithModulesDataStub = sinon
			.stub(useDispatchWithModulesDataMock, "useDispatchWithModulesData")
			.returns(useDispatchWithModulesDataSpy);

		mount(component);

		expect(useDispatchWithModulesDataSpy, "not to have calls satisfying", {
			args: [setEditModelField, [["field"], initialFieldValue, initialFieldValue, entityId, sectionName]],
		});

		useDispatchWithModulesDataStub.restore();
	});

	it("Saves initial value to edit state if saveInitialValueToEditState is true", () => {
		const component = (
			<TestWrapper provider={{ store }}>
				<TestComp saveInitialValueToEditState />
			</TestWrapper>
		);

		const useDispatchWithModulesDataSpy = sinon.spy();
		const useDispatchWithModulesDataStub = sinon
			.stub(useDispatchWithModulesDataMock, "useDispatchWithModulesData")
			.returns(useDispatchWithModulesDataSpy);

		mount(component);

		expect(useDispatchWithModulesDataSpy, "to have a call satisfying", {
			args: [setEditModelField, [["field"], initialFieldValue, initialFieldValue, entityId, sectionName]],
		});

		useDispatchWithModulesDataStub.restore();
	});

	it("Updates edit view value correctly without validation", () => {
		const component = (
			<TestWrapper provider={{ store }}>
				<TestComp />
			</TestWrapper>
		);

		const useDispatchWithModulesDataSpy = sinon.spy();
		const useDispatchWithModulesDataStub = sinon
			.stub(useDispatchWithModulesDataMock, "useDispatchWithModulesData")
			.returns(useDispatchWithModulesDataSpy);

		const mountedComponent = mount(component);

		const fieldComponent = mountedComponent.find("#update");

		const event = {
			target: {
				value: "newValue",
			},
		};

		fieldComponent.invoke("onClick")(event);

		expect(useDispatchWithModulesDataSpy, "to have a call satisfying", {
			args: [
				setEditModelField,
				[["field", "value", "c", "d"], "newValue", initialFieldValue.c.d, entityId, sectionName],
			],
		});

		useDispatchWithModulesDataStub.restore();
	});

	it("Updates edit view value correctly without validation if has modifications", () => {
		const component = (
			<TestWrapper provider={{ store: storeWithModifications }}>
				<TestComp />
			</TestWrapper>
		);

		const useDispatchWithModulesDataSpy = sinon.spy();
		const useDispatchWithModulesDataStub = sinon
			.stub(useDispatchWithModulesDataMock, "useDispatchWithModulesData")
			.returns(useDispatchWithModulesDataSpy);

		const mountedComponent = mount(component);

		const fieldComponent = mountedComponent.find("#updateWithModifications");

		const event = {
			target: {
				value: "newValue",
			},
		};

		fieldComponent.invoke("onClick")(event);

		expect(useDispatchWithModulesDataSpy, "to have a call satisfying", {
			args: [
				setEditModelField,
				[["field", "value", "c", "value", "d"], "newValue", modelWithModifications.c.value.d, entityId, sectionName],
			],
		});

		useDispatchWithModulesDataStub.restore();
	});

	it("Updates edit view value correctly when no path was passed", () => {
		const component = (
			<TestWrapper provider={{ store }}>
				<TestComp />
			</TestWrapper>
		);

		const useDispatchWithModulesDataSpy = sinon.spy();
		const useDispatchWithModulesDataStub = sinon
			.stub(useDispatchWithModulesDataMock, "useDispatchWithModulesData")
			.returns(useDispatchWithModulesDataSpy);

		const mountedComponent = mount(component);

		const fieldComponent = mountedComponent.find("#updateWithDefaultPath");

		const event = {
			target: {
				value: "newValue",
			},
		};

		fieldComponent.invoke("onClick")(event);

		expect(useDispatchWithModulesDataSpy, "to have a call satisfying", {
			args: [setEditModelField, [["field"], "newValue", initialFieldValue, entityId, sectionName]],
		});

		useDispatchWithModulesDataStub.restore();
	});

	it("Updates edit view value correctly with default validation rules when validation was passed", () => {
		const component = (
			<TestWrapper provider={{ store }}>
				<TestComp />
			</TestWrapper>
		);

		const useDispatchWithModulesDataSpy = sinon.spy();
		const useDispatchWithModulesDataStub = sinon
			.stub(useDispatchWithModulesDataMock, "useDispatchWithModulesData")
			.returns(useDispatchWithModulesDataSpy);

		const mountedComponent = mount(component);

		const fieldComponent = mountedComponent.find("#updateWithDefaultValidation");

		const event = {
			target: {
				value: "newValue",
			},
		};

		fieldComponent.invoke("onClick")(event);

		expect(useDispatchWithModulesDataSpy, "to have a call satisfying", {
			args: [
				setEditModelField,
				[["field", "value", "c", "d"], "newValue", initialFieldValue.c.d, entityId, sectionName],
			],
		});

		expect(useDispatchWithModulesDataSpy, "to have no calls satisfying", {
			args: [
				setEditModelFieldError,
				[["field", "value", "c", "d"], validationErrorTypes.fieldIsRequired, entityId, sectionName],
			],
		});

		useDispatchWithModulesDataStub.restore();
	});

	it("Updates edit view value correctly with default validation rules when validation was not passed", () => {
		const component = (
			<TestWrapper provider={{ store }}>
				<TestComp />
			</TestWrapper>
		);

		const useDispatchWithModulesDataSpy = sinon.spy();
		const useDispatchWithModulesDataStub = sinon
			.stub(useDispatchWithModulesDataMock, "useDispatchWithModulesData")
			.returns(useDispatchWithModulesDataSpy);

		const mountedComponent = mount(component);

		const fieldComponent = mountedComponent.find("#updateWithDefaultValidation");

		const event = {
			target: {
				value: "",
			},
		};

		fieldComponent.invoke("onClick")(event);

		expect(useDispatchWithModulesDataSpy, "to have a call satisfying", {
			args: [setEditModelField, [["field", "value", "c", "d"], "", initialFieldValue.c.d, entityId, sectionName]],
		});

		expect(useDispatchWithModulesDataSpy, "to have a call satisfying", {
			args: [
				setEditModelFieldError,
				[["field", "value", "c", "d"], validationErrorTypes.fieldIsRequired, entityId, sectionName],
			],
		});

		useDispatchWithModulesDataStub.restore();
	});

	it("Updates edit view value correctly with custom validation rules when validation was passed", () => {
		const component = (
			<TestWrapper provider={{ store }}>
				<TestComp />
			</TestWrapper>
		);

		const useDispatchWithModulesDataSpy = sinon.spy();
		const useDispatchWithModulesDataStub = sinon
			.stub(useDispatchWithModulesDataMock, "useDispatchWithModulesData")
			.returns(useDispatchWithModulesDataSpy);

		const mountedComponent = mount(component);

		const fieldComponent = mountedComponent.find("#updateWithCustomValidation");

		const event = {
			target: {
				value: "custom",
			},
		};

		fieldComponent.invoke("onClick")(event);

		expect(useDispatchWithModulesDataSpy, "to have a call satisfying", {
			args: [setEditModelField, [["field", "value", "c", "d"], "custom", initialFieldValue.c.d, entityId, sectionName]],
		});

		expect(useDispatchWithModulesDataSpy, "to have no calls satisfying", {
			args: [setEditModelFieldError, [["field", "value", "c", "d"], "customRule", entityId, sectionName]],
		});

		useDispatchWithModulesDataStub.restore();
	});

	it("Updates edit view value correctly with custom validation rules when validation was not passed", () => {
		const component = (
			<TestWrapper provider={{ store }}>
				<TestComp />
			</TestWrapper>
		);

		const useDispatchWithModulesDataSpy = sinon.spy();
		const useDispatchWithModulesDataStub = sinon
			.stub(useDispatchWithModulesDataMock, "useDispatchWithModulesData")
			.returns(useDispatchWithModulesDataSpy);

		const mountedComponent = mount(component);

		const fieldComponent = mountedComponent.find("#updateWithCustomValidation");

		const event = {
			target: {
				value: "anotherValue",
			},
		};

		fieldComponent.invoke("onClick")(event);

		expect(useDispatchWithModulesDataSpy, "to have a call satisfying", {
			args: [
				setEditModelField,
				[["field", "value", "c", "d"], "anotherValue", initialFieldValue.c.d, entityId, sectionName],
			],
		});

		expect(useDispatchWithModulesDataSpy, "to have a call satisfying", {
			args: [setEditModelFieldError, [["field", "value", "c", "d"], "customRule", entityId, sectionName]],
		});

		useDispatchWithModulesDataStub.restore();
	});

	it("Resets correctly edit view field to the initial value", () => {
		const component = (
			<TestWrapper provider={{ store }}>
				<TestComp />
			</TestWrapper>
		);

		const useDispatchWithModulesDataSpy = sinon.spy();
		const useDispatchWithModulesDataStub = sinon
			.stub(useDispatchWithModulesDataMock, "useDispatchWithModulesData")
			.returns(useDispatchWithModulesDataSpy);

		const mountedComponent = mount(component);

		const fieldComponent = mountedComponent.find("#reset");

		fieldComponent.invoke("onClick")();

		expect(useDispatchWithModulesDataSpy, "to have a call satisfying", {
			args: [
				setEditModelField,
				[["field", "value", "c", "d"], initialFieldValue, initialFieldValue, entityId, sectionName],
			],
		});

		useDispatchWithModulesDataStub.restore();
	});

	it("Resets correctly edit view field to the initial value when no path passed", () => {
		const component = (
			<TestWrapper provider={{ store }}>
				<TestComp />
			</TestWrapper>
		);

		const useDispatchWithModulesDataSpy = sinon.spy();
		const useDispatchWithModulesDataStub = sinon
			.stub(useDispatchWithModulesDataMock, "useDispatchWithModulesData")
			.returns(useDispatchWithModulesDataSpy);

		const mountedComponent = mount(component);

		const fieldComponent = mountedComponent.find("#resetWithDefaultPath");

		fieldComponent.invoke("onClick")();

		expect(useDispatchWithModulesDataSpy, "to have a call satisfying", {
			args: [setEditModelField, [["field"], initialFieldValue, initialFieldValue, entityId, sectionName]],
		});

		useDispatchWithModulesDataStub.restore();
	});

	it("Validates edit state value correctly", () => {
		const component = (
			<TestWrapper provider={{ store }}>
				<TestComp />
			</TestWrapper>
		);

		const useDispatchWithModulesDataSpy = sinon.spy();
		const useDispatchWithModulesDataStub = sinon
			.stub(useDispatchWithModulesDataMock, "useDispatchWithModulesData")
			.returns(useDispatchWithModulesDataSpy);

		const mountedComponent = mount(component);

		const fieldComponent = mountedComponent.find("#isValid");

		const event = {
			target: {
				value: "anotherValue",
			},
		};
		fieldComponent.invoke("onClick")(event);

		expect(useDispatchWithModulesDataSpy, "to have a call satisfying", {
			args: [setEditModelFieldError, [["field", "value", "c", "d"], "customRule", entityId, sectionName]],
		});

		useDispatchWithModulesDataStub.restore();
	});

	it("Validates edit state value correctly when no path passed", () => {
		const component = (
			<TestWrapper provider={{ store }}>
				<TestComp />
			</TestWrapper>
		);

		const useDispatchWithModulesDataSpy = sinon.spy();
		const useDispatchWithModulesDataStub = sinon
			.stub(useDispatchWithModulesDataMock, "useDispatchWithModulesData")
			.returns(useDispatchWithModulesDataSpy);

		const mountedComponent = mount(component);

		const fieldComponent = mountedComponent.find("#isValidWithDefaultPath");

		fieldComponent.invoke("onClick")();

		expect(useDispatchWithModulesDataSpy, "to have no calls satisfying", {
			args: [setEditModelFieldError, [["field"], "customRule", entityId, sectionName]],
		});

		useDispatchWithModulesDataStub.restore();
	});

	it("Gets error by path", () => {
		const component = (
			<TestWrapper provider={{ store: storeWithModifications }}>
				<TestComp />
			</TestWrapper>
		);

		const mountedComponent = mount(component);

		const fieldValue = mountedComponent.find("#getError").prop("val");

		expect(fieldValue, "to equal", "this is error");
	});

	it("Gets error without path", () => {
		const component = (
			<TestWrapper provider={{ store: storeWithModifications }}>
				<TestComp />
			</TestWrapper>
		);

		const mountedComponent = mount(component);

		const fieldValue = mountedComponent.find("#getErrorWithoutPath").prop("val");

		expect(fieldValue, "to equal", undefined);
	});

	it("Updates edit view value correctly with custom validation rules and dependencies when validation was passed", () => {
		const component = (
			<TestWrapper provider={{ store: storeWithModifications }}>
				<TestComp />
			</TestWrapper>
		);

		const useDispatchWithModulesDataSpy = sinon.spy();
		const useDispatchWithModulesDataStub = sinon
			.stub(useDispatchWithModulesDataMock, "useDispatchWithModulesData")
			.returns(useDispatchWithModulesDataSpy);

		const mountedComponent = mount(component);

		const fieldComponent = mountedComponent.find("#updateWithCustomValidationAndDependencies");

		const event = {
			target: {
				value: "valid",
			},
		};

		fieldComponent.invoke("onClick")(event);

		expect(useDispatchWithModulesDataSpy, "to have a call satisfying", {
			args: [
				setEditModelField,
				[["field", "value", "c", "value", "d"], "valid", modelWithModifications.c.value.d, entityId, sectionName],
			],
		});

		expect(useDispatchWithModulesDataSpy, "to have no calls satisfying", {
			args: [setEditModelFieldError, [["field", "value", "c", "value", "d"], "customRule", entityId, sectionName]],
		});

		useDispatchWithModulesDataStub.restore();
	});

	it("Updates edit view value correctly with custom validation rules and dependencies when validation was not passed", () => {
		const component = (
			<TestWrapper provider={{ store: storeWithModifications }}>
				<TestComp />
			</TestWrapper>
		);

		const useDispatchWithModulesDataSpy = sinon.spy();
		const useDispatchWithModulesDataStub = sinon
			.stub(useDispatchWithModulesDataMock, "useDispatchWithModulesData")
			.returns(useDispatchWithModulesDataSpy);

		const mountedComponent = mount(component);

		const fieldComponent = mountedComponent.find("#updateWithCustomValidationAndDependencies");

		const event = {
			target: {
				value: "Test",
			},
		};

		fieldComponent.invoke("onClick")(event);

		expect(useDispatchWithModulesDataSpy, "to have a call satisfying", {
			args: [
				setEditModelField,
				[["field", "value", "c", "value", "d"], "Test", modelWithModifications.c.value.d, entityId, sectionName],
			],
		});

		expect(useDispatchWithModulesDataSpy, "to have a call satisfying", {
			args: [setEditModelFieldError, [["field", "value", "c", "value", "d"], "customRule", entityId, sectionName]],
		});

		useDispatchWithModulesDataStub.restore();
	});

	it("Validates edit state value correctly when it is not an object", () => {
		const component = (
			<TestWrapper provider={{ store: storeWithModifications }}>
				<TestComp />
			</TestWrapper>
		);

		const useDispatchWithModulesDataSpy = sinon.spy();
		const useDispatchWithModulesDataStub = sinon
			.stub(useDispatchWithModulesDataMock, "useDispatchWithModulesData")
			.returns(useDispatchWithModulesDataSpy);

		const mountedComponent = mount(component);

		const fieldComponent = mountedComponent.find("#isValidWhenValueNotObject");

		const event = {
			target: {
				value: "Test",
			},
		};
		fieldComponent.invoke("onClick")(event);

		expect(useDispatchWithModulesDataSpy, "to have a call satisfying", {
			args: [setEditModelField, [["field", "value", "c", "value", "e"], "Test", "Test", entityId, sectionName]],
		});

		expect(useDispatchWithModulesDataSpy, "to have a call satisfying", {
			args: [setEditModelFieldError, [["field", "value", "c", "value", "e"], "customRule", entityId, sectionName]],
		});

		useDispatchWithModulesDataStub.restore();
	});

	it("Validates edit state value correctly when it is an array", () => {
		const component = (
			<TestWrapper provider={{ store: storeWithModifications }}>
				<TestComp />
			</TestWrapper>
		);

		const useDispatchWithModulesDataSpy = sinon.spy();
		const useDispatchWithModulesDataStub = sinon
			.stub(useDispatchWithModulesDataMock, "useDispatchWithModulesData")
			.returns(useDispatchWithModulesDataSpy);

		const mountedComponent = mount(component);

		const fieldComponent = mountedComponent.find("#isValidWhenValueIsArray");

		fieldComponent.invoke("onClick")();

		expect(useDispatchWithModulesDataSpy, "to have a call satisfying", {
			args: [setEditModelField, [["field", "value", "b"], ["a", "b", "c"], ["a", "b", "c"], entityId, sectionName]],
		});

		expect(useDispatchWithModulesDataSpy, "to have no calls satisfying", {
			args: [setEditModelFieldError, [["field", "value", "b"], "customRule", entityId, sectionName]],
		});

		useDispatchWithModulesDataStub.restore();
	});

	it("Validates edit state value correctly when it is an object and reset error", () => {
		const component = (
			<TestWrapper provider={{ store: storeWithModifications }}>
				<TestComp />
			</TestWrapper>
		);

		const useDispatchWithModulesDataSpy = sinon.spy();
		const useDispatchWithModulesDataStub = sinon
			.stub(useDispatchWithModulesDataMock, "useDispatchWithModulesData")
			.returns(useDispatchWithModulesDataSpy);

		const mountedComponent = mount(component);

		const fieldComponent = mountedComponent.find("#isValidWhenValueIsObject");

		fieldComponent.invoke("onClick")();

		expect(useDispatchWithModulesDataSpy, "to have no calls satisfying", {
			args: [setEditModelField, [["field", "value", "c", "value", "d"], "dynamic", "dynamic", entityId, sectionName]],
		});

		expect(useDispatchWithModulesDataSpy, "to have no calls satisfying", {
			args: [setEditModelFieldError, [["field", "value", "c", "value", "d"], "customRule", entityId, sectionName]],
		});

		expect(useDispatchWithModulesDataSpy, "to have a call satisfying", {
			args: [removeEditModelFieldError, [["field", "value", "c", "value", "d"], entityId, sectionName]],
		});

		useDispatchWithModulesDataStub.restore();
	});

	it("Delete value in edit view by path when value is object", () => {
		const component = (
			<TestWrapper provider={{ store: storeWithModifications }}>
				<TestComp />
			</TestWrapper>
		);

		const useDispatchWithModulesDataSpy = sinon.spy();
		const useDispatchWithModulesDataStub = sinon
			.stub(useDispatchWithModulesDataMock, "useDispatchWithModulesData")
			.returns(useDispatchWithModulesDataSpy);

		const mountedComponent = mount(component);

		const fieldComponent = mountedComponent.find("#deleteElementByPathWhenObject");

		fieldComponent.invoke("onClick")();

		expect(useDispatchWithModulesDataSpy, "to have a call satisfying", {
			args: [removeEditModel, [["field", "value", "c", "value", "d"], entityId, sectionName]],
		});

		useDispatchWithModulesDataStub.restore();
	});

	it("Delete value in edit view by path", () => {
		const component = (
			<TestWrapper provider={{ store: storeWithModifications }}>
				<TestComp />
			</TestWrapper>
		);

		const useDispatchWithModulesDataSpy = sinon.spy();
		const useDispatchWithModulesDataStub = sinon
			.stub(useDispatchWithModulesDataMock, "useDispatchWithModulesData")
			.returns(useDispatchWithModulesDataSpy);

		const mountedComponent = mount(component);

		const fieldComponent = mountedComponent.find("#deleteElementByPath");

		fieldComponent.invoke("onClick")();

		expect(useDispatchWithModulesDataSpy, "to have a call satisfying", {
			args: [removeEditModel, [["field", "value", "c", "value", "e"], entityId, sectionName]],
		});

		useDispatchWithModulesDataStub.restore();
	});

	it("Delete value in edit view by path when value is object", () => {
		const component = (
			<TestWrapper provider={{ store: storeWithModifications }}>
				<TestComp />
			</TestWrapper>
		);

		const useDispatchWithModulesDataSpy = sinon.spy();
		const useDispatchWithModulesDataStub = sinon
			.stub(useDispatchWithModulesDataMock, "useDispatchWithModulesData")
			.returns(useDispatchWithModulesDataSpy);

		const mountedComponent = mount(component);

		const fieldComponent = mountedComponent.find("#deleteElementByPathWhenObject");

		fieldComponent.invoke("onClick")();

		expect(useDispatchWithModulesDataSpy, "to have a call satisfying", {
			args: [removeEditModel, [["field", "value", "c", "value", "d"], entityId, sectionName]],
		});

		useDispatchWithModulesDataStub.restore();
	});

	it("Delete value in edit view by path when value is array", () => {
		const component = (
			<TestWrapper provider={{ store: storeWithModifications }}>
				<TestComp />
			</TestWrapper>
		);

		const useDispatchWithModulesDataSpy = sinon.spy();
		const useDispatchWithModulesDataStub = sinon
			.stub(useDispatchWithModulesDataMock, "useDispatchWithModulesData")
			.returns(useDispatchWithModulesDataSpy);

		const mountedComponent = mount(component);

		const fieldComponent = mountedComponent.find("#deleteElementByPathWhenArray");

		fieldComponent.invoke("onClick")();

		expect(useDispatchWithModulesDataSpy, "to have a call satisfying", {
			args: [removeEditModel, [["field", "value", "c", "value", "n"], entityId, sectionName]],
		});

		useDispatchWithModulesDataStub.restore();
	});

	it("Delete value in edit view with no path", () => {
		const component = (
			<TestWrapper provider={{ store: storeWithModifications }}>
				<TestComp />
			</TestWrapper>
		);

		const useDispatchWithModulesDataSpy = sinon.spy();
		const useDispatchWithModulesDataStub = sinon
			.stub(useDispatchWithModulesDataMock, "useDispatchWithModulesData")
			.returns(useDispatchWithModulesDataSpy);

		const mountedComponent = mount(component);

		const fieldComponent = mountedComponent.find("#deleteElementWithNoPath");

		fieldComponent.invoke("onClick")();

		expect(useDispatchWithModulesDataSpy, "to have a call satisfying", {
			args: [removeEditModel, [["field"], entityId, sectionName]],
		});

		useDispatchWithModulesDataStub.restore();
	});
});
