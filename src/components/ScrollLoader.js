import styled from "styled-components";
import { withHandlers } from "recompose";
import { debounce } from "../utils";

export const Scrollbox = styled.div`
	height: 100%;
	width: 100%;
	overflow-x: hidden;
	overflow-y: auto;
`;

const ScrollLoader = withHandlers({
	onScroll: ({
		loadTrigger = 200,
		length = 0,
		latestPage = 1,
		pageLength = 20,
		scrollLoader,
	}) =>
		debounce(
			e => {
				if (
					// Are we scrolled far enough?
					e.target.scrollHeight - (e.target.scrollTop + e.target.offsetHeight) <
						loadTrigger &&
					// Are we already loading?
					length === latestPage * pageLength
				) {
					scrollLoader(latestPage);
				}
			},
			200,
			true,
		),
})(Scrollbox);

export default ScrollLoader;
