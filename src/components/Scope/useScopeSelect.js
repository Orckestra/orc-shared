import { useSelector } from "react-redux";
import UrlPattern from "url-pattern";
import { selectRoutePath, selectRouteParams } from "../../selectors/navigation";
import useNavigationHandler from "../../hooks/useNavigationHandler";
import { unwrapImmutable } from "../../utils";

export const useScopeSelect = id => {
	const pattern = new UrlPattern(useSelector(selectRoutePath));
	const params = unwrapImmutable(useSelector(selectRouteParams));
	params.scope = id;
	return useNavigationHandler(pattern.stringify(params));
};

export default useScopeSelect;
