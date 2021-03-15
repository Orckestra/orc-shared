import { useSelector } from "react-redux";
import { validationRules } from "~/utils/modelValidationHelper";
import { getModifiedModels } from "~/selectors/view";
import { setEditModelField, setEditModelFieldError } from "~/actions/view";
import { useDispatchWithModulesData } from "./../hooks/useDispatchWithModulesData";

/* This hook is used when a component has a dynamic number of fields that can be edited (e.g.: Orders' Custom Configuration Parameters).
   It calls `useSelector` only once and handles the fields' states itself using in a similar structure to useEditState.

   This method expects initialValues to be an object with the format below. The extended validation rules uses a different function than the
   usual useEditState: instead of receiving only the `value` it receives `value, id, fieldName`.
   {
        id1: {
            prop1: 'another value',
            prop2: 'some value'
        },
        id2: {
            prop1: 'another value',
            prop2: 'some value'
        }
   }
*/
const useMultipleFieldEditState = (entityId, sectionName, initialValues, extendedValidationRules = {}) => {
	const dispatch = useDispatchWithModulesData();
	const mergedValidationRules = { ...validationRules, ...extendedValidationRules };
	const modifiedStates = useSelector(getModifiedModels(entityId))[sectionName] || {};

	const useDynamicFieldState = (id, fieldName, errorTypes = []) => {
		const keys = [id, fieldName];

		const initialValue = initialValues[id]?.[fieldName] ?? "";
		const editState = modifiedStates[id]?.[fieldName] ?? {};
		editState.value = editState.value ?? initialValue;

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
				const isValid = mergedValidationRules[errorType](valueToValidate, id, fieldName);

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

	return [useDynamicFieldState, modifiedStates];
};

export default useMultipleFieldEditState;
