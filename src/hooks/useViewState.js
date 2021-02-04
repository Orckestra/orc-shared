import { useSelector, useDispatch } from "react-redux";
import { unwrapImmutable } from "../utils";
import { setValue, setStateField } from "../actions/view";
import { selectCurrentModuleName, selectCurrentSectionName } from "./../selectors/navigation";
import { useDispatchWithModulesData } from "./../hooks/useDispatchWithModulesData";
import { setEditModelField } from "./../actions/view";

const useViewState = name => {
	const viewState = unwrapImmutable(useSelector(state => state.getIn(["view", name]))) || {};
	const dispatch = useDispatch();
	const updateViewState = (fieldName, value) => dispatch(setStateField(name, fieldName, value));
	const resetViewState = defaultValue => dispatch(setValue(name, defaultValue || {}));
	return [viewState, updateViewState, resetViewState];
};

export const useEditState = (entityId, keys, initialValue) => {
	const currentModuleName = useSelector(selectCurrentModuleName);
	const currentSectionName = useSelector(selectCurrentSectionName);
	const dispatch = useDispatchWithModulesData();

	const editState = unwrapImmutable(
		useSelector(state =>
			state.getIn(["view", "edit", currentModuleName, entityId, currentSectionName, "model", ...keys]),
		),
	);

	const updateEditState = newValue => {
		console.log(newValue);
		dispatch(setEditModelField, [keys, newValue, initialValue, entityId], {
			includeCurrentSection: true,
		});
	};

	const resetEditState = () =>
		dispatch(setEditModelField, [keys, initialValue, initialValue, entityId], {
			includeCurrentSection: true,
		});

	return [editState, updateEditState, resetEditState];
};

export default useViewState;
