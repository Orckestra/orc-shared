import React from "react";
import { mount } from "react-dom-testing";
import { Ignore } from "unexpected-reaction";
const sinon = require("sinon");

/* istanbul ignore next */
export const spyOnConsole = (spyNames = ["log", "warn", "error"]) => {
	let spiedFuncs;
	beforeEach(() => {
		spiedFuncs = spyNames.map(funcName => {
			const func = sinon.spy().named("console." + funcName);
			const oldFunc = console[funcName];
			console[funcName] = func;
			return oldFunc;
		});
	});
	afterEach(() => {
		spiedFuncs.forEach((func, index) => {
			const name = spyNames[index];
			console[name] = func;
		});
	});
};

const getElmClasses = reactElm => {
	const domElm = mount(reactElm);
	const classes = domElm.getAttribute("class");
	if (!classes) {
		throw new Error(
			"Class name not found in <" +
				(reactElm.type.name || reactElm.type) +
				" />",
		);
	}
	return classes;
};

export const getClassName = (elm, index = 0) => {
	const classes = getElmClasses(elm);
	return classes.split(" ")[index];
};

export const getClassSelector = elm => {
	const classes = getElmClasses(elm);
	return "." + classes.split(" ").join(".");
};

export const firstItemComparator = (a, b) =>
	a[0] > b[0] ? 1 : a[0] < b[0] ? -1 : 0;

export const PropStruct = props => (
	<dl id={props.id}>
		{Object.entries(props)
			.sort(firstItemComparator)
			.map(([key, value]) =>
				value === undefined || value === null
					? null
					: value === "__ignore"
					? [<Ignore key={"dt-" + key} />, <Ignore key={"dd-" + key} />]
					: [
							<dt key={"dt-" + key}>{`${key}:`}</dt>,
							<dd key={"dd-" + key}>
								{key === "children" ? (
									value
								) : typeof value === "object" ? (
									value["$$typeof"] &&
									value["$$typeof"] === Symbol.for("react.element") ? (
										"React <" + (value.type.name || value.type) + ">"
									) : (
										<PropStruct {...value} />
									)
								) : typeof value === "function" ? (
									"Function"
								) : typeof value === "string" ? (
									`string "${value}"`
								) : typeof value === "symbol" ? (
									`symbol ${value.toString()}`
								) : (
									typeof value + " " + value
								)}
							</dd>,
					  ],
			)}
	</dl>
);
