import { useHistory, useLocation } from "react-router-dom";

const analyzeHref = (href, location) => {
	const url = new URL(href || "", window.location.origin);
	const local = url.origin === window.location.origin;
	const self = location.pathname === url.pathname && location.search === url.search && location.hash === url.hash;
	return {
		local,
		self,
		active: href && local && location.pathname.substr(0, url.pathname.length) === url.pathname,
	};
};

export const useNavigationHandler = href => {
	const location = useLocation();
	const history = useHistory();
	const { local, self, active } = analyzeHref(href, location);
	return [
		event => {
			if (local) {
				event.preventDefault();
				if (href && !self) {
					history.push(href);
				}
			}
		},
		active,
	];
};

export default useNavigationHandler;
