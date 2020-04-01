import { useSelector } from "react-redux";
import { unwrapImmutable } from "../../utils";
import { currentScopeSelector, defaultScopeSelector } from "../../selectors/scope";

const useDefaultScope = () => {
	const currentScope = unwrapImmutable(useSelector(currentScopeSelector));
	const defaultScope = unwrapImmutable(useSelector(defaultScopeSelector));
	console.warn(defaultScope);
	return [currentScope, defaultScope];
};

export default useDefaultScope;
