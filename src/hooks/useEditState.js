import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectCurrentModuleName } from "./../selectors/navigation";
import { useDispatchWithModulesData } from "./../hooks/useDispatchWithModulesData";
import { setEditModelField, setEditModelFieldError } from "./../actions/view";
import { validationRules } from "../utils/modelValidationHelper";
import { useSelectorAndUnwrap } from "./useSelectorAndUnwrap";
import { get } from "lodash";

// if you need to override default validation rules just pass new rules with default keys
// as properties of extendedValidationRules
export const useEditState = (entityId, sectionName, extendedValidationRules = {}) => {
	const currentModuleName = useSelector(selectCurrentModuleName);
	const dispatchWithModulesData = useDispatchWithModulesData();

	const mergedValidationRules = { ...validationRules, ...extendedValidationRules };

	const useFieldState = (keys, initialValue = "", errorTypes = [], saveInitialValueToEditState = false) => {
		const stateValue = useSelectorAndUnwrap(state =>
			state.getIn(["view", "edit", currentModuleName, entityId, sectionName, "model", ...keys]),
		);

		useEffect(() => {
			if (saveInitialValueToEditState && stateValue == null) {
				dispatchWithModulesData(setEditModelField, [keys, initialValue, initialValue, entityId, sectionName]);
			}
		}, [initialValue, keys, saveInitialValueToEditState, stateValue]);

		const editState = stateValue || { value: initialValue };

		const updateEditState = newValue => {
			dispatchWithModulesData(setEditModelField, [keys, newValue, initialValue, entityId, sectionName]);

			isEditStateValid(newValue);
		};

		const resetEditState = () => {
			dispatchWithModulesData(setEditModelField, [keys, initialValue, initialValue, entityId, sectionName]);
		};

		const isEditStateValid = value => {
			const valueToValidate = value ?? editState.value;
			let hasAnyValidationErrors = false;
			errorTypes.forEach(errorType => {
				const isValid = mergedValidationRules[errorType](valueToValidate);

				if (isValid === false) {
					dispatchWithModulesData(setEditModelFieldError, [keys, errorType, entityId, sectionName]);

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

// if you need to override default validation rules just pass new rules with default keys
// as properties of extendedValidationRules
export const useDynamicEditState = (entityId, sectionName, extendedValidationRules = {}) => {
	const currentModuleName = useSelector(selectCurrentModuleName);
	const dispatchWithModulesData = useDispatchWithModulesData();

	const mergedValidationRules = { ...validationRules, ...extendedValidationRules };

	const useFieldState = (keys, initialValue = "", saveInitialValueToEditState = false) => {
		const stateValue = useSelectorAndUnwrap(state =>
			state.getIn(["view", "edit", currentModuleName, entityId, sectionName, "model", ...keys]),
		);

		useEffect(() => {
			if (saveInitialValueToEditState && stateValue == null) {
				dispatchWithModulesData(setEditModelField, [keys, initialValue, initialValue, entityId, sectionName]);
			}
		}, [initialValue, keys, saveInitialValueToEditState, stateValue]);

		const editState = (path = []) => {
			const keyPath = path.join(".");

			return get(stateValue?.value, keyPath) || { value: initialValue };
		};

		const updateEditState = (newValue, path = [], errorTypes = []) => {
			const fullPath = path.length === 0 ? [...keys] : [...keys, "value", ...path];

			dispatchWithModulesData(setEditModelField, [fullPath, newValue, initialValue, entityId, sectionName]);

			isEditStateValid(newValue, path, errorTypes);
		};

		const resetEditState = (path = []) => {
			const fullPath = path.length === 0 ? [...keys] : [...keys, "value", ...path];
			dispatchWithModulesData(setEditModelField, [fullPath, initialValue, initialValue, entityId, sectionName]);
		};

		const isEditStateValid = (value, path = [], errorTypes = []) => {
			const valueToValidate = value ?? editState(path).value;
			let hasAnyValidationErrors = false;
			const fullPath = path.length === 0 ? [...keys] : [...keys, "value", ...path];

			errorTypes.forEach(errorType => {
				const isValid = mergedValidationRules[errorType](valueToValidate);

				if (isValid === false) {
					dispatchWithModulesData(setEditModelFieldError, [fullPath, errorType, entityId, sectionName]);

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
