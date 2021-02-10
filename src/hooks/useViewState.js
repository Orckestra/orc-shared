import { useSelector, useDispatch } from "react-redux";
import { unwrapImmutable } from "../utils";
import { setValue, setStateField } from "../actions/view";

const useViewState = name => {
	const viewState = unwrapImmutable(useSelector(state => state.getIn(["view", name]))) || {};
	const dispatch = useDispatch();
	const updateViewState = (fieldName, value) => dispatch(setStateField(name, fieldName, value));
	const resetViewState = defaultValue => dispatch(setValue(name, defaultValue || {}));
	return [viewState, updateViewState, resetViewState];
};

export default useViewState;
