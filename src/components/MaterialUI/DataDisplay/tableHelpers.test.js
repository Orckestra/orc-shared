import React from "react";
import { buildHeaderAndRowFromConfig } from "./tableHelpers";
import CheckboxProps from "../Inputs/CheckboxProps";
import { ignoreConsoleError, createMuiTheme, generateClassName } from "~/utils/testUtils";
import TooltippedTypography from "./TooltippedElements/TooltippedTypography";
import Switch from "../Inputs/Switch";
import SwitchProps from "../Inputs/SwitchProps";
import { IntlProvider } from "react-intl";
import { MuiThemeProvider } from "@material-ui/core";
import { StylesProvider } from "@material-ui/core/styles";
import InputBaseProps from "../Inputs/InputBaseProps";
import InputBase from "../Inputs/InputBase";

describe("table helpers buildHeaderAndRowFromConfig", () => {
	const messages = {
		a_label: { id: "a_label", defaultMessage: "a label for header" },
		another: { id: "yes_another", defaultMessage: "another label" },
		captionOn: { id: "captionOn", defaultMessage: "is On" },
		captionOff: { id: "captionOff", defaultMessage: "is Off" },
	};

	const captionMessages = {
		captionOn: "is On",
		captionOff: "is Off",
	};

	it("Throws an error if columnDefinitions has more than one sortField", () => {
		const columnDef = [
			{
				fieldName: "test",
				label: "simple header",
				sortOptions: {
					sortField: true,
				},
			},
			{
				fieldName: "another",
				label: "another simple header",
				sortOptions: {
					sortField: true,
				},
			},
		];

		ignoreConsoleError(() => {
			expect(() => buildHeaderAndRowFromConfig(columnDef), "to throw a", Error);
		});
	});

	it("build simple table headers", () => {
		const columnDef = [
			{ fieldName: "test", label: "simple header", className: "aClassXYZ" },
			{ fieldName: "another", label: "another simple header" },
		];
		const elements = [
			{
				id: "an_id1",
				test: "A text row 1",
				another: "another 1",
				extraneous: "Don't show 1",
			},
			{
				id: "an_id2",
				test: "A text row 2",
				another: "another 2",
				extraneous: "Don't show 2",
			},
		];

		const { headers } = buildHeaderAndRowFromConfig(columnDef, elements);

		expect(headers.length, "to equal", 2);
		expect(headers[0].cellElement.props.columnDefinition, "to equal", columnDef[0]);
		expect(headers[0].className, "to equal", columnDef[0].className);
		expect(headers[1].cellElement.props.columnDefinition, "to equal", columnDef[1]);
		expect(headers[1].className, "to be undefined");
	});

	it("build table headers and rows as expected", () => {
		const columnDef = [
			{ fieldName: "test", label: messages.a_label, className: "aClassXYZ" },
			{ fieldName: "another", label: messages.another },
		];
		const elements = [
			{
				id: "an_id1",
				test: "A text row 1",
				another: "another 1",
				extraneous: "Don't show 1",
			},
			{
				id: "an_id2",
				test: "A text row 2",
				another: "another 2",
				extraneous: "Don't show 2",
				customClass: "specialRow1",
			},
			{
				id: "an_id3",
				test: null,
				another: null,
				extraneous: "Don't show 2",
				customClass: "specialRow2",
			},
		];

		const { headers, rows } = buildHeaderAndRowFromConfig(columnDef, elements, true, "id", true);

		expect(headers.length, "to equal", 2);
		expect(headers[0].cellElement.props.columnDefinition, "to equal", columnDef[0]);
		expect(headers[0].className, "to equal", columnDef[0].className);
		expect(headers[1].cellElement.props.columnDefinition, "to equal", columnDef[1]);
		expect(headers[1].className, "to be undefined");

		expect(rows.length, "to equal", 3);
		expect(rows[0].columns.length, "to equal", 2);

		expect(rows[0].key, "to equal", "an_id1");
		expect(rows[0].element, "to equal", elements[0]);

		expect(rows[0].style.show, "to equal", true);
		expect(rows[0].style.customClass, "to equal", "");

		expect(rows[1].style.show, "to equal", true);
		expect(rows[1].style.customClass, "to equal", "specialRow1");

		expect(rows[2].style.show, "to equal", true);
		expect(rows[2].style.customClass, "to equal", "specialRow2");
		expect(
			rows[0].columns[0].cellElement,
			"when mounted",
			"to satisfy",
			<TooltippedTypography noWrap children={elements[0].test} titleValue={elements[0].test} />,
		);
		expect(rows[0].columns[0].className, "to equal", columnDef[0].className);
		expect(
			rows[0].columns[0].title,
			"when mounted",
			"to satisfy",
			<TooltippedTypography noWrap children={elements[0].test} titleValue={elements[0].test} />,
		);
		expect(
			rows[0].columns[1].cellElement,
			"when mounted",
			"to satisfy",
			<TooltippedTypography noWrap children={elements[0].another} titleValue={elements[0].another} />,
		);
		expect(rows[0].columns[1].className, "to be undefined");
		expect(
			rows[0].columns[1].title,
			"when mounted",
			"to satisfy",
			<TooltippedTypography noWrap children={elements[0].another} titleValue={elements[0].another} />,
		);

		expect(rows[1].columns.length, "to equal", 2);

		expect(rows[1].key, "to equal", "an_id2");
		expect(rows[1].element, "to equal", elements[1]);
		expect(
			rows[1].columns[0].cellElement,
			"when mounted",
			"to satisfy",
			<TooltippedTypography noWrap children={elements[1].test} titleValue={elements[1].test} />,
		);
		expect(rows[1].columns[0].className, "to equal", columnDef[0].className);
		expect(
			rows[1].columns[0].title,
			"when mounted",
			"to satisfy",
			<TooltippedTypography noWrap children={elements[1].test} titleValue={elements[1].test} />,
		);
		expect(
			rows[1].columns[1].cellElement,
			"when mounted",
			"to satisfy",
			<TooltippedTypography noWrap children={elements[1].another} titleValue={elements[1].another} />,
		);
		expect(rows[1].columns[1].className, "to be undefined");
		expect(
			rows[1].columns[1].title,
			"when mounted",
			"to satisfy",
			<TooltippedTypography noWrap children={elements[1].another} titleValue={elements[1].another} />,
		);

		expect(rows[2].key, "to equal", "an_id3");
		expect(rows[2].element, "to equal", elements[2]);
		expect(rows[2].columns[0].cellElement, "to be", null);
		expect(rows[2].columns[1].cellElement, "to be", null);
	});

	it("build table headers and rows as expected with another key field", () => {
		const columnDef = [
			{ fieldName: "test", label: messages.a_label, className: "aClass123" },
			{ fieldName: "another", label: messages.another },
		];
		const elements = [
			{
				id: "an_id1",
				test: "A text row 1",
				another: "another 1",
				extraneous: "Don't show 1",
			},
			{
				id: "an_id2",
				test: "A text row 2",
				another: "another 2",
				extraneous: "Don't show 2",
			},
		];

		const { headers, rows } = buildHeaderAndRowFromConfig(columnDef, elements, true, "extraneous");

		expect(headers.length, "to equal", 2);
		expect(headers[0].cellElement.props.columnDefinition, "to equal", columnDef[0]);
		expect(headers[0].className, "to equal", columnDef[0].className);
		expect(headers[1].cellElement.props.columnDefinition, "to equal", columnDef[1]);
		expect(headers[1].className, "to be undefined");

		expect(rows.length, "to equal", 2);
		expect(rows[0].columns.length, "to equal", 2);

		expect(rows[0].key, "to equal", "Don't show 1");
		expect(rows[0].element, "to equal", elements[0]);
		expect(
			rows[0].columns[0].cellElement,
			"when mounted",
			"to satisfy",
			<TooltippedTypography noWrap children={elements[0].test} titleValue={elements[0].test} />,
		);
		expect(rows[0].columns[0].className, "to equal", columnDef[0].className);
		expect(
			rows[0].columns[0].title,
			"when mounted",
			"to satisfy",
			<TooltippedTypography noWrap children={elements[0].test} titleValue={elements[0].test} />,
		);
		expect(
			rows[0].columns[1].cellElement,
			"when mounted",
			"to satisfy",
			<TooltippedTypography noWrap children={elements[0].another} titleValue={elements[0].another} />,
		);
		expect(rows[0].columns[1].className, "to be undefined");
		expect(
			rows[0].columns[1].title,
			"when mounted",
			"to satisfy",
			<TooltippedTypography noWrap children={elements[0].another} titleValue={elements[0].another} />,
		);

		expect(rows[1].columns.length, "to equal", 2);

		expect(rows[1].key, "to equal", "Don't show 2");
		expect(rows[1].element, "to equal", elements[1]);
		expect(
			rows[1].columns[0].cellElement,
			"when mounted",
			"to satisfy",
			<TooltippedTypography noWrap children={elements[1].test} titleValue={elements[1].test} />,
		);
		expect(rows[1].columns[0].className, "to equal", columnDef[0].className);
		expect(
			rows[1].columns[0].title,
			"when mounted",
			"to satisfy",
			<TooltippedTypography noWrap children={elements[1].test} titleValue={elements[1].test} />,
		);
		expect(
			rows[1].columns[1].cellElement,
			"when mounted",
			"to satisfy",
			<TooltippedTypography noWrap children={elements[1].another} titleValue={elements[1].another} />,
		);
		expect(rows[1].columns[1].className, "to be undefined");
		expect(
			rows[1].columns[1].title,
			"when mounted",
			"to satisfy",
			<TooltippedTypography noWrap children={elements[1].another} titleValue={elements[1].another} />,
		);
	});

	it("build table rows as expected with transform", () => {
		const columnDef = [
			{
				fieldName: "another",
				label: messages.a_label,
				transform: {
					value: v => v + "_transformation",
				},
			},
		];
		const elements = [
			{ id: "an_id1", test: 123, another: "another 1", extraneous: "Don't show 1" },
			{ id: "an_id2", test: 44, another: "another 2", extraneous: "Don't show 2" },
		];

		const { headers, rows } = buildHeaderAndRowFromConfig(columnDef, elements);

		expect(headers.length, "to equal", 1);

		expect(rows.length, "to equal", 2);
		expect(rows[0].columns.length, "to equal", 1);
		expect(rows[0].element, "to equal", elements[0]);
		expect(
			rows[0].columns[0].cellElement,
			"when mounted",
			"to satisfy",
			<TooltippedTypography noWrap children="another 1_transformation" titleValue="another 1_transformation" />,
		);
		expect(
			rows[0].columns[0].title,
			"when mounted",
			"to satisfy",
			<TooltippedTypography noWrap children="another 1_transformation" titleValue="another 1_transformation" />,
		);

		expect(
			rows[1].columns[0].cellElement,
			"when mounted",
			"to satisfy",
			<TooltippedTypography noWrap children="another 2_transformation" titleValue="another 2_transformation" />,
		);
		expect(
			rows[1].columns[0].title,
			"when mounted",
			"to satisfy",
			<TooltippedTypography noWrap children="another 2_transformation" titleValue="another 2_transformation" />,
		);
	});

	it("build table rows as expected with a custom builder", () => {
		const columnDef = [
			{
				type: "custom",
				builder: e => e.test + " a value from builder",
				label: messages.a_label,
			},
		];
		const elements = [
			{ id: "an_id1", test: 123, another: "another 1", extraneous: "Don't show 1" },
			{ id: "an_id2", test: 44, another: "another 2", extraneous: "Don't show 2" },
		];

		const { headers, rows } = buildHeaderAndRowFromConfig(columnDef, elements);

		expect(headers.length, "to equal", 1);

		expect(rows.length, "to equal", 2);
		expect(rows[0].columns.length, "to equal", 1);
		expect(rows[0].element, "to equal", elements[0]);
		expect(rows[0].columns[0].cellElement, "to equal", "123 a value from builder");
		expect(rows[0].columns[0].title, "to equal", "123 a value from builder");

		expect(rows[1].columns[0].cellElement, "to equal", "44 a value from builder");
		expect(rows[1].columns[0].title, "to equal", "44 a value from builder");
	});

	it("validate builder inputs", () => {
		const elements = [
			{
				id: "an_id1",
				test: "A text row 1",
				another: "another 1",
				extraneous: "Don't show 1",
			},
			{
				id: "an_id2",
				test: "A text row 2",
				another: "another 2",
				extraneous: "Don't show 2",
			},
		];

		let counter = 0;

		const builder = (e, readOnly, def, index) => {
			if (e.id === "an_id1") {
				expect(index, "to equal", 0);
			} else {
				expect(index, "to equal", 1);
			}

			expect(readOnly, "to be", false);

			counter++;
		};

		const columnDef = [
			{
				type: "custom",
				builder: builder,
				label: messages.a_label,
			},
			{
				type: "custom",
				builder: builder,
				label: messages.a_label,
			},
			{
				type: "custom",
				builder: builder,
				label: messages.a_label,
			},
		];

		buildHeaderAndRowFromConfig(columnDef, elements, false);

		expect(counter, "to equal", 6);
	});

	it("build table rows as expected with a custom builder returning not valid component", () => {
		const columnDef = [
			{
				fieldName: "test",
				type: "custom",
				builder: () => undefined,
				label: messages.a_label,
			},
		];
		const elements = [
			{ id: "an_id1", test: 123, another: "another 1", extraneous: "Don't show 1" },
			{ id: "an_id2", test: 44, another: "another 2", extraneous: "Don't show 2" },
		];

		const { headers, rows } = buildHeaderAndRowFromConfig(columnDef, elements);

		expect(headers.length, "to equal", 1);

		expect(rows.length, "to equal", 2);
		expect(rows[0].columns.length, "to equal", 1);
		expect(rows[0].element, "to equal", elements[0]);
		expect(
			rows[0].columns[0].cellElement,
			"when mounted",
			"to satisfy",
			<TooltippedTypography noWrap children={elements[0].test} titleValue={elements[0].test} />,
		);
		expect(
			rows[0].columns[0].title,
			"when mounted",
			"to satisfy",
			<TooltippedTypography noWrap children={elements[0].test} titleValue={elements[0].test} />,
		);

		expect(rows[1].columns.length, "to equal", 1);
		expect(rows[1].element, "to equal", elements[1]);
		expect(
			rows[1].columns[0].cellElement,
			"when mounted",
			"to satisfy",
			<TooltippedTypography noWrap children={elements[1].test} titleValue={elements[1].test} />,
		);
		expect(
			rows[1].columns[0].title,
			"when mounted",
			"to satisfy",
			<TooltippedTypography noWrap children={elements[1].test} titleValue={elements[1].test} />,
		);
	});

	it("build table rows as expected with currency", () => {
		const columnDef = [{ fieldName: "test", label: messages.a_label, type: "currency", currency: "USD" }];
		const elements = [
			{ id: "an_id1", test: 123, another: "another 1", extraneous: "Don't show 1" },
			{ id: "an_id2", test: 44, another: "another 2", extraneous: "Don't show 2" },
			{ id: "an_id3", test: 0, another: "another 3", extraneous: "Don't show 3" },
		];

		const { headers, rows } = buildHeaderAndRowFromConfig(columnDef, elements);

		expect(headers.length, "to equal", 1);

		expect(rows.length, "to equal", 3);
		expect(rows[0].columns.length, "to equal", 1);
		expect(rows[0].element, "to equal", elements[0]);
		expect(rows[0].columns[0].cellElement.props.children.props, "to equal", {
			style: "currency",
			currency: "USD",
			value: 123,
		});
		expect(rows[0].columns[0].title.props.children.props, "to equal", {
			style: "currency",
			currency: "USD",
			value: 123,
		});

		expect(rows[1].columns[0].cellElement.props.children.props, "to equal", {
			style: "currency",
			currency: "USD",
			value: 44,
		});
		expect(rows[1].columns[0].title.props.children.props, "to equal", {
			style: "currency",
			currency: "USD",
			value: 44,
		});

		expect(rows[2].columns[0].cellElement.props.children.props, "to equal", {
			style: "currency",
			currency: "USD",
			value: "0",
		});
		expect(rows[2].columns[0].title.props.children.props, "to equal", {
			style: "currency",
			currency: "USD",
			value: "0",
		});
	});

	it("build table rows as expected with currency from elements", () => {
		const columnDef = [
			{
				fieldName: "test",
				label: messages.a_label,
				type: "currency",
				currency: ["currency"],
			},
		];
		const elements = [
			{
				id: "an_id1",
				test: 123,
				another: "another 1",
				extraneous: "Don't show 1",
				currency: "EUR",
			},
			{
				id: "an_id2",
				test: 44,
				another: "another 2",
				extraneous: "Don't show 2",
				currency: "USD",
			},
			{
				id: "an_id3",
				test: 0,
				another: "another 3",
				extraneous: "Don't show 3",
				currency: "CAD",
			},
			{
				id: "an_id3",
				test: 0,
				another: "another 3",
				extraneous: "Don't show 3",
			},
		];

		const { headers, rows } = buildHeaderAndRowFromConfig(columnDef, elements);

		expect(headers.length, "to equal", 1);

		expect(rows.length, "to equal", 4);
		expect(rows[0].columns.length, "to equal", 1);
		expect(rows[0].element, "to equal", elements[0]);
		expect(rows[0].columns[0].cellElement.props.children.props, "to equal", {
			style: "currency",
			currency: "EUR",
			value: 123,
		});
		expect(rows[0].columns[0].title.props.children.props, "to equal", {
			style: "currency",
			currency: "EUR",
			value: 123,
		});

		expect(rows[1].columns[0].cellElement.props.children.props, "to equal", {
			style: "currency",
			currency: "USD",
			value: 44,
		});
		expect(rows[1].columns[0].title.props.children.props, "to equal", {
			style: "currency",
			currency: "USD",
			value: 44,
		});

		expect(rows[2].columns[0].cellElement.props.children.props, "to equal", {
			style: "currency",
			currency: "CAD",
			value: "0",
		});
		expect(rows[2].columns[0].title.props.children.props, "to equal", {
			style: "currency",
			currency: "CAD",
			value: "0",
		});

		expect(rows[3].columns[0].cellElement, "to equal", null);
		expect(rows[3].columns[0].title, "to equal", null);
	});

	it("build table rows as expected with date", () => {
		const columnDef = [{ fieldName: "test", label: messages.a_label, type: "date" }];
		const elements = [
			{ id: "an_id1", test: 123, another: "another 1", extraneous: "Don't show 1" },
			{ id: "an_id2", test: 44, another: "another 2", extraneous: "Don't show 2" },
			{ id: "an_id2", test: null, another: "another 2", extraneous: "Don't show 2" },
		];

		const { headers, rows } = buildHeaderAndRowFromConfig(columnDef, elements);

		expect(headers.length, "to equal", 1);

		expect(rows.length, "to equal", 3);
		expect(rows[0].columns.length, "to equal", 1);
		expect(rows[0].element, "to equal", elements[0]);
		expect(rows[0].columns[0].cellElement.props.children.props, "to equal", { value: 123 });
		expect(rows[0].columns[0].title.props.children.props, "to equal", { value: 123 });

		expect(rows[1].columns[0].cellElement.props.children.props, "to equal", { value: 44 });
		expect(rows[1].columns[0].title.props.children.props, "to equal", { value: 44 });

		expect(rows[2].columns[0].cellElement, "to equal", null);
		expect(rows[2].columns[0].title, "to equal", null);
	});

	it("build table rows as expected with datetime", () => {
		const columnDef = [{ fieldName: "test", label: messages.a_label, type: "datetime" }];
		const elements = [
			{ id: "an_id1", test: 123, another: "another 1", extraneous: "Don't show 1" },
			{ id: "an_id2", test: 44, another: "another 2", extraneous: "Don't show 2" },
			{ id: "an_id2", test: null, another: "another 2", extraneous: "Don't show 2" },
		];

		const { headers, rows } = buildHeaderAndRowFromConfig(columnDef, elements);

		expect(headers.length, "to equal", 1);

		expect(rows.length, "to equal", 3);
		expect(rows[0].columns.length, "to equal", 1);
		expect(rows[0].element, "to equal", elements[0]);
		expect(rows[0].columns[0].cellElement.props.children.props.children[0].props, "to equal", {
			value: 123,
		});

		expect(rows[0].columns[0].title.props.children.props.children[0].props, "to equal", { value: 123 });
		expect(rows[0].columns[0].cellElement.props.children.props.children[1], "to equal", " ");
		expect(rows[0].columns[0].title.props.children.props.children[1], "to equal", " ");
		expect(rows[0].columns[0].cellElement.props.children.props.children[2].props, "to equal", {
			value: 123,
		});
		expect(rows[0].columns[0].title.props.children.props.children[2].props, "to equal", { value: 123 });

		expect(rows[1].columns[0].cellElement.props.children.props.children[0].props, "to equal", {
			value: 44,
		});
		expect(rows[1].columns[0].title.props.children.props.children[0].props, "to equal", { value: 44 });
		expect(rows[1].columns[0].cellElement.props.children.props.children[1], "to equal", " ");
		expect(rows[1].columns[0].title.props.children.props.children[1], "to equal", " ");
		expect(rows[1].columns[0].cellElement.props.children.props.children[2].props, "to equal", {
			value: 44,
		});
		expect(rows[1].columns[0].title.props.children.props.children[2].props, "to equal", { value: 44 });

		expect(rows[2].columns[0].title, "to equal", null);
		expect(rows[2].columns[0].cellElement, "to equal", null);
	});

	it("build table rows as expected with select", () => {
		const changeEvent = jest.fn();

		const columnDef = [
			{
				fieldName: "test",
				label: messages.a_label,
				type: "select",
				onChange: changeEvent,
			},
		];
		const elements = [
			{ id: "an_id1", test: true, another: "another 1", extraneous: "Don't show 1" },
			{ id: "an_id2", test: false, another: "another 2", extraneous: "Don't show 2" },
		];

		const { headers, rows } = buildHeaderAndRowFromConfig(columnDef, elements);

		const checkboxProps = new CheckboxProps();
		checkboxProps.set(CheckboxProps.propNames.update, changeEvent);
		checkboxProps.set(CheckboxProps.propNames.value, true);

		expect(headers.length, "to equal", 1);

		expect(rows.length, "to equal", 2);
		expect(rows[0].columns.length, "to equal", 1);
		expect(rows[0].element, "to equal", elements[0]);

		expect(rows[0].columns[0].cellElement.props["data-row-id"], "to equal", "an_id1");
		expect(rows[0].columns[0].cellElement.props.checkboxProps.componentProps.get("value"), "to equal", true);
		expect(rows[0].columns[0].cellElement.props.checkboxProps.componentProps.get("update"), "to equal", changeEvent);
		expect(rows[0].columns[0].title, "to be null");

		expect(rows[1].columns[0].cellElement.props["data-row-id"], "to equal", "an_id2");
		expect(rows[1].columns[0].cellElement.props.checkboxProps.componentProps.get("value"), "to equal", false);
		expect(rows[1].columns[0].cellElement.props.checkboxProps.componentProps.get("update"), "to equal", changeEvent);
		expect(rows[1].columns[0].title, "to be null");
	});

	it("build table rows as expected with select with transform", () => {
		const changeEvent = jest.fn();

		const columnDef = [
			{
				fieldName: "test",
				label: messages.a_label,
				type: "select",
				onChange: changeEvent,
				transform: {
					readOnly: (e, readOnly) => false,
				},
			},
		];
		const elements = [
			{ id: "an_id1", test: true, another: "another 1", extraneous: "Don't show 1" },
			{ id: "an_id2", test: false, another: "another 2", extraneous: "Don't show 2" },
		];

		const { headers, rows } = buildHeaderAndRowFromConfig(columnDef, elements);

		const checkboxProps = new CheckboxProps();
		checkboxProps.set(CheckboxProps.propNames.update, changeEvent);
		checkboxProps.set(CheckboxProps.propNames.value, true);
		checkboxProps.set(CheckboxProps.propNames.readOnly, false);

		expect(headers.length, "to equal", 1);

		expect(rows.length, "to equal", 2);
		expect(rows[0].columns.length, "to equal", 1);
		expect(rows[0].element, "to equal", elements[0]);

		expect(rows[0].columns[0].cellElement.props["data-row-id"], "to equal", "an_id1");
		expect(rows[0].columns[0].cellElement.props.checkboxProps.componentProps.get("value"), "to equal", true);
		expect(rows[0].columns[0].cellElement.props.checkboxProps.componentProps.get("update"), "to equal", changeEvent);
		expect(rows[0].columns[0].title, "to be null");

		expect(rows[1].columns[0].cellElement.props["data-row-id"], "to equal", "an_id2");
		expect(rows[1].columns[0].cellElement.props.checkboxProps.componentProps.get("value"), "to equal", false);
		expect(rows[1].columns[0].cellElement.props.checkboxProps.componentProps.get("update"), "to equal", changeEvent);
		expect(rows[1].columns[0].title, "to be null");
	});

	it("build table rows as expected with switch", () => {
		const changeEvent = jest.fn();

		const columnDef = [
			{
				fieldName: "test",
				label: messages.a_label,
				type: "switch",
				onChange: changeEvent,
			},
		];
		const elements = [
			{ id: "an_id1", test: true, another: "another 1", extraneous: "Don't show 1" },
			{ id: "an_id2", test: false, another: "another 2", extraneous: "Don't show 2" },
		];

		const { headers, rows } = buildHeaderAndRowFromConfig(columnDef, elements);

		const switchProps1 = new SwitchProps();
		switchProps1.set(SwitchProps.propNames.update, changeEvent);
		switchProps1.set(SwitchProps.propNames.value, true);

		const switchProps2 = new SwitchProps();
		switchProps2.set(SwitchProps.propNames.update, changeEvent);
		switchProps2.set(SwitchProps.propNames.value, false);

		expect(headers.length, "to equal", 1);

		expect(rows.length, "to equal", 2);
		expect(rows[0].columns.length, "to equal", 1);
		expect(rows[0].element, "to equal", elements[0]);

		expect(
			<StylesProvider generateClassName={generateClassName}>
				<MuiThemeProvider theme={createMuiTheme()}>
					<IntlProvider messages={captionMessages} locale="en-US">
						{rows[0].columns[0].cellElement}
					</IntlProvider>
				</MuiThemeProvider>
			</StylesProvider>,
			"when mounted",
			"to satisfy",
			<StylesProvider generateClassName={generateClassName}>
				<MuiThemeProvider theme={createMuiTheme()}>
					<IntlProvider messages={captionMessages} locale="en-US">
						<Switch switchProps={switchProps1} />
					</IntlProvider>
				</MuiThemeProvider>
			</StylesProvider>,
		);

		expect(
			<StylesProvider generateClassName={generateClassName}>
				<MuiThemeProvider theme={createMuiTheme()}>
					<IntlProvider messages={captionMessages} locale="en-US">
						{rows[1].columns[0].cellElement}
					</IntlProvider>
				</MuiThemeProvider>
			</StylesProvider>,
			"when mounted",
			"to satisfy",
			<StylesProvider generateClassName={generateClassName}>
				<MuiThemeProvider theme={createMuiTheme()}>
					<IntlProvider messages={captionMessages} locale="en-US">
						<Switch switchProps={switchProps2} />
					</IntlProvider>
				</MuiThemeProvider>
			</StylesProvider>,
		);
	});

	it("build table rows as expected with transform", () => {
		const changeEvent = jest.fn();

		const columnDef = [
			{
				fieldName: "test",
				label: messages.a_label,
				type: "switch",
				onChange: changeEvent,
				transform: {
					disabled: e => !e.test,
					readOnly: (e, readOnly) => false,
				},
			},
		];
		const elements = [
			{ id: "an_id1", test: true, another: "another 1", extraneous: "Don't show 1" },
			{ id: "an_id2", test: false, another: "another 2", extraneous: "Don't show 2" },
		];

		const { headers, rows } = buildHeaderAndRowFromConfig(columnDef, elements);

		const switchProps1 = new SwitchProps();
		switchProps1.set(SwitchProps.propNames.update, changeEvent);
		switchProps1.set(SwitchProps.propNames.value, true);
		switchProps1.set(SwitchProps.propNames.disabled, false);
		switchProps1.set(SwitchProps.propNames.readOnly, false);

		const switchProps2 = new SwitchProps();
		switchProps2.set(SwitchProps.propNames.update, changeEvent);
		switchProps2.set(SwitchProps.propNames.value, false);
		switchProps2.set(SwitchProps.propNames.disabled, true);
		switchProps2.set(SwitchProps.propNames.readOnly, false);

		expect(headers.length, "to equal", 1);

		expect(rows.length, "to equal", 2);
		expect(rows[0].columns.length, "to equal", 1);
		expect(rows[0].element, "to equal", elements[0]);

		expect(
			<StylesProvider generateClassName={generateClassName}>
				<MuiThemeProvider theme={createMuiTheme()}>
					<IntlProvider messages={captionMessages} locale="en-US">
						{rows[0].columns[0].cellElement}
					</IntlProvider>
				</MuiThemeProvider>
			</StylesProvider>,
			"when mounted",
			"to satisfy",
			<StylesProvider generateClassName={generateClassName}>
				<MuiThemeProvider theme={createMuiTheme()}>
					<IntlProvider messages={captionMessages} locale="en-US">
						<Switch switchProps={switchProps1} />
					</IntlProvider>
				</MuiThemeProvider>
			</StylesProvider>,
		);

		expect(
			<StylesProvider generateClassName={generateClassName}>
				<MuiThemeProvider theme={createMuiTheme()}>
					<IntlProvider messages={captionMessages} locale="en-US">
						{rows[1].columns[0].cellElement}
					</IntlProvider>
				</MuiThemeProvider>
			</StylesProvider>,
			"when mounted",
			"to satisfy",
			<StylesProvider generateClassName={generateClassName}>
				<MuiThemeProvider theme={createMuiTheme()}>
					<IntlProvider messages={captionMessages} locale="en-US">
						<Switch switchProps={switchProps2} />
					</IntlProvider>
				</MuiThemeProvider>
			</StylesProvider>,
		);
	});

	it("build table rows as expected with switch caption", () => {
		const changeEvent = jest.fn();

		const aSwitch = {
			onCaption: messages.captionOn,
			offCaption: messages.captionOff,
		};

		const columnDef = [
			{
				fieldName: "test",
				label: messages.a_label,
				type: "switch",
				onChange: changeEvent,
				switch: aSwitch,
			},
		];
		const elements = [
			{ id: "an_id1", test: true, another: "another 1", extraneous: "Don't show 1" },
			{ id: "an_id2", test: false, another: "another 2", extraneous: "Don't show 2" },
		];

		const { headers, rows } = buildHeaderAndRowFromConfig(columnDef, elements);

		const switchProps1 = new SwitchProps();
		switchProps1.set(SwitchProps.propNames.update, changeEvent);
		switchProps1.set(SwitchProps.propNames.value, true);
		switchProps1.set(SwitchProps.propNames.onCaption, aSwitch.onCaption);
		switchProps1.set(SwitchProps.propNames.offCaption, aSwitch.offCaption);

		const switchProps2 = new SwitchProps();
		switchProps2.set(SwitchProps.propNames.update, changeEvent);
		switchProps2.set(SwitchProps.propNames.value, false);
		switchProps2.set(SwitchProps.propNames.onCaption, aSwitch.onCaption);
		switchProps2.set(SwitchProps.propNames.offCaption, aSwitch.offCaption);

		expect(headers.length, "to equal", 1);

		expect(rows.length, "to equal", 2);
		expect(rows[0].columns.length, "to equal", 1);
		expect(rows[0].element, "to equal", elements[0]);

		expect(
			<StylesProvider generateClassName={generateClassName}>
				<MuiThemeProvider theme={createMuiTheme()}>
					<IntlProvider messages={captionMessages} locale="en-US">
						{rows[0].columns[0].cellElement}
					</IntlProvider>
				</MuiThemeProvider>
			</StylesProvider>,
			"when mounted",
			"to satisfy",
			<StylesProvider generateClassName={generateClassName}>
				<MuiThemeProvider theme={createMuiTheme()}>
					<IntlProvider messages={captionMessages} locale="en-US">
						<Switch switchProps={switchProps1} />
					</IntlProvider>
				</MuiThemeProvider>
			</StylesProvider>,
		);

		expect(
			<StylesProvider generateClassName={generateClassName}>
				<MuiThemeProvider theme={createMuiTheme()}>
					<IntlProvider messages={captionMessages} locale="en-US">
						{rows[1].columns[0].cellElement}
					</IntlProvider>
				</MuiThemeProvider>
			</StylesProvider>,
			"when mounted",
			"to satisfy",
			<StylesProvider generateClassName={generateClassName}>
				<MuiThemeProvider theme={createMuiTheme()}>
					<IntlProvider messages={captionMessages} locale="en-US">
						<Switch switchProps={switchProps2} />
					</IntlProvider>
				</MuiThemeProvider>
			</StylesProvider>,
		);
	});

	it("build table rows as expected with reversed switch", () => {
		const changeEvent = jest.fn();

		const aSwitch = {
			onCaption: messages.captionOn,
			offCaption: messages.captionOff,
		};

		const columnDef = [
			{
				fieldName: "test",
				label: messages.a_label,
				type: "switch",
				onChange: changeEvent,
				switch: aSwitch,
				reversed: true,
			},
		];
		const elements = [
			{ id: "an_id1", test: false, another: "another 1", extraneous: "Don't show 1" },
			{ id: "an_id2", test: true, another: "another 2", extraneous: "Don't show 2" },
		];

		const { headers, rows } = buildHeaderAndRowFromConfig(columnDef, elements);

		const switchProps1 = new SwitchProps();
		switchProps1.set(SwitchProps.propNames.update, changeEvent);
		switchProps1.set(SwitchProps.propNames.value, true);
		switchProps1.set(SwitchProps.propNames.onCaption, aSwitch.onCaption);
		switchProps1.set(SwitchProps.propNames.offCaption, aSwitch.offCaption);

		const switchProps2 = new SwitchProps();
		switchProps2.set(SwitchProps.propNames.update, changeEvent);
		switchProps2.set(SwitchProps.propNames.value, false);
		switchProps2.set(SwitchProps.propNames.onCaption, aSwitch.onCaption);
		switchProps2.set(SwitchProps.propNames.offCaption, aSwitch.offCaption);

		expect(headers.length, "to equal", 1);

		expect(rows.length, "to equal", 2);
		expect(rows[0].columns.length, "to equal", 1);
		expect(rows[0].element, "to equal", elements[0]);

		expect(
			<StylesProvider generateClassName={generateClassName}>
				<MuiThemeProvider theme={createMuiTheme()}>
					<IntlProvider messages={captionMessages} locale="en-US">
						{rows[0].columns[0].cellElement}
					</IntlProvider>
				</MuiThemeProvider>
			</StylesProvider>,
			"when mounted",
			"to satisfy",
			<StylesProvider generateClassName={generateClassName}>
				<MuiThemeProvider theme={createMuiTheme()}>
					<IntlProvider messages={captionMessages} locale="en-US">
						<Switch switchProps={switchProps1} />
					</IntlProvider>
				</MuiThemeProvider>
			</StylesProvider>,
		);

		expect(
			<StylesProvider generateClassName={generateClassName}>
				<MuiThemeProvider theme={createMuiTheme()}>
					<IntlProvider messages={captionMessages} locale="en-US">
						{rows[1].columns[0].cellElement}
					</IntlProvider>
				</MuiThemeProvider>
			</StylesProvider>,
			"when mounted",
			"to satisfy",
			<StylesProvider generateClassName={generateClassName}>
				<MuiThemeProvider theme={createMuiTheme()}>
					<IntlProvider messages={captionMessages} locale="en-US">
						<Switch switchProps={switchProps2} />
					</IntlProvider>
				</MuiThemeProvider>
			</StylesProvider>,
		);
	});

	it("build table rows as expected with textInput", () => {
		const changeEvent = jest.fn();

		const columnDef = [
			{
				fieldName: "another",
				label: messages.a_label,
				type: "textInput",
				onChange: changeEvent,
				disabled: false,
			},
		];
		const elements = [
			{ id: "an_id1", test: true, another: "another 1", extraneous: "Don't show 1" },
			{ id: "an_id2", test: false, another: "another 2", extraneous: "Don't show 2" },
		];

		const { headers, rows } = buildHeaderAndRowFromConfig(columnDef, elements);

		const inputBaseProps1 = new InputBaseProps();
		inputBaseProps1.set(InputBaseProps.propNames.update, changeEvent);
		inputBaseProps1.set(InputBaseProps.propNames.value, "another 1");

		const inputBaseProps2 = new InputBaseProps();
		inputBaseProps2.set(InputBaseProps.propNames.update, changeEvent);
		inputBaseProps2.set(InputBaseProps.propNames.value, "another 2");

		expect(headers.length, "to equal", 1);

		expect(rows.length, "to equal", 2);
		expect(rows[0].columns.length, "to equal", 1);
		expect(rows[0].element, "to equal", elements[0]);

		expect(
			<StylesProvider generateClassName={generateClassName}>
				<MuiThemeProvider theme={createMuiTheme()}>
					<IntlProvider messages={captionMessages} locale="en-US">
						{rows[0].columns[0].cellElement}
					</IntlProvider>
				</MuiThemeProvider>
			</StylesProvider>,
			"when mounted",
			"to satisfy",
			<StylesProvider generateClassName={generateClassName}>
				<MuiThemeProvider theme={createMuiTheme()}>
					<IntlProvider messages={captionMessages} locale="en-US">
						<InputBase inputProps={inputBaseProps1} />
					</IntlProvider>
				</MuiThemeProvider>
			</StylesProvider>,
		);

		expect(
			<StylesProvider generateClassName={generateClassName}>
				<MuiThemeProvider theme={createMuiTheme()}>
					<IntlProvider messages={captionMessages} locale="en-US">
						{rows[1].columns[0].cellElement}
					</IntlProvider>
				</MuiThemeProvider>
			</StylesProvider>,
			"when mounted",
			"to satisfy",
			<StylesProvider generateClassName={generateClassName}>
				<MuiThemeProvider theme={createMuiTheme()}>
					<IntlProvider messages={captionMessages} locale="en-US">
						<InputBase inputProps={inputBaseProps2} />
					</IntlProvider>
				</MuiThemeProvider>
			</StylesProvider>,
		);
	});

	it("build table rows as expected with textInput and transformed disabled and error", () => {
		const changeEvent = jest.fn();
		const disabledCallback = jest.fn().mockReturnValue(true);
		const errorCallback = jest.fn().mockReturnValue(false);

		const columnDef = [
			{
				fieldName: "another",
				label: messages.a_label,
				type: "textInput",
				onChange: changeEvent,
				transform: {
					disabled: disabledCallback,
					error: errorCallback,
				},
			},
		];
		const elements = [
			{ id: "an_id1", test: true, another: "another 1", extraneous: "Don't show 1" },
			{ id: "an_id2", test: false, another: "another 2", extraneous: "Don't show 2" },
		];

		const { headers, rows } = buildHeaderAndRowFromConfig(columnDef, elements);

		const inputBaseProps1 = new InputBaseProps();
		inputBaseProps1.set(InputBaseProps.propNames.update, changeEvent);
		inputBaseProps1.set(InputBaseProps.propNames.value, "another 1");
		inputBaseProps1.set(InputBaseProps.propNames.error, false);
		inputBaseProps1.set(InputBaseProps.propNames.disabled, true);

		const inputBaseProps2 = new InputBaseProps();
		inputBaseProps2.set(InputBaseProps.propNames.update, changeEvent);
		inputBaseProps2.set(InputBaseProps.propNames.value, "another 2");
		inputBaseProps2.set(InputBaseProps.propNames.error, false);
		inputBaseProps2.set(InputBaseProps.propNames.disabled, true);

		expect(headers.length, "to equal", 1);

		expect(rows.length, "to equal", 2);
		expect(rows[0].columns.length, "to equal", 1);
		expect(rows[0].element, "to equal", elements[0]);

		expect(
			<StylesProvider generateClassName={generateClassName}>
				<MuiThemeProvider theme={createMuiTheme()}>
					<IntlProvider messages={captionMessages} locale="en-US">
						{rows[0].columns[0].cellElement}
					</IntlProvider>
				</MuiThemeProvider>
			</StylesProvider>,
			"when mounted",
			"to satisfy",
			<StylesProvider generateClassName={generateClassName}>
				<MuiThemeProvider theme={createMuiTheme()}>
					<IntlProvider messages={captionMessages} locale="en-US">
						<InputBase inputProps={inputBaseProps1} />
					</IntlProvider>
				</MuiThemeProvider>
			</StylesProvider>,
		);

		expect(
			<StylesProvider generateClassName={generateClassName}>
				<MuiThemeProvider theme={createMuiTheme()}>
					<IntlProvider messages={captionMessages} locale="en-US">
						{rows[1].columns[0].cellElement}
					</IntlProvider>
				</MuiThemeProvider>
			</StylesProvider>,
			"when mounted",
			"to satisfy",
			<StylesProvider generateClassName={generateClassName}>
				<MuiThemeProvider theme={createMuiTheme()}>
					<IntlProvider messages={captionMessages} locale="en-US">
						<InputBase inputProps={inputBaseProps2} />
					</IntlProvider>
				</MuiThemeProvider>
			</StylesProvider>,
		);
	});

	it("build table rows as expected when value is null and switch caption should not be shown", () => {
		const changeEvent = jest.fn();

		const columnDef = [
			{
				fieldName: "test",
				label: messages.a_label,
				type: "switch",
				onChange: changeEvent,
			},
		];
		const elements = [{ id: "an_id1", test: null, another: "another 1", extraneous: "Don't show 1" }];

		const { headers, rows } = buildHeaderAndRowFromConfig(columnDef, elements);

		expect(headers.length, "to equal", 1);

		expect(rows.length, "to equal", 1);
		expect(rows[0].columns.length, "to equal", 1);
		expect(rows[0].element, "to equal", elements[0]);

		expect(rows[0].columns[0].cellElement, "to be", null);
	});

	it("build table rows as expected without tooltip as required", () => {
		const columnDef = [
			{ fieldName: "test", label: messages.a_label, className: "aClassXYZ", tooltipable: false },
			{ fieldName: "another", label: messages.another },
		];

		const elements = [
			{
				id: "an_id1",
				test: "A text row 1",
				another: "another 1",
				extraneous: "Don't show 1",
			},
			{
				id: "an_id2",
				test: "A text row 2",
				another: "another 2",
				extraneous: "Don't show 2",
			},
		];

		const { headers, rows } = buildHeaderAndRowFromConfig(columnDef, elements);

		expect(headers.length, "to equal", 2);
		expect(headers[0].cellElement.props.columnDefinition, "to equal", columnDef[0]);
		expect(headers[0].className, "to equal", columnDef[0].className);
		expect(headers[1].cellElement.props.columnDefinition, "to equal", columnDef[1]);
		expect(headers[1].className, "to be undefined");

		expect(rows.length, "to equal", 2);
		expect(rows[0].columns.length, "to equal", 2);

		expect(rows[0].key, "to equal", "an_id1");

		expect(rows[0].element, "to equal", elements[0]);
		expect(
			rows[0].columns[0].cellElement,
			"when mounted",
			"to satisfy",
			<TooltippedTypography noWrap children={elements[0].test} titleValue={elements[0].test} />,
		);
		expect(rows[0].columns[0].className, "to equal", columnDef[0].className);
		expect(rows[0].columns[0].title, "to be null");
		expect(
			rows[0].columns[1].cellElement,
			"when mounted",
			"to satisfy",
			<TooltippedTypography noWrap children={elements[0].another} titleValue={elements[0].another} />,
		);
		expect(rows[0].columns[1].className, "to be undefined");

		expect(
			rows[0].columns[1].title,
			"when mounted",
			"to satisfy",
			<TooltippedTypography noWrap children={elements[0].another} titleValue={elements[0].another} />,
		);

		expect(rows[1].columns.length, "to equal", 2);

		expect(rows[1].key, "to equal", "an_id2");
		expect(rows[1].element, "to equal", elements[1]);
		expect(
			rows[1].columns[0].cellElement,
			"when mounted",
			"to satisfy",
			<TooltippedTypography noWrap children={elements[1].test} titleValue={elements[1].test} />,
		);
		expect(rows[1].columns[0].className, "to equal", columnDef[0].className);
		expect(rows[1].columns[0].title, "to be null");
		expect(
			rows[1].columns[1].cellElement,
			"when mounted",
			"to satisfy",
			<TooltippedTypography noWrap children={elements[1].another} titleValue={elements[1].another} />,
		);
		expect(rows[1].columns[1].className, "to be undefined");
		expect(
			rows[1].columns[1].title,
			"when mounted",
			"to satisfy",
			<TooltippedTypography noWrap children={elements[1].another} titleValue={elements[1].another} />,
		);
	});

	it("build table rows as expected with radio", () => {
		const changeEvent = jest.fn();

		const columnDef = [
			{
				type: "radio",
				fieldName: "id",
				onChangeCallback: changeEvent,
				groupName: "preferredStore",
				selectedValue: "an_id2",
				label: messages.a_label,
			},
		];

		const elements = [
			{ id: "an_id1", test: true, another: "another 1", extraneous: "Don't show 1" },
			{ id: "an_id2", test: false, another: "another 2", extraneous: "Don't show 2" },
		];

		const { headers, rows } = buildHeaderAndRowFromConfig(columnDef, elements);

		expect(headers.length, "to equal", 1);

		expect(rows.length, "to equal", 2);
		expect(rows[0].columns.length, "to equal", 1);
		expect(rows[0].element, "to equal", elements[0]);

		expect(rows[0].columns[0].cellElement.props.radioProps.componentProps.get("name"), "to equal", "preferredStore");
		expect(rows[0].columns[0].cellElement.props.radioProps.componentProps.get("value"), "to equal", "an_id1");
		expect(rows[0].columns[0].cellElement.props.radioProps.componentProps.get("onChange"), "to equal", changeEvent);

		expect(rows[1].columns[0].cellElement.props.radioProps.componentProps.get("name"), "to equal", "preferredStore");
		expect(rows[1].columns[0].cellElement.props.radioProps.componentProps.get("value"), "to equal", "an_id2");
		expect(rows[1].columns[0].cellElement.props.radioProps.componentProps.get("checked"), "to equal", true);
		expect(rows[1].columns[0].cellElement.props.radioProps.componentProps.get("onChange"), "to equal", changeEvent);
	});

	it("build table rows as expected with radio and transform", () => {
		const changeEvent = jest.fn();

		const columnDef = [
			{
				type: "radio",
				fieldName: "id",
				onChangeCallback: changeEvent,
				groupName: "preferredStore",
				selectedValue: "an_id2",
				label: messages.a_label,
				transform: {
					checked: e => false,
					readOnly: e => true,
					name: e => "name transformed",
				},
			},
		];

		const elements = [
			{ id: "an_id1", test: true, another: "another 1", extraneous: "Don't show 1" },
			{ id: "an_id2", test: false, another: "another 2", extraneous: "Don't show 2" },
		];

		const { headers, rows } = buildHeaderAndRowFromConfig(columnDef, elements);

		expect(headers.length, "to equal", 1);

		expect(rows.length, "to equal", 2);
		expect(rows[0].columns.length, "to equal", 1);
		expect(rows[0].element, "to equal", elements[0]);

		expect(rows[0].columns[0].cellElement.props.radioProps.componentProps.get("name"), "to equal", "name transformed");
		expect(rows[0].columns[0].cellElement.props.radioProps.componentProps.get("value"), "to equal", "an_id1");
		expect(rows[0].columns[0].cellElement.props.radioProps.componentProps.get("onChange"), "to equal", changeEvent);
		expect(rows[0].columns[0].cellElement.props.radioProps.componentProps.get("checked"), "to equal", false);
		expect(rows[0].columns[0].cellElement.props.radioProps.componentProps.get("readOnly"), "to equal", true);

		expect(rows[1].columns[0].cellElement.props.radioProps.componentProps.get("name"), "to equal", "name transformed");
		expect(rows[1].columns[0].cellElement.props.radioProps.componentProps.get("value"), "to equal", "an_id2");
		expect(rows[1].columns[0].cellElement.props.radioProps.componentProps.get("checked"), "to equal", false);
		expect(rows[1].columns[0].cellElement.props.radioProps.componentProps.get("onChange"), "to equal", changeEvent);
		expect(rows[1].columns[0].cellElement.props.radioProps.componentProps.get("readOnly"), "to equal", true);
	});

	it("build table headers and rows as expected when not in readonly mode", () => {
		const columnDef = [
			{ fieldName: "test", label: messages.a_label, className: "aClassXYZ" },
			{ fieldName: "another", label: messages.another },
		];
		const elements = [
			{
				id: "an_id1",
				test: "A text row 1",
				another: "another 1",
				extraneous: "Don't show 1",
			},
			{
				id: "an_id2",
				test: "A text row 2",
				another: "another 2",
				extraneous: "Don't show 2",
			},
			{
				id: "an_id3",
				test: null,
				another: null,
				extraneous: "Don't show 2",
			},
		];

		const { headers, rows } = buildHeaderAndRowFromConfig(columnDef, elements, false);

		expect(headers.length, "to equal", 2);
		expect(headers[0].cellElement.props.columnDefinition, "to equal", columnDef[0]);
		expect(headers[0].className, "to equal", columnDef[0].className);
		expect(headers[1].cellElement.props.columnDefinition, "to equal", columnDef[1]);
		expect(headers[1].className, "to be undefined");

		expect(rows.length, "to equal", 3);
		expect(rows[0].columns.length, "to equal", 2);

		expect(rows[0].key, "to equal", "an_id1");
		expect(rows[0].element, "to equal", elements[0]);
		expect(
			rows[0].columns[0].cellElement,
			"when mounted",
			"to satisfy",
			<TooltippedTypography noWrap children={elements[0].test} titleValue={elements[0].test} />,
		);
		expect(rows[0].columns[0].className, "to equal", columnDef[0].className);
		expect(
			rows[0].columns[0].title,
			"when mounted",
			"to satisfy",
			<TooltippedTypography noWrap children={elements[0].test} titleValue={elements[0].test} />,
		);
		expect(
			rows[0].columns[1].cellElement,
			"when mounted",
			"to satisfy",
			<TooltippedTypography noWrap children={elements[0].another} titleValue={elements[0].another} />,
		);
		expect(rows[0].columns[1].className, "to be undefined");
		expect(
			rows[0].columns[1].title,
			"when mounted",
			"to satisfy",
			<TooltippedTypography noWrap children={elements[0].another} titleValue={elements[0].another} />,
		);

		expect(rows[1].columns.length, "to equal", 2);

		expect(rows[1].key, "to equal", "an_id2");
		expect(rows[1].element, "to equal", elements[1]);
		expect(
			rows[1].columns[0].cellElement,
			"when mounted",
			"to satisfy",
			<TooltippedTypography noWrap children={elements[1].test} titleValue={elements[1].test} />,
		);
		expect(rows[1].columns[0].className, "to equal", columnDef[0].className);
		expect(
			rows[1].columns[0].title,
			"when mounted",
			"to satisfy",
			<TooltippedTypography noWrap children={elements[1].test} titleValue={elements[1].test} />,
		);
		expect(
			rows[1].columns[1].cellElement,
			"when mounted",
			"to satisfy",
			<TooltippedTypography noWrap children={elements[1].another} titleValue={elements[1].another} />,
		);
		expect(rows[1].columns[1].className, "to be undefined");
		expect(
			rows[1].columns[1].title,
			"when mounted",
			"to satisfy",
			<TooltippedTypography noWrap children={elements[1].another} titleValue={elements[1].another} />,
		);

		expect(rows[2].key, "to equal", "an_id3");
		expect(rows[2].element, "to equal", elements[2]);
		expect(rows[2].columns[0].cellElement, "to be", null);
		expect(rows[2].columns[1].cellElement, "to be", null);
	});

	it("build table headers and rows as expected when not in readonly mode with editing builder", () => {
		const columnDef = [
			{ fieldName: "test", label: messages.a_label, className: "aClassXYZ", editingBuilder: () => null },
			{ fieldName: "another", label: messages.another, editingBuilder: e => e.another + " a value from builder" },
		];
		const elements = [
			{
				id: "an_id1",
				test: "A text row 1",
				another: "another 1",
				extraneous: "Don't show 1",
			},
			{
				id: "an_id2",
				test: "A text row 2",
				another: "another 2",
				extraneous: "Don't show 2",
			},
		];

		const { headers, rows } = buildHeaderAndRowFromConfig(columnDef, elements, false);

		expect(headers.length, "to equal", 2);
		expect(headers[0].cellElement.props.columnDefinition, "to equal", columnDef[0]);
		expect(headers[0].className, "to equal", columnDef[0].className);
		expect(headers[1].cellElement.props.columnDefinition, "to equal", columnDef[1]);
		expect(headers[1].className, "to be undefined");

		expect(rows.length, "to equal", 2);
		expect(rows[0].columns.length, "to equal", 2);

		expect(rows[0].key, "to equal", "an_id1");
		expect(rows[0].element, "to equal", elements[0]);
		expect(
			rows[0].columns[0].cellElement,
			"when mounted",
			"to satisfy",
			<TooltippedTypography noWrap children={elements[0].test} titleValue={elements[0].test} />,
		);
		expect(rows[0].columns[0].className, "to equal", columnDef[0].className);
		expect(
			rows[0].columns[0].title,
			"when mounted",
			"to satisfy",
			<TooltippedTypography noWrap children={elements[0].test} titleValue={elements[0].test} />,
		);
		expect(rows[0].columns[1].cellElement, "to equal", "another 1 a value from builder");
		expect(rows[0].columns[1].title, "to equal", "another 1 a value from builder");

		expect(rows[1].columns.length, "to equal", 2);

		expect(rows[1].key, "to equal", "an_id2");
		expect(rows[1].element, "to equal", elements[1]);
		expect(
			rows[1].columns[0].cellElement,
			"when mounted",
			"to satisfy",
			<TooltippedTypography noWrap children={elements[1].test} titleValue={elements[1].test} />,
		);
		expect(rows[1].columns[0].className, "to equal", columnDef[0].className);
		expect(
			rows[1].columns[0].title,
			"when mounted",
			"to satisfy",
			<TooltippedTypography noWrap children={elements[1].test} titleValue={elements[1].test} />,
		);
		expect(rows[1].columns[1].cellElement, "to equal", "another 2 a value from builder");
		expect(rows[1].columns[1].title, "to equal", "another 2 a value from builder");
	});

	it("build table headers and rows as expected when not in readonly mode with editing builder depending on field name", () => {
		const editingBuilder = (e, readOnly, def) =>
			def.fieldName === "test" ? null : e.another + " a value from builder";

		const columnDef = [
			{ fieldName: "test", label: messages.a_label, className: "aClassXYZ", editingBuilder: editingBuilder },
			{ fieldName: "another", label: messages.another, editingBuilder: editingBuilder },
		];
		const elements = [
			{
				id: "an_id1",
				test: "A text row 1",
				another: "another 1",
				extraneous: "Don't show 1",
			},
			{
				id: "an_id2",
				test: "A text row 2",
				another: "another 2",
				extraneous: "Don't show 2",
			},
		];

		const { headers, rows } = buildHeaderAndRowFromConfig(columnDef, elements, false);

		expect(headers.length, "to equal", 2);
		expect(headers[0].cellElement.props.columnDefinition, "to equal", columnDef[0]);
		expect(headers[0].className, "to equal", columnDef[0].className);
		expect(headers[1].cellElement.props.columnDefinition, "to equal", columnDef[1]);
		expect(headers[1].className, "to be undefined");

		expect(rows.length, "to equal", 2);
		expect(rows[0].columns.length, "to equal", 2);

		expect(rows[0].key, "to equal", "an_id1");
		expect(rows[0].element, "to equal", elements[0]);
		expect(
			rows[0].columns[0].cellElement,
			"when mounted",
			"to satisfy",
			<TooltippedTypography noWrap children={elements[0].test} titleValue={elements[0].test} />,
		);
		expect(rows[0].columns[0].className, "to equal", columnDef[0].className);
		expect(
			rows[0].columns[0].title,
			"when mounted",
			"to satisfy",
			<TooltippedTypography noWrap children={elements[0].test} titleValue={elements[0].test} />,
		);
		expect(rows[0].columns[1].cellElement, "to equal", "another 1 a value from builder");
		expect(rows[0].columns[1].title, "to equal", "another 1 a value from builder");

		expect(rows[1].columns.length, "to equal", 2);

		expect(rows[1].key, "to equal", "an_id2");
		expect(rows[1].element, "to equal", elements[1]);
		expect(
			rows[1].columns[0].cellElement,
			"when mounted",
			"to satisfy",
			<TooltippedTypography noWrap children={elements[1].test} titleValue={elements[1].test} />,
		);
		expect(rows[1].columns[0].className, "to equal", columnDef[0].className);
		expect(
			rows[1].columns[0].title,
			"when mounted",
			"to satisfy",
			<TooltippedTypography noWrap children={elements[1].test} titleValue={elements[1].test} />,
		);
		expect(rows[1].columns[1].cellElement, "to equal", "another 2 a value from builder");
		expect(rows[1].columns[1].title, "to equal", "another 2 a value from builder");
	});

	it("validate editingBuilder inputs", () => {
		const elements = [
			{
				id: "an_id1",
				test: "A text row 1",
				another: "another 1",
				extraneous: "Don't show 1",
			},
			{
				id: "an_id2",
				test: "A text row 2",
				another: "another 2",
				extraneous: "Don't show 2",
			},
		];

		let counter = 0;

		const editingBuilder = (e, readOnly, def, index) => {
			if (e.id === "an_id1") {
				expect(index, "to equal", 0);
			} else {
				expect(index, "to equal", 1);
			}

			expect(readOnly, "to be", false);

			counter++;
		};

		const columnDef = [
			{ fieldName: "test", label: messages.a_label, className: "aClassXYZ", editingBuilder: editingBuilder },
			{ fieldName: "another", label: messages.another, editingBuilder: editingBuilder },
		];

		buildHeaderAndRowFromConfig(columnDef, elements, false);

		expect(counter, "to equal", 4);
	});

	it("build table headers and rows as expected when a column should not be visible", () => {
		const editingBuilder = (e, readOnly, def) =>
			def.fieldName === "test" ? null : e.another + " a value from builder";

		const columnDef = [
			{ fieldName: "test", label: messages.a_label, className: "aClassXYZ", editingBuilder: editingBuilder },
			{ fieldName: "another", label: messages.another, editingBuilder: editingBuilder, visible: false },
		];
		const elements = [
			{
				id: "an_id1",
				test: "A text row 1",
				another: "another 1",
				extraneous: "Don't show 1",
			},
			{
				id: "an_id2",
				test: "A text row 2",
				another: "another 2",
				extraneous: "Don't show 2",
			},
		];

		const { headers, rows } = buildHeaderAndRowFromConfig(columnDef, elements, false);

		expect(headers.length, "to equal", 1);
		expect(headers[0].cellElement.props.columnDefinition, "to equal", columnDef[0]);
		expect(headers[0].className, "to equal", columnDef[0].className);

		expect(rows.length, "to equal", 2);
		expect(rows[0].columns.length, "to equal", 1);

		expect(rows[0].key, "to equal", "an_id1");
		expect(rows[0].element, "to equal", elements[0]);
		expect(
			rows[0].columns[0].cellElement,
			"when mounted",
			"to satisfy",
			<TooltippedTypography noWrap children={elements[0].test} titleValue={elements[0].test} />,
		);
		expect(rows[0].columns[0].className, "to equal", columnDef[0].className);
		expect(
			rows[0].columns[0].title,
			"when mounted",
			"to satisfy",
			<TooltippedTypography noWrap children={elements[0].test} titleValue={elements[0].test} />,
		);

		expect(rows[1].columns.length, "to equal", 1);

		expect(rows[1].key, "to equal", "an_id2");
		expect(rows[1].element, "to equal", elements[1]);
		expect(
			rows[1].columns[0].cellElement,
			"when mounted",
			"to satisfy",
			<TooltippedTypography noWrap children={elements[1].test} titleValue={elements[1].test} />,
		);
		expect(rows[1].columns[0].className, "to equal", columnDef[0].className);
		expect(
			rows[1].columns[0].title,
			"when mounted",
			"to satisfy",
			<TooltippedTypography noWrap children={elements[1].test} titleValue={elements[1].test} />,
		);
	});
});
