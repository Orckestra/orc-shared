import { useHistory } from "react-router-dom";
import { withProps } from "recompose";

const analyzeHref = href => {
	const url = new URL(href || "", window.location);
	return {
		local: url.origin === window.location.origin,
		self: window.location.href === url.href,
	};
};

const isActiveHref = (href, location) => {
	const url = new URL(href, window.location);
	return (
		href &&
		url.origin === window.location.origin &&
		window.location.pathname.substr(0, url.pathname.length) === url.pathname
	);
};

export const useNavigationHandler = href => {
	const history = useHistory();
	const active = isActiveHref(href);
	const { local, self } = analyzeHref(href);
	return [
		event => {
			if (local) {
				event.preventDefault();
				if (!self) {
					history.push(href);
				}
			}
		},
		active,
	];
};

const withNavigationLink = withProps(({ href }) => {
	const [onClick, active] = useNavigationHandler(href);
	return { active, onClick };
});

export default withNavigationLink;
