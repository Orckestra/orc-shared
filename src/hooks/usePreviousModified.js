import { useEffect, useRef } from "react";

const defaultPredicate = (previous, current) => {
	return previous !== undefined && previous !== null && previous !== current;
};

const usePreviousModified = (value, effectAction = null, predicate = defaultPredicate) => {
	const ref = useRef(value);

	const predicateResult = predicate(ref.current, value);

	useEffect(() => {
		if (effectAction != null && predicateResult) {
			effectAction(value, ref.current);
		}

		ref.current = value;
	}, [value]); // eslint-disable-line react-hooks/exhaustive-deps

	return predicateResult;
};

export default usePreviousModified;
