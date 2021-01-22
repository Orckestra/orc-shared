import { useSelector } from "react-redux";
import UrlPattern from "url-pattern";
import { selectRoutePath, selectRouteParams } from "../../selectors/navigation";
import useNavigationHandler from "../../hooks/useNavigationHandler";
import { unwrapImmutable } from "../../utils";

export const useScopeSelect = (id, closeSelector) => {
	const pattern = new UrlPattern(useSelector(selectRoutePath));
	const params = unwrapImmutable(useSelector(selectRouteParams));
	params.scope = id;
	const [navigate, active] = useNavigationHandler(pattern.stringify(params));
	return [
		event => {
			navigate(event);
			closeSelector(event);
		},
		active,
	];
};

export default useScopeSelect;
