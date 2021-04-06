import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentModuleName, selectCurrentSectionName } from "./../selectors/navigation";

// if n is number of parameters passed to action then
// currentSection will be passed as (n - 1)th parameter if includeCurrentSection is true
// currentModule always will be passed as (n)th parameter
export const useDispatchWithModulesData = () => {
	const baseDispatch = useDispatch();
	const currentModuleName = useSelector(selectCurrentModuleName);
	const currentSectionName = useSelector(selectCurrentSectionName);

	const dispatch = useCallback(
		(action, params, options) => {
			const predefinedParams = [];
			if (options?.includeCurrentSection === true) {
				predefinedParams.push(currentSectionName);
			}
			predefinedParams.push(currentModuleName);
			if (params != null) {
				const actionParams = params.concat(predefinedParams);
				baseDispatch(action.apply(null, actionParams));
			} else {
				baseDispatch(action.apply(null, predefinedParams));
			}
		},
		[baseDispatch, currentModuleName, currentSectionName],
	);

	return dispatch;
};

export default useDispatchWithModulesData;
