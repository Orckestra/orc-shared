import { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectCurrentModuleName } from "./../selectors/navigation";
import { useDispatchWithModulesData } from "./../hooks/useDispatchWithModulesData";
import {
	setEditModelField,
	setEditModelFieldError,
	removeEditModelFieldError,
	removeEditModelField,
	removeEditModel,
} from "./../actions/view";
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

	const useFieldState = (
		keys,
		initialValue = "",
		errorTypes = [],
		saveInitialValueToEditState = false,
		validateInitialValueAfterSave = false,
		dependencies = {},
	) => {
		const stateValue = useSelectorAndUnwrap(state =>
			state.getIn(["view", "edit", currentModuleName, entityId, sectionName, "model", ...keys]),
		);

		const editState = stateValue || { value: initialValue };

		const isEditStateValid = useCallback(
			value => {
				const valueToValidate = value ?? editState.value;
				let hasAnyValidationErrors = false;
				errorTypes.forEach(errorType => {
					const isValid = mergedValidationRules[errorType](valueToValidate, dependencies);

					if (isValid === false) {
						dispatchWithModulesData(setEditModelFieldError, [keys, errorType, entityId, sectionName]);

						hasAnyValidationErrors = true;
						return;
					}
				});

				return !hasAnyValidationErrors;
			},
			[editState.value, dependencies, errorTypes, keys],
		);

		useEffect(() => {
			if (saveInitialValueToEditState && stateValue == null) {
				dispatchWithModulesData(setEditModelField, [keys, initialValue, initialValue, entityId, sectionName]);

				if (validateInitialValueAfterSave) {
					isEditStateValid(initialValue);
				}
			}
		}, [initialValue, keys, saveInitialValueToEditState, validateInitialValueAfterSave, stateValue, isEditStateValid]);

		const updateEditState = newValue => {
			dispatchWithModulesData(setEditModelField, [keys, newValue, initialValue, entityId, sectionName]);

			isEditStateValid(newValue);
		};

		const resetEditState = () => {
			dispatchWithModulesData(setEditModelField, [keys, initialValue, initialValue, entityId, sectionName]);
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

		const getEditStateValue = (path = []) => {
			const keyPath = path.join(".");
			const value = stateValue?.value ?? initialValue;
			const resultValue = mapModifiedData(value);
			const result = !path.length ? resultValue : get(resultValue, keyPath, resultValue);

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

			for (let i = 0; i < path.length; i++) {
				result.push(path[i]);
				if (i !== path.length - 1) {
					valueItem = checkPath(valueItem[path[i]]);
				}
			}

			return result;
		};

		const hasAnyValidationErrors = (value, path, errorTypes, dependencies) => {
			let hasAnyValidationErrors = false;
			errorTypes.forEach(errorType => {
				const isValid = mergedValidationRules[errorType](value, dependencies);

				if (isValid === false) {
					dispatchWithModulesData(setEditModelFieldError, [path, errorType, entityId, sectionName]);

					hasAnyValidationErrors = true;
					return;
				} else {
					dispatchWithModulesData(removeEditModelFieldError, [path, entityId, sectionName]);
				}
			});

			return hasAnyValidationErrors;
		};

		const updateEditState = (newValue, path = [], errorTypes = [], dependencies = {}) => {
			const pathToField = getValidPath(path);
			const fullPath = !path.length ? [...keys] : [...keys, "value", ...pathToField];

			const initialFieldValue = !path.length ? initialValue : get(initialValue, pathToField);

			dispatchWithModulesData(setEditModelField, [fullPath, newValue, initialFieldValue, entityId, sectionName]);

			hasAnyValidationErrors(newValue, fullPath, errorTypes, dependencies);
		};

		const deleteEditState = (path = []) => {
			const fullPath = !path.length ? [...keys] : [...keys, "value", ...getValidPath(path)];

			if (path.length === 0) {
				dispatchWithModulesData(removeEditModel, [fullPath, entityId, sectionName]);
				return;
			}

			if (path.length > 1) {
				path.pop();
				const keyPath = path.join(".");
				return dispatchWithModulesData(removeEditModelField, [
					fullPath,
					get(initialValue, keyPath),
					entityId,
					sectionName,
				]);
			}

			dispatchWithModulesData(removeEditModelField, [fullPath, initialValue, entityId, sectionName]);
		};

		const resetEditState = (path = []) => {
			const fullPath = !path.length ? [...keys] : [...keys, "value", ...getValidPath(path)];
			dispatchWithModulesData(setEditModelField, [fullPath, initialValue, initialValue, entityId, sectionName]);
		};

		const isEditStateValid = (value, path = [], errorTypes = [], dependencies = {}) => {
			const pathToField = getValidPath(path);
			const fullValue = value ?? get(stateValue?.value ?? initialValue, pathToField);
			const fullPath = !path.length ? [...keys] : [...keys, "value", ...pathToField];

			if (fullValue != null && (typeof fullValue !== "object" || Array.isArray(fullValue))) {
				dispatchWithModulesData(setEditModelField, [fullPath, fullValue, fullValue, entityId, sectionName]);
			}

			const valueToValidate = value ?? getEditStateValue(path);
			const hasValidationErrors = hasAnyValidationErrors(valueToValidate, fullPath, errorTypes, dependencies);

			return !hasValidationErrors;
		};

		const getError = (path = []) => {
			const validPath = getValidPath(path);
			const keyPath = validPath.join(".");

			if (!path.length && has(stateValue, "error")) return stateValue.error;

			const value = stateValue?.value ?? initialValue;
			const result = !path.length ? value : get(value, keyPath);

			return result?.error;
		};

		const getEditState = (path = []) => {
			const keyPath = path.join(".");
			const value = stateValue?.value ?? initialValue;
			return !path.length ? value : get(value, keyPath);
		};

		return {
			getStateValue: getEditStateValue,
			update: updateEditState,
			reset: resetEditState,
			isValid: isEditStateValid,
			getError: getError,
			delete: deleteEditState,
			getState: getEditState,
		};
	};

	return useFieldState;
};

export default useEditState;
