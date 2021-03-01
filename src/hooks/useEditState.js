import { useSelector } from "react-redux";
import { unwrapImmutable } from "../utils";
import { selectCurrentModuleName, selectCurrentSectionName } from "./../selectors/navigation";
import { useDispatchWithModulesData } from "./../hooks/useDispatchWithModulesData";
import { setEditModelField, setEditModelFieldError } from "./../actions/view";
import { validationRules } from "../utils/modelValidationHelper";

export const useEditState = (entityId, keys, initialValue) => {
	const currentModuleName = useSelector(selectCurrentModuleName);
	const currentSectionName = useSelector(selectCurrentSectionName);
	const dispatch = useDispatchWithModulesData();

	const editState = unwrapImmutable(
		useSelector(state =>
			state.getIn(["view", "edit", currentModuleName, entityId, currentSectionName, "model", ...keys]),
		),
	);

	// if you need to override default validation rules just pass new rules with default keys
	// as properties of extendedValidationRules
	const updateEditState = (newValue, errorTypes = [], extendedValidationRules = {}) => {
		dispatch(setEditModelField, [keys, newValue, initialValue, entityId], {
			includeCurrentSection: true,
		});

		const mergedValidationRules = { ...validationRules, ...extendedValidationRules };

		errorTypes.forEach(errorType => {
			const isValid = mergedValidationRules[errorType](newValue);

			if (isValid === false) {
				dispatch(setEditModelFieldError, [keys, errorType, entityId], { includeCurrentSection: true });
			}
		});
	};

	const resetEditState = () =>
		dispatch(setEditModelField, [keys, initialValue, initialValue, entityId], {
			includeCurrentSection: true,
		});

	return [editState, updateEditState, resetEditState];
};

export default useEditState;
