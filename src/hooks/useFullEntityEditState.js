import Immutable from "immutable";
import { useDispatchWithModulesData } from "./../hooks/useDispatchWithModulesData";
import { setFullEntityEditModel } from "./../actions/view";
import { validationRules } from "../utils/modelValidationHelper";
import { isEqual } from "lodash";

// if you need to override default validation rules just pass new rules with default keys
// as properties of extendedValidationRules
export const useFullEntityEditState = (
	entityId,
	getFullEntityModelProperties,
	extendedValidationRules = {},
	dependencies = {},
) => {
	const dispatchWithModulesData = useDispatchWithModulesData();

	const mergedValidationRules = { ...validationRules, ...extendedValidationRules };

	const isEditStateValid = (newValue, errorTypes, dependencies) => {
		let error = null;
		errorTypes.forEach(errorType => {
			const isValid = mergedValidationRules[errorType]
				? mergedValidationRules[errorType](newValue, dependencies)
				: true;

			if (isValid === false && error == null) {
				error = errorType;
			}
		});

		return error;
	};

	const buildFullEntityEditState = initializationContext => {
		let fullEntityEditModel = Immutable.fromJS({});

		const fullEntityModelProperties = getFullEntityModelProperties(initializationContext ?? {});

		Object.entries(fullEntityModelProperties).forEach(([sectionName, editStateFieldDefinitions]) => {
			Object.entries(editStateFieldDefinitions).forEach(([fieldName, fieldDefinition]) => {
				const allDependencies = {
					...dependencies,
					...fieldDefinition.dependencies,
				};

				const error = isEditStateValid(fieldDefinition.newValue, fieldDefinition.errorTypes ?? [], allDependencies);

				const value = {
					value: fieldDefinition.newValue,
					wasModified: !isEqual(fieldDefinition.initialValue, fieldDefinition.newValue),
				};

				if (error) {
					value.error = error;
				}

				const path = [entityId, sectionName, "model"].concat(fieldDefinition.keys);

				fullEntityEditModel = fullEntityEditModel.setIn(path, Immutable.fromJS(value));
			});
		});

		dispatchWithModulesData(setFullEntityEditModel, [fullEntityEditModel]);
	};

	return buildFullEntityEditState;
};

export default useFullEntityEditState;
