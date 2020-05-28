import React, { useRef, useCallback, useEffect } from "react";

const descendsFrom = (descendant, ancestor) => {
	if (descendant === ancestor) {
		return true;
	} else if (descendant === document.body || !descendant) {
		return false;
	} else {
		return descendsFrom(descendant.parentNode, ancestor);
	}
};

const withClickOutside = Comp => ({ onClickOutside = () => {}, ...props }) => {
	const elmRef = useRef(null);
	const handler = useCallback(
		event => {
			if (!descendsFrom(event.target, elmRef.current)) {
				onClickOutside(event);
			}
		},
		[onClickOutside, elmRef],
	);
	useEffect(() => {
		document.addEventListener("click", handler, true);
		return () => document.removeEventListener("click", handler, true);
	}, [handler, elmRef]);
	return <Comp ref={elmRef} {...props} />;
};

export default withClickOutside;
