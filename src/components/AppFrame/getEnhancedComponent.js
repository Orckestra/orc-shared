// Memoized factory function to prevent wasting time recreating the same component
const getEnhancedComponent = () => {
	const memo = {};
	return (hoc, comp) => {
		if (
			memo.lastReturn &&
			memo.lastParams &&
			memo.lastParams[0] === hoc &&
			memo.lastParams[1] === comp
		) {
			return memo.lastReturn;
		} else {
			memo.lastParams = [hoc, comp];
			const enhancedComp = hoc(comp);
			memo.lastReturn = enhancedComp;
			return enhancedComp;
		}
	};
};

export default getEnhancedComponent;
