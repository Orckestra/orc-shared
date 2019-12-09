import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import { Ignore } from "unexpected-reaction";
const sinon = require("sinon");

const spyNames = ["log", "warn", "error"];
let spiedFuncs;
export const spyOnConsole = () => {
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

export const getClassName = elm => {
	const renderer = new ShallowRenderer();
	return renderer.render(elm).props.className.split(" ")[0];
};

export const firstItemComparator = (a, b) =>
	a[0] > b[0] ? 1 : a[0] < b[0] ? -1 : 0;

export const PropStruct = props => (
	<dl>
		{Object.entries(props)
			.sort(firstItemComparator)
			.map(([key, value]) =>
				value === undefined
					? null
					: value === "__ignore"
					? [<Ignore key={"dt-" + key} />, <Ignore key={"dd-" + key} />]
					: [
							<dt key={"dt-" + key}>{`${key}:`}</dt>,
							<dd key={"dd-" + key}>
								{typeof value === "object" ? (
									<PropStruct {...value} />
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
