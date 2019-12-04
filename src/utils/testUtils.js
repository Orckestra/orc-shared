import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import { Ignore } from "unexpected-reaction";

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
					? [<Ignore />, <Ignore />]
					: [
							<dt>{`${key}:`}</dt>,
							<dd>
								{typeof value === "object" ? (
									<PropStruct {...value} />
								) : typeof value === "function" ? (
									"Function"
								) : typeof value === "string" ? (
									`string "${value}"`
								) : (
									typeof value + " " + value
								)}
								{"\n"}
							</dd>,
					  ],
			)}
	</dl>
);
