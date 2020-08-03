import React from "react";
import { isStyledComponent } from "styled-components";
import { mount } from "unexpected-reaction";
import { Ignore } from "unexpected-reaction";
import createThemes from "./../components/MaterialUI/muiThemes";
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

export const getStyledClassSelector = elm => {
	const component = elm.type || elm;
	if (!isStyledComponent(component)) {
		throw new Error(
			"<" + (component.name || component) + " /> is not a styled component",
		);
	}
	// Styled component toString() function returns a stable class name
	return component.toString();
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

export const ignoreConsoleError = func => {
	jest.spyOn(console, "error");
	console.error.mockImplementation(() => { });

	func();

	console.error.mockRestore();
};

export const createMuiTheme = () => {
	const applicationTheme = {
		primary: { main: "#1F5B7F" },
	};

	const themeDefinition = {
		palette: {
			primary: {
				lighter: "#f5f5f5",
				light: "#CCC",
				main: "#232323",
				dark: "#000",
				contrastText: "#fff",
			},
		}
	};

	const themes = createThemes(applicationTheme, themeDefinition);

	const muiTheme = themes.muiTheme;

	return muiTheme;
};