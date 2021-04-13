import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { unwrapImmutable } from "../utils";
import { setValue, setStateField } from "../actions/view";

const useViewState = name => {
	const viewState = unwrapImmutable(useSelector(state => state.getIn(["view", name]))) || {};
	const dispatch = useDispatch();
	const updateViewState = useCallback((fieldName, value) => dispatch(setStateField(name, fieldName, value)), [
		dispatch,
		name,
	]);
	const resetViewState = useCallback(defaultValue => dispatch(setValue(name, defaultValue || {})), [dispatch, name]);
	return [viewState, updateViewState, resetViewState];
};

export default useViewState;
