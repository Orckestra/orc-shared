import React from "react";
import { mount } from "enzyme";
import Select from "./Select";
import SelectMUI from "@material-ui/core/Select";
import sinon from "sinon";
import { createMuiTheme, TestWrapper } from "../../../utils/testUtils";
import SelectProps from "./SelectProps";
import Immutable from "immutable";
import LookupSelect from "./LookupSelect";

const theme = createMuiTheme();

describe("LookupSelect Component", () => {
	let store, state;
	beforeEach(() => {
		state = Immutable.fromJS({
			locale: { locale: "it-IT" },
			metadata: {
				lookups: {
					order: {
						index: {
							CanceledStatusReasons: {
								lookupName: "CanceledStatusReasons",
								values: {
									CanceledReason1: {
										id: "e16d07f847284775b77cfb985724cf58",
										value: "CanceledReason1",
										lookupId: "CanceledStatusReasons",
										sortOrder: 0,
										isActive: true,
										isSystem: true,
										displayName: {
											"en-CA": "Cancel for reason 1",
											"en-US": "Cancel for reason 1",
											"fr-CA": "Annulé pour raison 1",
											"it-IT": "Annulla per motivo 1",
										},
									},
									CanceledReason2: {
										id: "6bbfe77703c745d68b8eaceb9cd484b1",
										value: "CanceledReason2",
										lookupId: "CanceledStatusReasons",
										sortOrder: 0,
										isActive: true,
										isSystem: true,
										displayName: {
											"en-CA": "Cancel for reason 2",
											"en-US": "Cancel for reason 2",
											"fr-CA": "Annulé pour raison 2",
											"it-IT": "Annulla per motivo 2",
										},
									},
								},
								isActive: true,
								isSystem: true,
							},
							CartStatus: {
								lookupName: "CartStatus",
								values: {},
								isActive: true,
								isSystem: true,
							},
						},
						list: [],
					},
				},
			},
		});
		store = {
			subscribe: () => {},
			getState: () => state,
			dispatch: sinon.spy().named("dispatch"),
		};
	});

	it("renders select based on lookup.", () => {
		const options = [
			{ value: "CanceledReason1", label: "Annulla per motivo 1" },
			{ value: "CanceledReason2", label: "Annulla per motivo 2" },
		];

		const selectProps = new SelectProps();
		selectProps.set(SelectProps.propNames.value, "CanceledReason1");

		expect(
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }}>
				<LookupSelect
					moduleName={"order"}
					lookupName={"CanceledStatusReasons"}
					value={"CanceledReason1"}
					onChange={() => {}}
				/>
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }}>
				<Select options={options} selectProps={selectProps} />
			</TestWrapper>,
		);
	});

	it("renders disabled select based on lookup.", () => {
		const options = [
			{ value: "CanceledReason1", label: "Annulla per motivo 1" },
			{ value: "CanceledReason2", label: "Annulla per motivo 2" },
		];

		const selectProps = new SelectProps();
		selectProps.set(SelectProps.propNames.value, "CanceledReason1");
		selectProps.set(SelectProps.propNames.disabled, true);

		expect(
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }}>
				<LookupSelect
					moduleName={"order"}
					lookupName={"CanceledStatusReasons"}
					value={"CanceledReason1"}
					disabled={true}
					onChange={() => {}}
				/>
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }}>
				<Select options={options} selectProps={selectProps} />
			</TestWrapper>,
		);
	});

	it("renders select based on lookup with missing selected value", () => {
		const options = [
			{ value: "CanceledReason1", label: "Annulla per motivo 1" },
			{ value: "CanceledReason2", label: "Annulla per motivo 2" },
			{ value: "CanceledReason3", label: "[CanceledReason3]" },
		];

		const selectProps = new SelectProps();
		selectProps.set(SelectProps.propNames.value, "CanceledReason3");

		expect(
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }}>
				<LookupSelect
					moduleName={"order"}
					lookupName={"CanceledStatusReasons"}
					value={"CanceledReason3"}
					onChange={() => {}}
				/>
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }}>
				<Select options={options} selectProps={selectProps} />
			</TestWrapper>,
		);
	});

	it("LookupSelect component handles change", () => {
		const update = sinon.spy().named("update");
		const component = (
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }}>
				<LookupSelect
					moduleName={"order"}
					lookupName={"CanceledStatusReasons"}
					value={"CanceledReason3"}
					onChange={update}
				/>
			</TestWrapper>
		);

		const mountedComponent = mount(component);

		const selectMui = mountedComponent.find(SelectMUI);

		const event = {
			target: {
				value: "CanceledReason2",
			},
		};

		selectMui.invoke("onChange")(event);

		expect(update, "to have calls satisfying", [{ args: ["CanceledReason2", undefined] }]);
	});

	it("LookupSelect component handles change with metadata", () => {
		const update = sinon.spy().named("update");
		const component = (
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }}>
				<LookupSelect
					moduleName={"order"}
					lookupName={"CanceledStatusReasons"}
					value={"CanceledReason3"}
					onChange={update}
					metadata={{ a: 123 }}
				/>
			</TestWrapper>
		);

		const mountedComponent = mount(component);

		const selectMui = mountedComponent.find(SelectMUI);

		const event = {
			target: {
				value: "CanceledReason2",
			},
		};

		selectMui.invoke("onChange")(event);

		expect(update, "to have calls satisfying", [{ args: ["CanceledReason2", { a: 123 }] }]);
	});

	it("LookupSelect component with data-qa", () => {
		const update = sinon.spy().named("update");
		const component = (
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }}>
				<LookupSelect
					moduleName={"order"}
					lookupName={"CanceledStatusReasons"}
					value={"CanceledReason3"}
					onChange={update}
					metadata={{ a: 123 }}
					data-qa="custom-value"
				/>
			</TestWrapper>
		);

		const mountedComponent = mount(component);

		const controls = mountedComponent.find("[data-qa='custom-value']").hostNodes();
		expect(controls.length, "to equal", 1);
	});
});
