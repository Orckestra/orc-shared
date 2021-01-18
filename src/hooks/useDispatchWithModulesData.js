import { useSelector, useDispatch } from "react-redux";
import { modulesSelector } from "./../selectors/modules";
import { selectCurrentModuleName, selectCurrentSectionName } from "./../selectors/navigation";

// if n is number of parameters passed to action then
// currentSection will be passed as (n - 2) parameter if includeCurrentSection is true
// currentModule always will be passed as (n - 1) parameter
// modules will be passed as (n)th parameter if includeModulesTree is true
export const useDispatchWithModulesData = () => {
	const baseDispatch = useDispatch();
	const modules = useSelector(modulesSelector);
	const currentModuleName = useSelector(selectCurrentModuleName);
	const currentSectionName = useSelector(selectCurrentSectionName);

	const dispatch = (action, params, options) => {
		const predefinedParams = [];
		if (options?.includeCurrentSection === true) {
			predefinedParams.push(currentSectionName);
		}
		predefinedParams.push(currentModuleName);
		if (options?.includeModulesTree === true) {
			predefinedParams.push(modules.toJS());
		}
		if (params != null) {
			const actionParams = params.concat(predefinedParams);
			baseDispatch(action.apply(null, actionParams));
		} else {
			baseDispatch(action.apply(null, predefinedParams));
		}
	};

	return dispatch;
};

export default useDispatchWithModulesData;
