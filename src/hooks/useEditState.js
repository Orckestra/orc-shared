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
		preValidateInitialValue = false,
		fieldDependencies = {},
	) => {
		const stateValue = useSelectorAndUnwrap(state =>
			state.getIn(["view", "edit", currentModuleName, entityId, sectionName, "model", ...keys]),
		);

		const editState = stateValue || { value: initialValue };

		const isEditStateValid = useCallback(
			(value, dependencies = {}) => {
				const valueToValidate = value ?? editState.value;
				let hasAnyValidationErrors = false;
				errorTypes.forEach(errorType => {
					const isValid = mergedValidationRules[errorType](valueToValidate, {
						...fieldDependencies,
						...dependencies,
					});

					if (isValid === false && hasAnyValidationErrors === false) {
						dispatchWithModulesData(setEditModelFieldError, [keys, errorType, entityId, sectionName]);

						hasAnyValidationErrors = true;
					}
				});

				return !hasAnyValidationErrors;
			},
			[editState.value, fieldDependencies, errorTypes, keys],
		);

		useEffect(() => {
			if (saveInitialValueToEditState && stateValue == null) {
				dispatchWithModulesData(setEditModelField, [keys, initialValue, initialValue, entityId, sectionName]);

				if (preValidateInitialValue) {
					isEditStateValid(initialValue);
				}
			}
		}, [initialValue, keys, saveInitialValueToEditState, preValidateInitialValue, stateValue, isEditStateValid]);

		const updateEditState = (newValue, dependencies) => {
			dispatchWithModulesData(setEditModelField, [keys, newValue, initialValue, entityId, sectionName]);

			isEditStateValid(newValue, dependencies);
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
			for (var i = 0; i < errorTypes.length; i++) {
				const errorType = errorTypes[i];
				const isValid = mergedValidationRules[errorType](value, dependencies);

				if (isValid === false) {
					dispatchWithModulesData(setEditModelFieldError, [path, errorType, entityId, sectionName]);

					return true;
				} else {
					dispatchWithModulesData(removeEditModelFieldError, [path, entityId, sectionName]);
				}
			}

			return false;
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
			const pathToField = getValidPath(path);
			const fullPath = !path.length ? [...keys] : [...keys, "value", ...pathToField];

			const initialFieldValue = !path.length ? initialValue : get(initialValue, pathToField);

			dispatchWithModulesData(setEditModelField, [
				fullPath,
				initialFieldValue,
				initialFieldValue,
				entityId,
				sectionName,
			]);
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
