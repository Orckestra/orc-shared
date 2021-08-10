import { useCallback, useState } from "react";

const useInfiniteScroll = (entities, pageSize, countOffset = 0) => {
	const [currentPage, setCurrentPage] = useState(1);

	const count = Math.min(entities.length, pageSize * currentPage + countOffset);

	const visibleEntities = entities.slice(0, count);

	const scrollEvent = useCallback(
		evt => {
			if (
				evt.target.scrollHeight - (evt.target.scrollTop + evt.target.offsetHeight) < 100 &&
				visibleEntities.length === pageSize * currentPage + countOffset
			) {
				setCurrentPage(currentPage + 1);
			}
		},
		[setCurrentPage, currentPage, visibleEntities.length, countOffset, pageSize],
	);

	return [visibleEntities, scrollEvent];
};

export default useInfiniteScroll;
