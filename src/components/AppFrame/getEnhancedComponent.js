// @flow
import type { ComponentType } from "react";

type Comp = ComponentType<*>;
export type HOC<InProps, OutProps> = (
	ComponentType<InProps>,
) => ComponentType<OutProps>;
export type BaseHOC = HOC<*, *>;
type Memo = {
	lastParams?: [BaseHOC, Comp],
	lastReturn?: Comp,
};

// Memoized factory function to prevent wasting time recreating the same component
const getEnhancedComponent = () => {
	const memo: Memo = {};
	return (hoc: BaseHOC, comp: Comp): Comp => {
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
