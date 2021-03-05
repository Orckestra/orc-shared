import { useSelector } from "react-redux";
import { selectCurrentModuleName } from "./../selectors/navigation";
import { useDispatchWithModulesData } from "./../hooks/useDispatchWithModulesData";
import { setEditModelField, setEditModelFieldError } from "./../actions/view";
import { validationRules } from "../utils/modelValidationHelper";
import { useSelectorAndUnwrap } from "./useSelectorAndUnwrap";

// if you need to override default validation rules just pass new rules with default keys
// as properties of extendedValidationRules
export const useEditState = (entityId, sectionName, extendedValidationRules = {}) => {
	const currentModuleName = useSelector(selectCurrentModuleName);
	const dispatch = useDispatchWithModulesData();

	const mergedValidationRules = { ...validationRules, ...extendedValidationRules };

	const useFieldState = (keys, initialValue = "", errorTypes = []) => {
		const editState = useSelectorAndUnwrap(state =>
			state.getIn(["view", "edit", currentModuleName, entityId, sectionName, "model", ...keys]),
		) || { value: initialValue };

		const updateEditState = newValue => {
			dispatch(setEditModelField, [keys, newValue, initialValue, entityId, sectionName]);

			isEditStateValid(newValue);
		};

		const resetEditState = () => {
			dispatch(setEditModelField, [keys, initialValue, initialValue, entityId, sectionName]);
		};

		const isEditStateValid = value => {
			const valueToValidate = value ?? editState.value;
			let hasAnyValidationErrors = false;
			errorTypes.forEach(errorType => {
				const isValid = mergedValidationRules[errorType](valueToValidate);

				if (isValid === false) {
					dispatch(setEditModelFieldError, [keys, errorType, entityId, sectionName]);

					hasAnyValidationErrors = true;
					return;
				}
			});

			return !hasAnyValidationErrors;
		};

		return {
			state: editState,
			update: updateEditState,
			reset: resetEditState,
			isValid: isEditStateValid,
		};
	};

	return useFieldState;
};

export default useEditState;
