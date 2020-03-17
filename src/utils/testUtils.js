import React from "react";
import { isStyledComponent } from "styled-components";
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

export const getElmClasses = (reactElm, container) => {
	const domElm = mount(reactElm, container ? { container } : undefined);
	const classes = domElm.getAttribute("class");
	if (!classes) {
		throw new Error(
			"Class name not found in <" + (reactElm.type.name || reactElm.type) + " />",
		);
	}
	return classes.split(" ");
};

export const getClassName = (reactElm, index = 0, container) => {
	const classes = getElmClasses(reactElm, container);
	return classes[index] || "";
};

export const getClassSelector = (elm, index, container) => {
	if (index < 0) {
		return "." + getElmClasses(elm, container).join(".");
	} else {
		const className = getClassName(elm, index, container) || "";
		return className && "." + className;
	}
};

const scClassPattern = /-(?:-?[0-9a-z]){6}/i;
export const getStyledClassSelector = (reactElm, container) => {
	if (!isStyledComponent(reactElm.type)) {
		throw new Error(
			"<" + (reactElm.type.name || reactElm.type) + " /> is not a styled component",
		);
	}
	const classes = getElmClasses(reactElm, container).filter(cls =>
		scClassPattern.test(cls),
	);
	// Last classname is most specific - subject to change!
	const className = classes[classes.length - 1];
	return "." + className;
};

export const firstItemComparator = (a, b) => (a[0] > b[0] ? 1 : a[0] < b[0] ? -1 : 0);

export const PropStruct = React.forwardRef((props, ref) => (
	// TODO: Handle refs sensibly instead of ignoring?
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
));
