import { withStateHandlers } from "recompose";
import { debounce } from "../utils";

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
		) => {
			const scrollCheck = debounce(
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
			);
			return event => {
				scrollCheck(event);
				onScroll(event);
				return { scrollTop: event.target.scrollTop };
			};
		},
	},
);

export default withInfiniteScroll;
