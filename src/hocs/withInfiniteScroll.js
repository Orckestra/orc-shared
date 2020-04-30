import React, { useState, useCallback } from "react";
import { debounce, memoize } from "../utils";

const getScrollChecker = memoize(
	(scrollLoader, loadTrigger, length, latestPage, pageLength) =>
		debounce(
			event => {
				if (
					// Are we scrolled far enough?
					event.target.scrollHeight -
						(event.target.scrollTop + event.target.offsetHeight) <
						loadTrigger &&
					// Are we already loading?
					length === latestPage * pageLength
				) {
					scrollLoader(latestPage + 1);
				}
			},
			200,
			true,
		),
);

export const getOnScroll = memoize((props, setScroll) => {
	const {
		onScroll = () => {},
		scrollLoader,
		loadTrigger = 200,
		length = 0,
		latestPage = 1,
		pageLength = 20,
	} = props;
	const scrollCheck = getScrollChecker(
		scrollLoader,
		loadTrigger,
		length,
		latestPage,
		pageLength,
	);
	return event => {
		scrollCheck(event);
		onScroll(event);
		setScroll(event.target.scrollTop);
	};
});

export const withInfiniteScroll = Comp => ({ initialScrollTop = 0, ...props }) => {
	const [scrollTop, setScroll] = useState(initialScrollTop);
	const { onScroll, scrollLoader, loadTrigger, length, latestPage, pageLength } = props;
	const scrollHandler = useCallback(getOnScroll(props, setScroll), [
		setScroll,
		onScroll,
		scrollLoader,
		loadTrigger,
		length,
		latestPage,
		pageLength,
	]);
	return <Comp {...props} onScroll={scrollHandler} scrollTop={scrollTop} virtual />;
};

export default withInfiniteScroll;
