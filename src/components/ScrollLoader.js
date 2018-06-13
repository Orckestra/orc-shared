import React, { Children, cloneElement } from "react";
import styled from "styled-components";
import { withStateHandlers } from "recompose";
import { debounce } from "../utils";

const addPropsToChildren = (children, props) =>
	Children.map(children, child => cloneElement(child, props));

export const Scrollbox = styled.div`
	height: 100%;
	width: 100%;
	overflow-x: hidden;
	overflow-y: auto;
`;

export const ScrollTracker = ({ onScroll, scrollTop, children }) => (
	<Scrollbox onScroll={onScroll}>
		{addPropsToChildren(children, { scrollTop })}
	</Scrollbox>
);
ScrollTracker.displayName = "ScrollTracker";

const withScrollLoad = withStateHandlers(
	({ initialScrollTop = 0 }) => ({
		scrollTop: initialScrollTop,
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
	},
);

const ScrollLoader = withScrollLoad(ScrollTracker);

export default ScrollLoader;
