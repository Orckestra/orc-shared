import React from "react";
import useEditState from "./useEditState";
import { TestWrapper } from "./../utils/testUtils";
import Immutable from "immutable";
import sinon from "sinon";
import { mount } from "enzyme";
import * as useDispatchWithModulesDataMock from "./useDispatchWithModulesData";
import { setEditModelField, setEditModelFieldError } from "./../actions/view";
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
			dispatch: () => sinon.spy("dispatch"),
			getState: () => state,
		};
	});

	const TestComp = () => {
		const createEditState = useEditState(entityId, sectionName, { customRule: value => value === "custom" });
		const field = createEditState(["field"], initialFieldValue, [validationErrorTypes.fieldIsRequired, "customRule"]);

		const createEditStateWithoutCustomRules = useEditState(entityId, sectionName);
		const fieldWithoutVaidationRules = createEditStateWithoutCustomRules(["field"], initialFieldValue);

		return (
			<div>
				<div id="field">{field.state.value}</div>
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
