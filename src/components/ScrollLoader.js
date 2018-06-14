import React, { Children, cloneElement } from "react";
import styled from "styled-components";
import { withStateHandlers } from "recompose";
import { withContentRect } from "react-measure";
import { debounce } from "../utils";

const addPropsToChildren = (children, props) =>
	Children.map(children, child => cloneElement(child, props));

export const Scrollbox = styled.div`
	height: 100%;
	width: 100%;
	overflow-x: hidden;
	overflow-y: auto;
`;

export const ScrollTracker = withContentRect("bounds")(
	({ measureRef, onScroll, scrollTop, height, children }) => (
		<Scrollbox onScroll={onScroll} innerRef={measureRef}>
			{addPropsToChildren(children, { scrollTop, height })}
		</Scrollbox>
	),
);
ScrollTracker.displayName = "ScrollTracker";

const withScrollLoad = withStateHandlers(
	({ initialScrollTop = 0, initialHeight = 300 }) => ({
		scrollTop: initialScrollTop,
		height: initialHeight,
	}),
	{
		onScroll: (
			{ scrollTop },
			{
				onScroll = () => {},
				loadTrigger = 200,
				length = 0,
				latestPage = 1,
				pageLength = 20,
				scrollLoader,
			},
		) => event => {
			debounce(
				e => {
					if (
						// Are we scrolled far enough?
						e.target.scrollHeight -
							(e.target.scrollTop + e.target.offsetHeight) <
							loadTrigger &&
						// Are we already loading?
						length === latestPage * pageLength
					) {
						scrollLoader(latestPage);
					}
				},
				200,
				true,
			)(event);
			onScroll(event);
			return { scrollTop: event.target.scrollTop };
		},
		onResize: ({ height }) =>
			debounce(({ bounds }) => ({ height: bounds.height }), 100),
	},
);

const ScrollLoader = withScrollLoad(ScrollTracker);

export default ScrollLoader;
