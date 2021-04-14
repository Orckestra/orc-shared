import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectCurrentModuleName } from "./../selectors/navigation";
import { useDispatchWithModulesData } from "./../hooks/useDispatchWithModulesData";
import { setEditModelField, setEditModelFieldError } from "./../actions/view";
import { validationRules } from "../utils/modelValidationHelper";
import { useSelectorAndUnwrap } from "./useSelectorAndUnwrap";
import { get, has, cloneDeep } from "lodash";
import { mapModifiedData } from "../utils/mapHelper";

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

		const getEditState = (path = []) => {
			const keyPath = path.join(".");
			const value = stateValue?.value ?? initialValue;
			const resultValue = mapModifiedData(value);
			const result = path.length === 0 ? resultValue : get(resultValue, keyPath, resultValue);

			return result;
		};

		const getValidPath = path => {
			let result = [];
			const value = stateValue?.value ?? initialValue;

			const checkPath = obj => {
				if (has(obj, "value")) {
					result.push("value");
					return obj.value;
				}
				return obj;
			};

			let valueItem = cloneDeep(value);

			path.forEach((item, index) => {
				result.push(item);
				if (index !== path.length - 1) {
					valueItem = checkPath(valueItem[item]);
				}
			});

			return result;
		};

		const hasAnyValidationErrors = (value, path, errorTypes) => {
			let hasAnyValidationErrors = false;
			errorTypes.forEach(errorType => {
				const isValid = mergedValidationRules[errorType](value);

				if (isValid === false) {
					dispatchWithModulesData(setEditModelFieldError, [path, errorType, entityId, sectionName]);

					hasAnyValidationErrors = true;
					return;
				}
			});

			return hasAnyValidationErrors;
		};

		const updateEditState = (newValue, path = [], errorTypes = []) => {
			const fullPath = path.length === 0 ? [...keys] : [...keys, "value", ...getValidPath(path)];

			dispatchWithModulesData(setEditModelField, [fullPath, newValue, initialValue, entityId, sectionName]);

			hasAnyValidationErrors(newValue, fullPath, errorTypes);
		};

		const resetEditState = (path = []) => {
			const fullPath = path.length === 0 ? [...keys] : [...keys, "value", ...getValidPath(path)];
			dispatchWithModulesData(setEditModelField, [fullPath, initialValue, initialValue, entityId, sectionName]);
		};

		const isEditStateValid = (value, path = [], errorTypes = []) => {
			const validPath = getValidPath(path);
			const valueToValidate = value ?? getEditState(validPath);
			const fullPath = path.length === 0 ? [...keys] : [...keys, "value", ...validPath];

			const hasValidationErrors = hasAnyValidationErrors(valueToValidate, fullPath, errorTypes);

			return !hasValidationErrors;
		};

		return {
			getState: getEditState,
			update: updateEditState,
			reset: resetEditState,
			isValid: isEditStateValid,
		};
	};

	return useFieldState;
};

export default useEditState;
