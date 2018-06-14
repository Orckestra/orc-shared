import { compose, withStateHandlers } from "recompose";
import { debounce } from "../utils";
import withScrollBox from "./withScrollBox";

export const withInfiniteScroll = withStateHandlers(
	({ initialScrollTop = 0 }) => ({
		scrollTop: initialScrollTop,
		virtual: true,
	}),
	{
		onScroll: (
			{ scrollTop },
			{
				onScroll = () => {},
				scrollLoader,
				loadTrigger = 200,
				length = 0,
				latestPage = 1,
				pageLength = 20,
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
						scrollLoader(latestPage + 1);
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

export default compose(
	withInfiniteScroll,
	withScrollBox,
);
