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
		field: "value",
	};
	const modules = { modules: "modulesTree" };

	beforeEach(() => {
		state = Immutable.fromJS({
			navigation: {
				route: { match: { path: `/:scope/${moduleName}/id/${sectionName}` } },
				config: { prependPath: "/:scope/", prependHref: "/scope/" },
			},
			modules: {
				tree: Immutable.fromJS(modules),
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
			dispatch: () => sinon.spy("dispatch"),
			getState: () => state,
		};
	});

	const TestComp = () => {
		const [field, updateField, resetField] = useEditState(entityId, ["field"], initialFieldValue);

		return (
			<div>
				<div id="field">{field}</div>
				<div id="update" onClick={e => updateField(e.target.value)} />
				<div
					id="updateWithDefaultValidation"
					onClick={e => updateField(e.target.value, [validationErrorTypes.fieldIsRequired])}
				/>
				<div
					id="updateWithCustomValidation"
					onClick={e =>
						updateField(e.target.value, [validationErrorTypes.fieldIsRequired, "customRule"], {
							customRule: value => value === "custom",
						})
					}
				/>
				<div id="reset" onClick={resetField} />
			</div>
		);
	};

	it("Provides an access to actual value in edit view", () => {
		const component = (
			<TestWrapper provider={{ store }}>
				<TestComp />
			</TestWrapper>
		);

		const mountedComponent = mount(component);

		const fieldValue = mountedComponent.find("#field").prop("children");

		expect(fieldValue, "to equal", model.field);
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
				[["field"], "newValue", initialFieldValue, entityId],
				{
					includeCurrentSection: true,
				},
			],
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
				[["field"], "newValue", initialFieldValue, entityId],
				{
					includeCurrentSection: true,
				},
			],
		});

		expect(useDispatchWithModulesDataSpy, "to have no calls satisfying", {
			args: [
				setEditModelFieldError,
				[["field"], validationErrorTypes.fieldIsRequired, entityId],
				{
					includeCurrentSection: true,
				},
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
			args: [
				setEditModelField,
				[["field"], "", initialFieldValue, entityId],
				{
					includeCurrentSection: true,
				},
			],
		});

		expect(useDispatchWithModulesDataSpy, "to have a call satisfying", {
			args: [
				setEditModelFieldError,
				[["field"], validationErrorTypes.fieldIsRequired, entityId],
				{
					includeCurrentSection: true,
				},
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
			args: [
				setEditModelField,
				[["field"], "custom", initialFieldValue, entityId],
				{
					includeCurrentSection: true,
				},
			],
		});

		expect(useDispatchWithModulesDataSpy, "to have no calls satisfying", {
			args: [
				setEditModelFieldError,
				[["field"], "customRule", entityId],
				{
					includeCurrentSection: true,
				},
			],
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
				[["field"], "anotherValue", initialFieldValue, entityId],
				{
					includeCurrentSection: true,
				},
			],
		});

		expect(useDispatchWithModulesDataSpy, "to have a call satisfying", {
			args: [
				setEditModelFieldError,
				[["field"], "customRule", entityId],
				{
					includeCurrentSection: true,
				},
			],
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
				[["field"], initialFieldValue, initialFieldValue, entityId],
				{
					includeCurrentSection: true,
				},
			],
		});

		useDispatchWithModulesDataStub.restore();
	});
});
