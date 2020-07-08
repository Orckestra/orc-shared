import { buildHeaderAndRowFromConfig } from "./tableHelpers";
import sinon from "sinon";
import * as React from "react";
import CheckboxProps from "../Inputs/CheckboxProps";
import Switch from "../../Switch";

describe("table helpers buildHeaderAndRowFromConfig", () => {
	const messages = {
		a_label: { id: "a_label", defaultMessage: "a label for header" },
		another: { id: "yes_another", defaultMessage: "another label" },
		captionOn: { id: "captionOn", defaultMessage: "is On" },
		captionOff: { id: "captionOff", defaultMessage: "is Off" },
	};

	it("build simple table headers", () => {
		const columnDef = [
			{ fieldName: "test", label: "simple header", cellStyle: { someStyle: "a style" } },
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

		const { headers, rows } = buildHeaderAndRowFromConfig(columnDef, elements);

		expect(headers.length, "to equal", 2);
		expect(headers[0].cellElement, "to equal", "simple header");
		expect(headers[0].cellStyle, "to equal", columnDef[0].cellStyle);
		expect(headers[1].cellElement, "to equal", "another simple header");
		expect(headers[1].cellStyle, "to be undefined");
	});

	it("build table headers and rows as expected", () => {
		const columnDef = [
			{ fieldName: "test", label: messages.a_label, cellStyle: { someStyle: "a style" } },
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
		expect(headers[0].cellElement.props, "to equal", messages.a_label);
		expect(headers[0].cellStyle, "to equal", columnDef[0].cellStyle);
		expect(headers[1].cellElement.props, "to equal", messages.another);
		expect(headers[1].cellStyle, "to be undefined");

		expect(rows.length, "to equal", 2);
		expect(rows[0].columns.length, "to equal", 2);

		expect(rows[0].key, "to equal", "an_id1");
		expect(rows[0].element, "to equal", elements[0]);
		expect(rows[0].columns[0].cellElement, "to equal", "A text row 1");
		expect(rows[0].columns[0].cellStyle, "to equal", columnDef[0].cellStyle);
		expect(rows[0].columns[0].title, "to equal", "A text row 1");
		expect(rows[0].columns[1].cellElement, "to equal", "another 1");
		expect(rows[0].columns[1].cellStyle, "to be undefined");
		expect(rows[0].columns[1].title, "to equal", "another 1");

		expect(rows[1].columns.length, "to equal", 2);

		expect(rows[1].key, "to equal", "an_id2");
		expect(rows[1].element, "to equal", elements[1]);
		expect(rows[1].columns[0].cellElement, "to equal", "A text row 2");
		expect(rows[1].columns[0].cellStyle, "to equal", columnDef[0].cellStyle);
		expect(rows[1].columns[0].title, "to equal", "A text row 2");
		expect(rows[1].columns[1].cellElement, "to equal", "another 2");
		expect(rows[1].columns[1].cellStyle, "to be undefined");
		expect(rows[1].columns[1].title, "to equal", "another 2");
	});

	it("build table headers and rows as expected with another key field", () => {
		const columnDef = [
			{ fieldName: "test", label: messages.a_label, cellStyle: { someStyle: "a style" } },
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

		const { headers, rows } = buildHeaderAndRowFromConfig(
			columnDef,
			elements,
			"extraneous",
		);

		expect(headers.length, "to equal", 2);
		expect(headers[0].cellElement.props, "to equal", messages.a_label);
		expect(headers[0].cellStyle, "to equal", columnDef[0].cellStyle);
		expect(headers[1].cellElement.props, "to equal", messages.another);
		expect(headers[1].cellStyle, "to be undefined");

		expect(rows.length, "to equal", 2);
		expect(rows[0].columns.length, "to equal", 2);

		expect(rows[0].key, "to equal", "Don't show 1");
		expect(rows[0].element, "to equal", elements[0]);
		expect(rows[0].columns[0].cellElement, "to equal", "A text row 1");
		expect(rows[0].columns[0].cellStyle, "to equal", columnDef[0].cellStyle);
		expect(rows[0].columns[0].title, "to equal", "A text row 1");
		expect(rows[0].columns[1].cellElement, "to equal", "another 1");
		expect(rows[0].columns[1].cellStyle, "to be undefined");
		expect(rows[0].columns[1].title, "to equal", "another 1");

		expect(rows[1].columns.length, "to equal", 2);

		expect(rows[1].key, "to equal", "Don't show 2");
		expect(rows[1].element, "to equal", elements[1]);
		expect(rows[1].columns[0].cellElement, "to equal", "A text row 2");
		expect(rows[1].columns[0].cellStyle, "to equal", columnDef[0].cellStyle);
		expect(rows[1].columns[0].title, "to equal", "A text row 2");
		expect(rows[1].columns[1].cellElement, "to equal", "another 2");
		expect(rows[1].columns[1].cellStyle, "to be undefined");
		expect(rows[1].columns[1].title, "to equal", "another 2");
	});

	it("build table rows as expected with transform", () => {
		const columnDef = [
			{
				fieldName: "another",
				label: messages.a_label,
				transform: v => v + "_transformation",
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
		expect(rows[0].columns[0].cellElement, "to equal", "another 1_transformation");
		expect(rows[0].columns[0].title, "to equal", "another 1_transformation");

		expect(rows[1].columns[0].cellElement, "to equal", "another 2_transformation");
		expect(rows[1].columns[0].title, "to equal", "another 2_transformation");
	});

	it("build table rows as expected with currency", () => {
		const columnDef = [
			{ fieldName: "test", label: messages.a_label, type: "currency", currency: "USD" },
		];
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
		expect(rows[0].columns[0].cellElement.props, "to equal", {
			style: "currency",
			currency: "USD",
			value: 123,
		});
		expect(rows[0].columns[0].title.props, "to equal", {
			style: "currency",
			currency: "USD",
			value: 123,
		});

		expect(rows[1].columns[0].cellElement.props, "to equal", {
			style: "currency",
			currency: "USD",
			value: 44,
		});
		expect(rows[1].columns[0].title.props, "to equal", {
			style: "currency",
			currency: "USD",
			value: 44,
		});

		expect(rows[2].columns[0].cellElement.props, "to equal", {
			style: "currency",
			currency: "USD",
			value: "0",
		});
		expect(rows[2].columns[0].title.props, "to equal", {
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
		];

		const { headers, rows } = buildHeaderAndRowFromConfig(columnDef, elements);

		expect(headers.length, "to equal", 1);

		expect(rows.length, "to equal", 3);
		expect(rows[0].columns.length, "to equal", 1);
		expect(rows[0].element, "to equal", elements[0]);
		expect(rows[0].columns[0].cellElement.props, "to equal", {
			style: "currency",
			currency: "EUR",
			value: 123,
		});
		expect(rows[0].columns[0].title.props, "to equal", {
			style: "currency",
			currency: "EUR",
			value: 123,
		});

		expect(rows[1].columns[0].cellElement.props, "to equal", {
			style: "currency",
			currency: "USD",
			value: 44,
		});
		expect(rows[1].columns[0].title.props, "to equal", {
			style: "currency",
			currency: "USD",
			value: 44,
		});

		expect(rows[2].columns[0].cellElement.props, "to equal", {
			style: "currency",
			currency: "CAD",
			value: "0",
		});
		expect(rows[2].columns[0].title.props, "to equal", {
			style: "currency",
			currency: "CAD",
			value: "0",
		});
	});

	it("build table rows as expected with date", () => {
		const columnDef = [{ fieldName: "test", label: messages.a_label, type: "date" }];
		const elements = [
			{ id: "an_id1", test: 123, another: "another 1", extraneous: "Don't show 1" },
			{ id: "an_id2", test: 44, another: "another 2", extraneous: "Don't show 2" },
		];

		const { headers, rows } = buildHeaderAndRowFromConfig(columnDef, elements);

		expect(headers.length, "to equal", 1);

		expect(rows.length, "to equal", 2);
		expect(rows[0].columns.length, "to equal", 1);
		expect(rows[0].element, "to equal", elements[0]);
		expect(rows[0].columns[0].cellElement.props, "to equal", { value: 123 });
		expect(rows[0].columns[0].title.props, "to equal", { value: 123 });

		expect(rows[1].columns[0].cellElement.props, "to equal", { value: 44 });
		expect(rows[1].columns[0].title.props, "to equal", { value: 44 });
	});

	it("build table rows as expected with datetime", () => {
		const columnDef = [{ fieldName: "test", label: messages.a_label, type: "datetime" }];
		const elements = [
			{ id: "an_id1", test: 123, another: "another 1", extraneous: "Don't show 1" },
			{ id: "an_id2", test: 44, another: "another 2", extraneous: "Don't show 2" },
		];

		const { headers, rows } = buildHeaderAndRowFromConfig(columnDef, elements);

		expect(headers.length, "to equal", 1);

		expect(rows.length, "to equal", 2);
		expect(rows[0].columns.length, "to equal", 1);
		expect(rows[0].element, "to equal", elements[0]);
		expect(rows[0].columns[0].cellElement.props.children[0].props, "to equal", {
			value: 123,
		});
		expect(rows[0].columns[0].title.props.children[0].props, "to equal", { value: 123 });
		expect(rows[0].columns[0].cellElement.props.children[1], "to equal", " ");
		expect(rows[0].columns[0].title.props.children[1], "to equal", " ");
		expect(rows[0].columns[0].cellElement.props.children[2].props, "to equal", {
			value: 123,
		});
		expect(rows[0].columns[0].title.props.children[2].props, "to equal", { value: 123 });

		expect(rows[1].columns[0].cellElement.props.children[0].props, "to equal", {
			value: 44,
		});
		expect(rows[1].columns[0].title.props.children[0].props, "to equal", { value: 44 });
		expect(rows[1].columns[0].cellElement.props.children[1], "to equal", " ");
		expect(rows[1].columns[0].title.props.children[1], "to equal", " ");
		expect(rows[1].columns[0].cellElement.props.children[2].props, "to equal", {
			value: 44,
		});
		expect(rows[1].columns[0].title.props.children[2].props, "to equal", { value: 44 });
	});

	it("build table rows as expected with select", () => {
		const changeEvent = () => console.log("just an event handler");

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
		expect(
			rows[0].columns[0].cellElement.props.checkboxProps.componentProps.get("value"),
			"to equal",
			true,
		);
		expect(
			rows[0].columns[0].cellElement.props.checkboxProps.componentProps.get("update"),
			"to equal",
			changeEvent,
		);
		expect(rows[0].columns[0].title, "to be null");

		expect(rows[1].columns[0].cellElement.props["data-row-id"], "to equal", "an_id2");
		expect(
			rows[1].columns[0].cellElement.props.checkboxProps.componentProps.get("value"),
			"to equal",
			false,
		);
		expect(
			rows[1].columns[0].cellElement.props.checkboxProps.componentProps.get("update"),
			"to equal",
			changeEvent,
		);
		expect(rows[1].columns[0].title, "to be null");
	});

	it("build table rows as expected with switch", () => {
		const changeEvent = () => console.log("just an event handler");

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

		const checkboxProps = new CheckboxProps();
		checkboxProps.set(CheckboxProps.propNames.update, changeEvent);
		checkboxProps.set(CheckboxProps.propNames.value, true);

		expect(headers.length, "to equal", 1);

		expect(rows.length, "to equal", 2);
		expect(rows[0].columns.length, "to equal", 1);
		expect(rows[0].element, "to equal", elements[0]);

		expect(rows[0].columns[0].cellElement.props, "to equal", {
			value: true,
			"data-row-id": "an_id1",
			onChange: changeEvent,
		});

		expect(rows[1].columns[0].cellElement.props, "to equal", {
			value: false,
			"data-row-id": "an_id2",
			onChange: changeEvent,
		});
	});

	it("build table rows as expected with switch caption", () => {
		const changeEvent = () => console.log("just an event handler");

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

		const checkboxProps = new CheckboxProps();
		checkboxProps.set(CheckboxProps.propNames.update, changeEvent);
		checkboxProps.set(CheckboxProps.propNames.value, true);

		expect(headers.length, "to equal", 1);

		expect(rows.length, "to equal", 2);
		expect(rows[0].columns.length, "to equal", 1);
		expect(rows[0].element, "to equal", elements[0]);

		expect(rows[0].columns[0].cellElement.props, "to equal", {
			value: true,
			"data-row-id": "an_id1",
			onChange: changeEvent,
			onCaption: messages.captionOn,
			offCaption: messages.captionOff,
		});

		expect(rows[1].columns[0].cellElement.props, "to equal", {
			value: false,
			"data-row-id": "an_id2",
			onChange: changeEvent,
			onCaption: messages.captionOn,
			offCaption: messages.captionOff,
		});
	});
});
