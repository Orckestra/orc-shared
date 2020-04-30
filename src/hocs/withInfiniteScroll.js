import React, { useState, useCallback } from "react";
import { debounce } from "../utils";

export const getOnScroll = (
	_,
	{
		onScroll = () => {},
		scrollLoader,
		loadTrigger = 200,
		length = 0,
		latestPage = 1,
		pageLength = 20,
	},
) => {
	const scrollCheck = debounce(
		event => {
			if (
				// Are we scrolled far enough?
				event.target.scrollHeight - (event.target.scrollTop + event.target.offsetHeight) <
					loadTrigger &&
				// Are we already loading?
				length === latestPage * pageLength
			) {
				scrollLoader(latestPage + 1);
			}
		},
		200,
		true,
	);
	return event => {
		scrollCheck(event);
		onScroll(event);
		return { scrollTop: event.target.scrollTop };
	};
};

const wrapGetOnScroll = (props, setScroll) => {
	const onScroll = getOnScroll(null, props);
	return event => {
		const { scrollTop } = onScroll(event);
		setScroll(scrollTop);
	};
};

export const withInfiniteScroll = Comp => ({ initialScrollTop = 0, ...props }) => {
	const [scrollTop, setScroll] = useState(initialScrollTop);
	const {
		onScroll = () => {},
		scrollLoader,
		loadTrigger = 200,
		length = 0,
		latestPage = 1,
		pageLength = 20,
	} = props;
	const scrollHandler = useCallback(
		wrapGetOnScroll(
			{
				onScroll,
				scrollLoader,
				loadTrigger,
				length,
				latestPage,
				pageLength,
			},
			setScroll,
		),
		[setScroll, onScroll, scrollLoader, loadTrigger, length, latestPage, pageLength],
	);
	return <Comp {...props} onScroll={scrollHandler} scrollTop={scrollTop} virtual />;
};

export default withInfiniteScroll;
