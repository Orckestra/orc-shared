import { useSelector, useDispatch } from "react-redux";
import { unwrapImmutable } from "../utils";
import { setStateField } from "../actions/view";

const useViewState = name => {
	const viewState =
		unwrapImmutable(useSelector(state => state.getIn(["view", name]))) || {};
	const dispatch = useDispatch();
	const updateViewState = (fieldName, value) =>
		dispatch(setStateField(name, fieldName, value));
	return [viewState, updateViewState];
};

export default useViewState;
