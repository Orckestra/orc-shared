import { useSelector } from "react-redux";
import { unwrapImmutable } from "../../utils";
import { defaultScopeSelector } from "../../selectors/settings";

const useDefaultScope = () => {
	const defaultScope = unwrapImmutable(useSelector(defaultScopeSelector));
	return [defaultScope];
};

export default useDefaultScope;
