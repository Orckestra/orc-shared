import React from "react";
import useMultipleFieldEditState from "./useMultipleFieldEditState";
import { TestWrapper } from "./../utils/testUtils";
import Immutable from "immutable";
import sinon from "sinon";
import { mount } from "enzyme";
import * as useDispatchWithModulesDataMock from "./useDispatchWithModulesData";
import { setEditModelField, setEditModelFieldError } from "./../actions/view";
import { validationErrorTypes } from "./../constants";
import _ from "lodash";
import { initializePaymentRequest } from "~/actions/requestsApi";

describe("useMultipleFieldEditState", () => {
	let store, state;
	const moduleName = "thing";
	const sectionName = "mySection";
	const entityId = "entityId";
	const fieldInitialValues = {
		id1: {
			prop1: "id1: default value for id1 prop1",
			prop2: "id1: default value for id1 prop2",
		},
		id2: {
			prop1: "id2: default value for id2 prop1",
			prop2: "id2: default value for id2 prop2",
		},
		emptyValues: {
			prop1: "",
			prop2: "",
		},
		undefinedValues: {
			prop1: undefined,
			prop2: null,
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
								/*
                                id1: {
                                    prop1: prop1State
                                }
                                */
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

	const TestCompItem = ({ id, editStates }) => {
		const prop1State = editStates["prop1"];
		const prop2State = editStates["prop2"];

		return (
			<div>
				<div>
					<div id={`${id}-prop1-field`}>{prop1State.state.value}</div>
					<div id={`${id}-prop1-update`} onClick={e => prop1State.update(e.target.value)} />
					<div id={`${id}-prop1-reset`} onClick={prop1State.reset} />
					<div id={`${id}-prop1-isValid`} onClick={prop1State.isValid} />
				</div>
				<div>
					<div id={`${id}-prop2-field`}>{prop2State.state.value}</div>
					<div id={`${id}-prop2-update`} onClick={e => prop2State.update(e.target.value)} />
					<div id={`${id}-prop2-reset`} onClick={prop2State.reset} />
					<div id={`${id}-prop2-isValid`} onClick={prop2State.isValid} />
				</div>
			</div>
		);
	};

	const TestCompList = ({ useCustomRules = true }) => {
		const customRules = useCustomRules
			? { customRule: (value, id, fieldName) => value === "custom" && id === "id1" && fieldName === "prop1" }
			: undefined;

		const [createEditState, modifiedStates] = useMultipleFieldEditState(
			entityId,
			sectionName,
			fieldInitialValues,
			customRules,
		);
		const idsToRender = _.keys(fieldInitialValues);

		const errorTypes = [validationErrorTypes.fieldIsRequired];
		if (useCustomRules) {
			errorTypes.push("customRule");
		}

		const editStates = {};
		idsToRender.forEach(id => {
			editStates[id] = {
				prop1: createEditState(id, "prop1", errorTypes),
				prop2: createEditState(id, "prop2"),
			};
		});

		return (
			<div>
				{idsToRender.map(id => (
					<TestCompItem key={id} id={id} editStates={editStates[id]} />
				))}
			</div>
		);
	};

	const mountComponent = (useCustomRules = true) => {
		const component = (
			<TestWrapper provider={{ store }}>
				<TestCompList useCustomRules={useCustomRules} />
			</TestWrapper>
		);

		const mountedComponent = mount(component);
		return mountedComponent;
	};

	it.each([
		["#id1-prop1-field", fieldInitialValues.id1.prop1],
		["#id1-prop2-field", fieldInitialValues.id1.prop2],
		["#id2-prop1-field", fieldInitialValues.id2.prop1],
		["#id2-prop2-field", fieldInitialValues.id2.prop2],
	])("Provides an access to initial value in edit view for field %s", (fieldId, initialValue) => {
		const mountedComponent = mountComponent();

		const fieldValue = mountedComponent.find(fieldId).prop("children");

		expect(fieldValue, "to equal", initialValue);
	});

	it.each([
		["#id1-prop1-field", "new value1", "id1", "prop1"],
		["#id1-prop2-field", "new value2", "id1", "prop2"],
		["#id2-prop1-field", "new value3", "id2", "prop1"],
		["#id2-prop2-field", "new value4", "id2", "prop2"],
	])("Provides an access to actual value in edit view for field %s", (fieldId, newValue, id, fieldName) => {
		state = state.setIn(["view", "edit", moduleName, entityId, sectionName, "model", id, fieldName], {
			value: newValue,
		});
		const mountedComponent = mountComponent();

		const fieldValue = mountedComponent.find(fieldId).prop("children");

		expect(fieldValue, "to equal", newValue);
	});

	it.each([
		["#emptyValues-prop1-field", ""],
		["#emptyValues-prop2-field", ""],
	])("Sets initial value to empty string as default value field %s", (fieldId, initialValue) => {
		const mountedComponent = mountComponent();

		const fieldValue = mountedComponent.find(fieldId).prop("children");

		expect(fieldValue, "to equal", initialValue);
	});

	it.each([
		["id1", "prop2", "new value2"],
		["id2", "prop2", "new value4"],
		["emptyValues", "prop2", "new value5"],
	])("Updates edit view value correctly without validation for field %s %s", (id, fieldName, newValue) => {
		const useDispatchWithModulesDataSpy = sinon.spy();
		const useDispatchWithModulesDataStub = sinon
			.stub(useDispatchWithModulesDataMock, "useDispatchWithModulesData")
			.returns(useDispatchWithModulesDataSpy);

		try {
			const mountedComponent = mountComponent();

			const fieldComponent = mountedComponent.find(`#${id}-${fieldName}-update`);

			const event = {
				target: {
					value: newValue,
				},
			};

			fieldComponent.invoke("onClick")(event);

			const initialFieldValue = fieldInitialValues[id][fieldName];

			expect(useDispatchWithModulesDataSpy, "to have a call satisfying", {
				args: [setEditModelField, [[id, fieldName], newValue, initialFieldValue, entityId, sectionName]],
			});
		} finally {
			useDispatchWithModulesDataStub.restore();
		}
	});

	it.each([
		["id1", "prop1", "new value2"],
		["id2", "prop1", "new value4"],
		["emptyValues", "prop1", "new value5"],
	])(
		"Updates edit view value correctly with default validation rules when validation was passed for field %s %s",
		(id, fieldName, newValue) => {
			const useDispatchWithModulesDataSpy = sinon.spy();
			const useDispatchWithModulesDataStub = sinon
				.stub(useDispatchWithModulesDataMock, "useDispatchWithModulesData")
				.returns(useDispatchWithModulesDataSpy);

			try {
				const mountedComponent = mountComponent();

				const fieldComponent = mountedComponent.find(`#${id}-${fieldName}-update`);

				const event = {
					target: {
						value: newValue,
					},
				};

				fieldComponent.invoke("onClick")(event);

				const initialFieldValue = fieldInitialValues[id][fieldName];

				expect(useDispatchWithModulesDataSpy, "to have a call satisfying", {
					args: [setEditModelField, [[id, fieldName], newValue, initialFieldValue, entityId, sectionName]],
				});

				expect(useDispatchWithModulesDataSpy, "to have no calls satisfying", {
					args: [
						setEditModelFieldError,
						[[id, fieldName], validationErrorTypes.fieldIsRequired, entityId, sectionName],
					],
				});
			} finally {
				useDispatchWithModulesDataStub.restore();
			}
		},
	);

	it.each([
		["id1", "prop2", "new value2"],
		["id2", "prop2", "new value4"],
		["emptyValues", "prop2", "new value5"],
	])(
		"Updates edit view value correctly when no validation rules are set for field %s %s",
		(id, fieldName, newValue) => {
			const useDispatchWithModulesDataSpy = sinon.spy();
			const useDispatchWithModulesDataStub = sinon
				.stub(useDispatchWithModulesDataMock, "useDispatchWithModulesData")
				.returns(useDispatchWithModulesDataSpy);

			try {
				const mountedComponent = mountComponent();

				const fieldComponent = mountedComponent.find(`#${id}-${fieldName}-update`);

				const event = {
					target: {
						value: newValue,
					},
				};

				fieldComponent.invoke("onClick")(event);

				const initialFieldValue = fieldInitialValues[id][fieldName];

				expect(useDispatchWithModulesDataSpy, "to have a call satisfying", {
					args: [setEditModelField, [[id, fieldName], newValue, initialFieldValue, entityId, sectionName]],
				});

				expect(useDispatchWithModulesDataSpy, "to have no calls satisfying", {
					args: [
						setEditModelFieldError,
						[[id, fieldName], validationErrorTypes.fieldIsRequired, entityId, sectionName],
					],
				});
			} finally {
				useDispatchWithModulesDataStub.restore();
			}
		},
	);

	it.each([
		["id1", "prop1"],
		["id2", "prop1"],
		["emptyValues", "prop1"],
	])(
		"Updates edit view value correctly with required value validation rules when validation was not successful for field %s %s",
		(id, fieldName) => {
			const useDispatchWithModulesDataSpy = sinon.spy();
			const useDispatchWithModulesDataStub = sinon
				.stub(useDispatchWithModulesDataMock, "useDispatchWithModulesData")
				.returns(useDispatchWithModulesDataSpy);

			try {
				const mountedComponent = mountComponent();

				const fieldComponent = mountedComponent.find(`#${id}-${fieldName}-update`);

				const event = {
					target: {
						value: "",
					},
				};

				fieldComponent.invoke("onClick")(event);

				const initialFieldValue = fieldInitialValues[id][fieldName];

				expect(useDispatchWithModulesDataSpy, "to have a call satisfying", {
					args: [setEditModelField, [[id, fieldName], "", initialFieldValue, entityId, sectionName]],
				});

				expect(useDispatchWithModulesDataSpy, "to have a call satisfying", {
					args: [
						setEditModelFieldError,
						[[id, fieldName], validationErrorTypes.fieldIsRequired, entityId, sectionName],
					],
				});
			} finally {
				useDispatchWithModulesDataStub.restore();
			}
		},
	);

	it.each([
		["id1", "prop1", false],
		["id2", "prop1", true],
		["emptyValues", "prop1", true],
	])(
		"Updates edit view value correctly with custom validation rules when validation was passed for field %s %s",
		(id, fieldName, failsCustomValidation) => {
			const useDispatchWithModulesDataSpy = sinon.spy();
			const useDispatchWithModulesDataStub = sinon
				.stub(useDispatchWithModulesDataMock, "useDispatchWithModulesData")
				.returns(useDispatchWithModulesDataSpy);

			try {
				const mountedComponent = mountComponent();

				const fieldComponent = mountedComponent.find(`#${id}-${fieldName}-update`);

				const event = {
					target: {
						value: "custom",
					},
				};

				fieldComponent.invoke("onClick")(event);

				const initialFieldValue = fieldInitialValues[id][fieldName];

				expect(useDispatchWithModulesDataSpy, "to have a call satisfying", {
					args: [setEditModelField, [[id, fieldName], "custom", initialFieldValue, entityId, sectionName]],
				});

				const comparaison = failsCustomValidation ? "to have a call satisfying" : "to have no calls satisfying";
				expect(useDispatchWithModulesDataSpy, comparaison, {
					args: [setEditModelFieldError, [[id, fieldName], "customRule", entityId, sectionName]],
				});
			} finally {
				useDispatchWithModulesDataStub.restore();
			}
		},
	);

	it("Updates edit view value correctly with custom validation rules when validation was not passed", () => {
		const useDispatchWithModulesDataSpy = sinon.spy();
		const useDispatchWithModulesDataStub = sinon
			.stub(useDispatchWithModulesDataMock, "useDispatchWithModulesData")
			.returns(useDispatchWithModulesDataSpy);

		try {
			const mountedComponent = mountComponent();

			const fieldComponent = mountedComponent.find(`#id1-prop1-update`);

			const event = {
				target: {
					value: "anotherValue",
				},
			};

			fieldComponent.invoke("onClick")(event);

			const id = "id1";
			const fieldName = "prop1";
			const initialFieldValue = fieldInitialValues[id][fieldName];

			expect(useDispatchWithModulesDataSpy, "to have a call satisfying", {
				args: [setEditModelField, [[id, fieldName], "anotherValue", initialFieldValue, entityId, sectionName]],
			});

			expect(useDispatchWithModulesDataSpy, "to have a call satisfying", {
				args: [setEditModelFieldError, [[id, fieldName], "customRule", entityId, sectionName]],
			});
		} finally {
			useDispatchWithModulesDataStub.restore();
		}
	});

	it.each([
		["id1", "prop1"],
		["id1", "prop2"],
	])("Resets correctly edit view field to the initial value field %s %s", (id, fieldName) => {
		const useDispatchWithModulesDataSpy = sinon.spy();
		const useDispatchWithModulesDataStub = sinon
			.stub(useDispatchWithModulesDataMock, "useDispatchWithModulesData")
			.returns(useDispatchWithModulesDataSpy);

		try {
			const mountedComponent = mountComponent();

			const fieldComponent = mountedComponent.find(`#${id}-${fieldName}-reset`);

			const event = {
				target: {
					value: "custom",
				},
			};

			fieldComponent.invoke("onClick")(event);

			const initialFieldValue = fieldInitialValues[id][fieldName];

			expect(useDispatchWithModulesDataSpy, "to have a call satisfying", {
				args: [setEditModelField, [[id, fieldName], initialFieldValue, initialFieldValue, entityId, sectionName]],
			});
		} finally {
			useDispatchWithModulesDataStub.restore();
		}
	});

	it.each([
		["id1", "prop1", true],
		["id2", "prop1", false],
		["emptyValues", "prop1", false],
	])("Validates edit state value correctly %s %s", (id, fieldName, failsCustomValidation) => {
		const useDispatchWithModulesDataSpy = sinon.spy();
		const useDispatchWithModulesDataStub = sinon
			.stub(useDispatchWithModulesDataMock, "useDispatchWithModulesData")
			.returns(useDispatchWithModulesDataSpy);

		try {
			const mountedComponent = mountComponent();

			const fieldComponent = mountedComponent.find(`#${id}-${fieldName}-isValid`);

			fieldComponent.invoke("onClick")();

			const comparaison = failsCustomValidation ? "to have a call satisfying" : "to have no calls satisfying";
			expect(useDispatchWithModulesDataSpy, "to have a call satisfying", {
				args: [setEditModelFieldError, [[id, fieldName], "customRule", entityId, sectionName]],
			});
		} finally {
			useDispatchWithModulesDataStub.restore();
		}
	});

	it.each([
		["undefinedValues", "prop1"],
		["undefinedValues", "prop2"],
	])("Uses empty value when property is null or undefined for field %s %s", (id, fieldName) => {
		const mountedComponent = mountComponent(false);

		const fieldValue = mountedComponent.find(`#${id}-${fieldName}-field`).prop("children");

		expect(fieldValue, "to equal", "");
	});

	it.each([
		["id1", "prop1", "new value1"],
		["id1", "prop2", "new value2"],
		["id2", "prop1", "new value3"],
		["id2", "prop2", "new value4"],
	])(
		"Updates edit view value correctly when hook has no additional rules for field %s %s",
		(id, fieldName, newValue) => {
			const useDispatchWithModulesDataSpy = sinon.spy();
			const useDispatchWithModulesDataStub = sinon
				.stub(useDispatchWithModulesDataMock, "useDispatchWithModulesData")
				.returns(useDispatchWithModulesDataSpy);

			try {
				const mountedComponent = mountComponent(false);

				const fieldComponent = mountedComponent.find(`#${id}-${fieldName}-update`);

				const event = {
					target: {
						value: newValue,
					},
				};

				fieldComponent.invoke("onClick")(event);

				const initialFieldValue = fieldInitialValues[id][fieldName];

				expect(useDispatchWithModulesDataSpy, "to have a call satisfying", {
					args: [setEditModelField, [[id, fieldName], newValue, initialFieldValue, entityId, sectionName]],
				});
			} finally {
				useDispatchWithModulesDataStub.restore();
			}
		},
	);
});
