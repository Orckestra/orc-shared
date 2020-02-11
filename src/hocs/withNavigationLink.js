import { withProps } from "recompose";
import useNavigationHandler from "../hooks/useNavigationHandler";

const withNavigationLink = withProps(({ href }) => {
	const [onClick, active] = useNavigationHandler(href);
	return { active, onClick };
});

export default withNavigationLink;
