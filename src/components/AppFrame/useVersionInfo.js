import { useSelector } from "react-redux";
import { unwrapImmutable } from "../../utils";
import {
	getHelpUrlDefaultSelector,
	getApplicationHelpUrlSelector,
} from "../../selectors/versionInfo";

const useVersionInfo = applicationId => {
	const defaultHelpUrl = unwrapImmutable(useSelector(getHelpUrlDefaultSelector));
	const applicationHelpUrls = unwrapImmutable(useSelector(getApplicationHelpUrlSelector));
	const applicationHelpUrl = applicationHelpUrls.find(
		h => h.moduleName === applicationId,
	);

	return [(applicationHelpUrl && applicationHelpUrl.helpUrl) || defaultHelpUrl];
};

export default useVersionInfo;
