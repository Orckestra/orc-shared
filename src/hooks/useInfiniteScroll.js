import { useCallback, useState } from "react";

const useInfiniteScroll = (entities, pageSize, countOffset = 0) => {
	const [currentPage, setCurrentPage] = useState(1);

	console.log("Generate Count with ::: ", currentPage);

	const count = Math.min(entities.length, pageSize * currentPage + countOffset);

	const visibleEntities = entities.slice(0, count);

	const scrollEvent = useCallback(
		evt => {
			if (
				evt.target.scrollHeight - (evt.target.scrollTop + evt.target.offsetHeight) < 100 &&
				visibleEntities.length === pageSize * currentPage + countOffset
			) {
				console.log(currentPage);

				setCurrentPage(currentPage + 1);
			}
		},
		[setCurrentPage, currentPage, visibleEntities.length],
	);

	return [visibleEntities, scrollEvent];
};

export default useInfiniteScroll;
