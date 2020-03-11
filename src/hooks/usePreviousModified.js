import { useEffect, useRef } from "react";

const usePreviousModified = (value, predicate) => {
	const ref = useRef();

	useEffect(() => {
		ref.current = value;
	}, [value]);

	return predicate
		? predicate(ref.current, value)
		: ref.current !== undefined && ref.current !== null && ref.current !== value;
};

export default usePreviousModified;
