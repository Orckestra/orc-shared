import { withProps } from "recompose";
import useNavigationHandler from "../hooks/useNavigationHandler";

const withNavigationLink = withProps(({ href }) => {
	console.warn(
		"Higher order component withNavigationLink has been deprecated in favor of React hook useNavigationHandler",
	);
	const [onClick, active] = useNavigationHandler(href);
	return { active, onClick };
});

export default withNavigationLink;
