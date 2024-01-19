import { useEffect, useState } from "react";
import useScopeData from "./Scope/useScopeData";
import { useDispatch } from "react-redux";
import { getScopeExtendedConfiguration } from "../actions/scopes";

const ScopeExtendedConfigurationLoader = () => {
	const [currentScope] = useScopeData();
	const dispatch = useDispatch();

	const [localScopeValue, setLocalScopeValue] = useState();

	useEffect(() => {
		if (currentScope.id !== localScopeValue) {
			setLocalScopeValue(currentScope.id);
			dispatch(getScopeExtendedConfiguration(currentScope.id));
		}
	}, [currentScope.id, dispatch, localScopeValue]);

	return null;
};

export default ScopeExtendedConfigurationLoader;
