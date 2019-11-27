import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import { Ignore } from "unexpected-reaction";

export const getClassName = elm => {
	const renderer = new ShallowRenderer();
	return renderer.render(elm).props.className.split(" ")[0];
};

export const PropStruct = props => (
	<div>
		{Object.entries(props)
			.sort((a, b) => (a[0] > b[0] ? 1 : a[0] < b[0] ? -1 : 0))
			.map(([key, value]) =>
				value === undefined ? null : value === "__ignore" ? (
					<Ignore />
				) : (
					<p>
						{`${key}: `}
						{typeof value === "object" ? (
							<PropStruct {...value} />
						) : typeof value === "string" ? (
							`string "${value}"`
						) : (
							typeof value + " " + value
						)}
					</p>
				),
			)}
	</div>
);
