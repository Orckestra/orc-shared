import { useEffect } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";

let hasWarned = false;
const noCutout = () => {
	if (!hasWarned) {
		console.warn("useLoader hook called without cutout selector, loader will never be dispatched.");
		hasWarned = true;
	}
	return true;
};

const useLoader = (loadActions, cutoutSelector = noCutout) => {
	const dispatch = useDispatch();
	const cutout = !!useSelector(cutoutSelector, shallowEqual);
	useEffect(() => {
		const actions = Array.isArray(loadActions) ? loadActions : [loadActions];
		if (!cutout) {
			actions.forEach(action => dispatch(action));
		}
	}, [dispatch, loadActions, cutout]);
};

export default useLoader;
