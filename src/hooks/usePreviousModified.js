import { useEffect, useRef } from "react";

const defaultPredicate = (previous, current) => {
	return previous !== undefined && previous !== null && previous !== current;
};

const usePreviousModified = (
	value,
	effectAction = null,
	predicate = defaultPredicate,
) => {
	const ref = useRef();

	useEffect(() => {
		if (effectAction != null) effectAction(value);

		ref.current = value;
	}, [value]);

	return predicate(ref.current, value);
};

export default usePreviousModified;
